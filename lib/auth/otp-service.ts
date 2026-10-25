import crypto from 'crypto';
import { validateMobileNumber, PhoneValidationResult } from '@/lib/validation/phone';

export { validateMobileNumber };
export type { PhoneValidationResult };

interface StoredOtp {
  code: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}

interface VerifiedTokenRecord {
  phone: string;
  expiresAt: number;
}

// Global symbols for Next.js singleton persistence across HMR rebuilds
const OTP_STORE_KEY = Symbol.for('besoocial_otp_store');
const TOKEN_STORE_KEY = Symbol.for('besoocial_verified_tokens_store');

interface GlobalWithOtpStore {
  [OTP_STORE_KEY]?: Map<string, StoredOtp>;
  [TOKEN_STORE_KEY]?: Map<string, VerifiedTokenRecord>;
}

const globalHolder = globalThis as unknown as GlobalWithOtpStore;

if (!globalHolder[OTP_STORE_KEY]) {
  globalHolder[OTP_STORE_KEY] = new Map<string, StoredOtp>();
}
if (!globalHolder[TOKEN_STORE_KEY]) {
  globalHolder[TOKEN_STORE_KEY] = new Map<string, VerifiedTokenRecord>();
}

const otpStore = globalHolder[OTP_STORE_KEY]!;
const tokenStore = globalHolder[TOKEN_STORE_KEY]!;

// Check if an SMS provider is configured via environment variables
export function isSmsProviderConfigured(): boolean {
  const hasTwilio = Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  );
  const hasFast2Sms = Boolean(process.env.FAST2SMS_API_KEY);
  const hasMsg91 = Boolean(process.env.MSG91_AUTH_KEY);

  return hasTwilio || hasFast2Sms || hasMsg91;
}

/**
 * Dispatches an SMS using the configured provider.
 */
async function dispatchSms(phone: string, message: string): Promise<boolean> {
  // 1. Twilio provider implementation
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;
      const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const params = new URLSearchParams();
      params.append('To', phone);
      params.append('From', process.env.TWILIO_PHONE_NUMBER);
      params.append('Body', message);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      return res.ok;
    } catch (err) {
      console.error('[SMS DISPATCH] Twilio error:', err);
      return false;
    }
  }

  // 2. Fast2SMS (popular in India)
  if (process.env.FAST2SMS_API_KEY) {
    try {
      const cleanIndianNumber = phone.replace('+91', '');
      const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: message,
          numbers: cleanIndianNumber,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error('[SMS DISPATCH] Fast2SMS error:', err);
      return false;
    }
  }

  return false;
}

/**
 * Generates and sends a 6-digit verification OTP to the specified phone.
 */
