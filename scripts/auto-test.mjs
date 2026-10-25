// scripts/auto-test.mjs
const BASE_URL = 'http://localhost:3000';

async function runTestSuite() {
  console.log('====================================================');
  console.log('🚀 RUNNING BE SOOCIAL COMPREHENSIVE AUTOMATED TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    const start = performance.now();
    try {
      await fn();
      const duration = Math.round(performance.now() - start);
      console.log(`✅ [PASS] ${name} (${duration}ms)`);
      passed++;
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      console.error(`❌ [FAIL] ${name} (${duration}ms):`, err.message);
      failed++;
    }
  }

  // 1. PUBLIC ROUTES VERIFICATION
  const routes = [
    '/',
    '/about',
    '/services',
    '/services/ai-filmmaking',
    '/services/video-editing',
    '/services/brand-management',
    '/services/website-development',
    '/services/digital-marketing',
    '/services/ai-ugc-ads',
    '/work',
    '/work?category=ai-filmmaking',
    '/work/house-of-doom-neural-genesis',
    '/work/me-vs-dooms-quantum-clash',
    '/work/kroma-audio-brand-evolution',
    '/ai-studio',
    '/contact',
    '/start-a-project',
    '/privacy',
    '/terms',
    '/admin',
  ];

  for (const route of routes) {
    await test(`GET ${route}`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const text = await res.text();
      if (!text || text.length < 50) throw new Error('Response body empty or too short');
    });
  }

  // 2. INQUIRY SUBMISSION (CLIENT WORKFLOW)
  let createdInquiryId = null;
  await test('POST /api/inquiries (Client Submit Valid Brief)', async () => {
    const payload = {
      name: 'Automated Test Client',
      email: 'automated.client@besoocial-test.com',
      company: 'Quantum Motion Studio',
      brief: 'Need full-scale AI commercial worldbuilding with 3D product integration.',
      budgetRange: '$50,000 - $100,000',
      timeline: '4 - 6 Weeks',
      services: ['ai-filmmaking', 'website-development'],
      source: 'start-a-project',
      _hp_verify: '',
    };

    const res = await fetch(`${BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.status !== 201) {
      const err = await res.text();
      throw new Error(`Expected 201, got ${res.status}: ${err}`);
    }

    const data = await res.json();
    if (!data.success || !data.inquiryId) {
      throw new Error('Response missing success or inquiryId');
    }
    createdInquiryId = data.inquiryId;
  });

  // 3. INQUIRY VALIDATION (REJECT INVALID BRIEFS)
  await test('POST /api/inquiries (Validation Rejects Invalid Brief)', async () => {
    const invalidPayload = {
      name: 'A', // too short
      email: 'not-an-email',
      brief: '', // empty
      services: [],
    };

    const res = await fetch(`${BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload),
    });

    if (res.status !== 400) {
      throw new Error(`Expected 400 validation error, got ${res.status}`);
    }
  });

  // 4. ADMIN AUTHENTICATION TESTS
  let authCookie = null;
  await test('POST /api/admin/auth (Valid User: BE SOOCIAL)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'BE SOOCIAL',
        password: 'AMAN1230',
      }),
    });

    if (!res.ok) throw new Error(`Login failed with status ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Expected success: true');
    authCookie = res.headers.get('set-cookie');
  });

  await test('POST /api/admin/auth (Valid User with Zero: BE SO0CIAL)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'BE SO0CIAL',
        password: 'AMAN1230',
      }),
    });

    if (!res.ok) throw new Error(`Login failed with status ${res.status}`);
  });

  await test('POST /api/admin/auth (Rejects Incorrect Password)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'BE SOOCIAL',
        password: 'WRONG_PASSWORD',
      }),
    });

    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  // 5. ADMIN REAL-TIME INQUIRIES QUEUE
  await test('GET /api/admin/inquiries (Verify Live Inquiries Queue)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/inquiries`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.inquiries)) throw new Error('Inquiries is not an array');
    const found = data.inquiries.find((i) => i.id === createdInquiryId);
    if (!found) throw new Error(`Newly created inquiry ${createdInquiryId} not found in admin queue`);
  });

  // 6. ADMIN INQUIRY STATUS & PRODUCER NOTES UPDATE
  await test('PATCH /api/admin/inquiries (Update Status & Producer Notes)', async () => {
    if (!createdInquiryId) throw new Error('No inquiry ID available to update');

    const res = await fetch(`${BASE_URL}/api/admin/inquiries`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: createdInquiryId,
        status: 'in_progress',
        producerNotes: 'Client contacted via Zoom; NDA signed and treatment presented.',
      }),
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (data.inquiry.status !== 'in_progress' || !data.inquiry.producerNotes.includes('NDA signed')) {
      throw new Error('Inquiry status or producer notes not updated correctly');
    }
  });

  // 7. ADMIN PROJECT CMS FULL CONTROL
  let createdProjectId = null;
  await test('POST /api/admin/projects (Admin Creates New Case Study)', async () => {
    const projectPayload = {
      title: 'Neon Odyssey: Hyper-Cinematic Ad',
      client: 'Apex Automotive',
      category: 'ai-filmmaking',
      categoryLabel: 'AI Filmmaking',
      brief: 'World premiere teaser produced with neural camera rigs.',
      status: 'published',
      featured: true,
      showOnHome: true,
    };

    const res = await fetch(`${BASE_URL}/api/admin/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectPayload),
    });

    if (res.status !== 201) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.project?.id) throw new Error('Project ID missing from response');
    createdProjectId = data.project.id;
  });

  await test('PATCH /api/admin/projects (Toggle Publish & Featured)', async () => {
    if (!createdProjectId) throw new Error('No project ID');
    const res = await fetch(`${BASE_URL}/api/admin/projects`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: createdProjectId, action: 'toggle_publish' }),
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (data.project.status !== 'draft') throw new Error('Expected status to toggle to draft');
  });

  await test('DELETE /api/admin/projects (Delete Case Study)', async () => {
    if (!createdProjectId) throw new Error('No project ID');
    const res = await fetch(`${BASE_URL}/api/admin/projects?id=${createdProjectId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 8. CLEANUP TEST INQUIRY
  await test('DELETE /api/admin/inquiries (Admin Deletes Inquiry)', async () => {
    if (!createdInquiryId) throw new Error('No inquiry ID');
    const res = await fetch(`${BASE_URL}/api/admin/inquiries?id=${createdInquiryId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  console.log('\n====================================================');
  console.log(`🏁 TEST SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
