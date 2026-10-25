import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validation/inquiry';
import { createInquiry } from '@/lib/data/repository';
import { validateAndConsumeToken, validateMobileNumber } from '@/lib/auth/otp-service';

// In-memory IP tracking to prevent flooding
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Re-validation on Server
    const parseResult = inquirySchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 2. Honeypot Verification: drop silently if filled
    if (data._hp_verify && data._hp_verify.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    // 3. Strict Mobile Verification check for Start A Project briefs
    if (data.source === 'start-a-project') {
      if (!data.phone) {
        return NextResponse.json(
          { error: 'Mobile number is required to commission a project.' },
          { status: 400 }
        );
      }

      if (!data.verificationToken) {
        return NextResponse.json(
          { error: 'Mobile verification is required. Please verify your phone via OTP.' },
          { status: 400 }
        );
      }

      const isVerified = validateAndConsumeToken(data.phone, data.verificationToken);
      if (!isVerified) {
        return NextResponse.json(
          { error: 'Mobile verification token is invalid or expired. Please verify your mobile number again.' },
          { status: 400 }
        );
      }
    }

    // 4. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip) || 0;
    if (now - lastRequest < 2500) {
      // 2.5 second sliding window per IP
      return NextResponse.json(
        { error: 'Please wait a moment before submitting another inquiry.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    // Normalize phone number if present
    const phoneNormalized = data.phone ? validateMobileNumber(data.phone).normalized || data.phone : undefined;

    // 5. Persistence into Repository
    const inquiry = await createInquiry({
      ...data,
      phone: phoneNormalized || '',
      mobileVerified: data.source === 'start-a-project' ? true : false,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry registered successfully with BE SOOCIAL.',
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Error processing inquiry:', err);
    return NextResponse.json(
      { error: 'Internal server error while recording inquiry' },
      { status: 500 }
    );
  }
}