export async function sendOtp(phone: string): Promise<{
  success: boolean;
  message: string;
  providerConfigured: boolean;
  devOtp?: string;
  error?: string;
}> {
  const validation = validateMobileNumber(phone);
  if (!validation.isValid || !validation.normalized) {
    return {
      success: false,
      message: validation.error || 'Invalid mobile number',
      providerConfigured: false,
      error: validation.error,
    };
  }

  const normalized = validation.normalized;
  const now = Date.now();
  const existing = otpStore.get(normalized);

  // Rate limiting: allow 1 send per 30 seconds
  if (existing && now - existing.lastSentAt < 30 * 1000) {
    const waitSecs = Math.ceil((30 * 1000 - (now - existing.lastSentAt)) / 1000);
    return {
      success: false,
      message: `Please wait ${waitSecs}s before requesting another verification code.`,
      providerConfigured: isSmsProviderConfigured(),
      error: 'Rate limit exceeded',
    };
  }

  // Generate a cryptographically secure 6-digit numeric code (100000 - 999999)
  const randomBuffer = crypto.randomBytes(4);
  const code = (100000 + (randomBuffer.readUInt32BE(0) % 900000)).toString();

  // Store with 5-minute expiry (300,000 ms)
  otpStore.set(normalized, {
    code,
    expiresAt: now + 5 * 60 * 1000,
    attempts: 0,
    lastSentAt: now,
  });

  const providerReady = isSmsProviderConfigured();
  const smsBody = `Your BE SOOCIAL verification code is: ${code}. Valid for 5 minutes. Do not share this code.`;

  if (providerReady) {
    const sent = await dispatchSms(normalized, smsBody);
    if (!sent) {
      return {
        success: false,
        message: 'Failed to deliver SMS. Please check your mobile number and try again.',
        providerConfigured: true,
        error: 'SMS dispatch failed',
      };
    }
    return {
      success: true,
      message: `Verification code sent to ${validation.display}`,
      providerConfigured: true,
    };
  }

  // Provider NOT configured in environment
  // Log explicitly to server terminal for developer inspection
  console.log('---------------------------------------------------------');
  console.log(`[BE SOOCIAL OTP SERVICE] LIVE VERIFICATION CODE`);
  console.log(`Mobile: ${normalized}`);
  console.log(`OTP Code: ${code}`);
  console.log(`Expires: In 5 minutes`);
  console.log(`Note: To dispatch real SMS over-the-air, add TWILIO or FAST2SMS keys to .env.local.`);
  console.log('---------------------------------------------------------');

  const isDev = process.env.NODE_ENV !== 'production';

  return {
    success: true,
    message: isDev
      ? `Verification code dispatched to ${validation.display}. [Dev Mode: Code is ${code}]`
      : `SMS Gateway provider is currently offline or unconfigured. Please configure SMS credentials on the server.`,
    providerConfigured: false,
    devOtp: isDev ? code : undefined,
  };
}

/**
 * Verifies the user-submitted OTP against the stored code.
 */
export function verifyOtp(phone: string, inputCode: string): {
  success: boolean;
  verified: boolean;
  message: string;
  verificationToken?: string;
  error?: string;
} {
  const validation = validateMobileNumber(phone);
  if (!validation.isValid || !validation.normalized) {
    return {
      success: false,
      verified: false,
      message: validation.error || 'Invalid mobile number format',
      error: 'Invalid phone',
    };
  }

  const normalized = validation.normalized;
  const stored = otpStore.get(normalized);

  if (!stored) {
    return {
      success: false,
      verified: false,
      message: 'No active verification code found for this mobile number. Please click "Send OTP".',
      error: 'No active OTP',
    };
  }

  const now = Date.now();
  if (now > stored.expiresAt) {
    otpStore.delete(normalized);
    return {
      success: false,
      verified: false,
      message: 'Verification code has expired. Please request a new one.',
      error: 'OTP expired',
    };
  }

  if (stored.attempts >= 5) {
    otpStore.delete(normalized);
    return {
      success: false,
      verified: false,
      message: 'Too many incorrect attempts. Please request a fresh verification code.',
      error: 'Max attempts exceeded',
    };
  }

  const cleanInput = (inputCode || '').trim();
  if (cleanInput !== stored.code) {
    stored.attempts += 1;
    const remaining = 5 - stored.attempts;
    return {
      success: false,
      verified: false,
      message: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
      error: 'Invalid code',
    };
  }

  // OTP Matches! Burn the OTP code so it cannot be reused
  otpStore.delete(normalized);

  // Generate a tamper-proof verification token
  const token = `vtok_${crypto.randomBytes(24).toString('hex')}`;
  tokenStore.set(token, {
    phone: normalized,
    expiresAt: now + 30 * 60 * 1000, // Valid for 30 minutes to complete brief submission
  });

  return {
    success: true,
    verified: true,
    message: 'Mobile number verified successfully.',
    verificationToken: token,
  };
}

/**
 * Validates and consumes the verification token during final brief submission.
 * Consuming the token ensures it cannot be re-used for multiple submissions.
 */
export function validateAndConsumeToken(phone: string, token: string): boolean {
  if (!token || !phone) return false;

  const record = tokenStore.get(token);
  if (!record) return false;

  const validation = validateMobileNumber(phone);
  if (!validation.isValid || validation.normalized !== record.phone) {
    return false;
  }

  if (Date.now() > record.expiresAt) {
    tokenStore.delete(token);
    return false;
  }

  // Token is valid! Consume it so it cannot be replayed
  tokenStore.delete(token);
  return true;
}
