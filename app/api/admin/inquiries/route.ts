import { NextRequest, NextResponse } from 'next/server';
import {
  getInquiries,
  updateInquiryStatus,
  updateInquiryNotes,
  deleteInquiry,
  createInquiry,
} from '@/lib/data/repository';

export async function GET() {
  const inquiries = await getInquiries();
  return NextResponse.json(
    { inquiries },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, producerNotes } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing inquiry ID' }, { status: 400 });
    }

    let updated = null;

    if (status) {
      if (!['new', 'in_progress', 'closed'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
      }
      updated = await updateInquiryStatus(id, status);
    }

    if (producerNotes !== undefined) {
      updated = await updateInquiryNotes(id, producerNotes);
    }

    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err) {
    console.error('Error updating inquiry:', err);
    return NextResponse.json({ error: 'Server error updating inquiry' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await req.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing inquiry ID to delete' }, { status: 400 });
    }

    const deleted = await deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Inquiry not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    return NextResponse.json({ error: 'Server error deleting inquiry' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Allows admin to inject a test lead or manual commission brief
    const newInquiry = await createInquiry({
      name: body.name || 'Test Director ' + Math.floor(Math.random() * 900 + 100),
      email: body.email || `director_${Date.now().toString().slice(-4)}@cinema-test.com`,
      company: body.company || 'Paramount Velocity Media',
      brief:
        body.brief ||
        'Verified live pipeline ping test. Testing real-time inquiry synchronization across admin monitors.',
      budgetRange: body.budgetRange || '$50,000 - $100,000',
      timeline: body.timeline || '4 - 6 Weeks',
      services: body.services || ['ai-filmmaking', 'video-editing'],
      source: body.source || 'start-a-project',
      _hp_verify: '',
    });

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    return NextResponse.json({ error: 'Server error creating inquiry' }, { status: 500 });
  }
}
