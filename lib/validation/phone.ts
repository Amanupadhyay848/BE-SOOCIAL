export interface PhoneValidationResult {
  isValid: boolean;
  normalized?: string;
  error?: string;
  display?: string;
}

/**
 * Validates a mobile number according to national and international telecom standards.
 * Pure JavaScript - Safe for both browser client and Node server.
 * Rejects repeated, sequential, fake, and invalid pattern numbers.
 */
export function validateMobileNumber(raw: string, defaultCountryCode = '+91'): PhoneValidationResult {
  if (!raw || typeof raw !== 'string') {
    return { isValid: false, error: 'Mobile number is required' };
  }

  // Remove spaces, hyphens, brackets, dots
  let cleaned = raw.replace(/[\s\-\(\)\.]/g, '');

  if (!cleaned) {
    return { isValid: false, error: 'Mobile number cannot be empty' };
  }

  // Reject obvious repeated dummy patterns (e.g., 0000000000, 1111111111, 9999999999)
  const digitsOnly = cleaned.replace(/^\+/, '');
  if (/^(\d)\1{7,}$/.test(digitsOnly)) {
    return { isValid: false, error: 'Repeated placeholder numbers are not allowed' };
  }

  // Reject obvious sequential dummy patterns
  const knownFakePatterns = [
    '1234567890',
    '0123456789',
    '9876543210',
    '1231231234',
    '0000000000',
    '1111111111',
  ];
  if (knownFakePatterns.some((pattern) => digitsOnly.includes(pattern))) {
    return { isValid: false, error: 'Please enter an authentic, non-test mobile number' };
  }

  // Indian Mobile Number Handling
  if (defaultCountryCode === '+91' || cleaned.startsWith('+91') || (!cleaned.startsWith('+') && cleaned.length === 10)) {
    let localDigits = cleaned;
    if (localDigits.startsWith('+91')) {
      localDigits = localDigits.slice(3);
    } else if (localDigits.startsWith('91') && localDigits.length === 12) {
      localDigits = localDigits.slice(2);
    } else if (localDigits.startsWith('0') && localDigits.length === 11) {
      localDigits = localDigits.slice(1);
    }

    if (!/^\d{10}$/.test(localDigits)) {
      return { isValid: false, error: 'Indian mobile number must be exactly 10 digits' };
    }

    // Indian telecom authority rule: valid mobile lines start with 6, 7, 8, or 9
    if (!/^[6-9]/.test(localDigits)) {
      return { isValid: false, error: 'Indian mobile number must begin with 6, 7, 8, or 9' };
    }

    const normalized = `+91${localDigits}`;
    const display = `+91 ${localDigits.slice(0, 5)} ${localDigits.slice(5)}`;
    return { isValid: true, normalized, display };
  }

  // General E.164 International Format: +[1-9]\d{7,14}
  if (!cleaned.startsWith('+')) {
    cleaned = `+${cleaned}`;
  }

  if (!/^\+[1-9]\d{7,14}$/.test(cleaned)) {
    return { isValid: false, error: 'Please enter a valid international mobile number including country code' };
  }

  return { isValid: true, normalized: cleaned, display: cleaned };
}
