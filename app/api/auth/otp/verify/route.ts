import { NextRequest, NextResponse } from 'next/server';
import { verifyOtp, validateMobileNumber } from '@/lib/auth/otp-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, code } = body;

    if (!phone || !code) {
      return NextResponse.json(
        { success: false, verified: false, error: 'Mobile number and verification code are required' },
        { status: 400 }
      );
    }

    const validation = validateMobileNumber(phone);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, verified: false, error: validation.error || 'Invalid mobile number' },
        { status: 400 }
      );
    }

    const result = verifyOtp(phone, code);

    if (!result.success || !result.verified) {
      return NextResponse.json(
        { success: false, verified: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    return NextResponse.json(
      { success: false, verified: false, error: 'Internal server error while verifying code' },
      { status: 500 }
    );
  }
}
