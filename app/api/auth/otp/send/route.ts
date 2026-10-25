import { NextRequest, NextResponse } from 'next/server';
import { sendOtp, validateMobileNumber } from '@/lib/auth/otp-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    const validation = validateMobileNumber(phone);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Invalid mobile number' },
        { status: 400 }
      );
    }

    const result = await sendOtp(phone);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('Error sending OTP:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while dispatching verification code' },
      { status: 500 }
    );
  }
}
