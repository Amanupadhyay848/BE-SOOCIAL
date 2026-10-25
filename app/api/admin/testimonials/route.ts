import { NextRequest, NextResponse } from 'next/server';
import { getAllTestimonialsAdmin, toggleTestimonialApproval } from '@/lib/data/repository';

export async function GET() {
  const testimonials = await getAllTestimonialsAdmin();
  return NextResponse.json({ testimonials });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });

    const updated = await toggleTestimonialApproval(id);
    if (!updated) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });

    return NextResponse.json({ success: true, testimonial: updated });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
