import { NextRequest, NextResponse } from 'next/server';

const EXPECTED_USERNAME = process.env.ADMIN_USERNAME || 'BE SO0CIAL';
const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || 'AMAN1230';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('besoocial_admin_auth');
  if (cookie && cookie.value.startsWith('authenticated_')) {
    return NextResponse.json({ authenticated: true, user: 'BE SO0CIAL' });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const normalizedInputUser = (username || '').trim();
    const normalizedInputPass = (password || '').trim();

    // Check credentials matching BE SO0CIAL / BE SOOCIAL and AMAN1230
    const isUserValid =
      normalizedInputUser === EXPECTED_USERNAME ||
      normalizedInputUser.toUpperCase() === 'BE SO0CIAL' ||
      normalizedInputUser.toUpperCase() === 'BE SOOCIAL';

    const isPassValid = normalizedInputPass === EXPECTED_PASSWORD;

    if (!isUserValid || !isPassValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Set secure auth cookie
    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication verified',
      user: 'BE SO0CIAL',
    });

    response.cookies.set({
      name: 'besoocial_admin_auth',
      value: 'authenticated_' + Buffer.from(EXPECTED_USERNAME).toString('base64'),
      httpOnly: false, // Accessible to client-side auth state
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('besoocial_admin_auth');
  return response;
}
