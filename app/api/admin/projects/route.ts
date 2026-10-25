import { NextRequest, NextResponse } from 'next/server';
import {
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectPublish,
  toggleProjectFeatured,
} from '@/lib/data/repository';

export async function GET() {
  const projects = await getAllProjectsAdmin();
  return NextResponse.json(
    { projects },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action, updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
    }

    if (action === 'toggle_publish') {
      const project = await toggleProjectPublish(id);
      if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ success: true, project });
    }

    if (action === 'toggle_featured') {
      const project = await toggleProjectFeatured(id);
      if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ success: true, project });
    }

    if (updates) {
      const project = await updateProject(id, updates);
      if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ success: true, project });
    }

    return NextResponse.json({ error: 'No valid action provided' }, { status: 400 });
  } catch (err) {
    console.error('Error updating project:', err);
    return NextResponse.json({ error: 'Server error updating project' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.title || !data.client) {
      return NextResponse.json({ error: 'Title and Client are required' }, { status: 400 });
    }

    const project = await createProject(data);
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (err) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: 'Server error creating project' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing project ID to delete' }, { status: 400 });
    }

    const deleted = await deleteProject(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    return NextResponse.json({ error: 'Server error deleting project' }, { status: 500 });
  }
}
