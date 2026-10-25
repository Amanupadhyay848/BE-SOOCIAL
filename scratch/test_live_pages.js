async function testRoutes() {
  const routes = [
    '/',
    '/work',
    '/work/me-vs-dooms',
    '/work/hod-sample-render',
    '/work/starbucks-brand-reveal',
    '/services/ai-filmmaking',
    '/services/brand-management',
    '/services/video-editing',
    '/start-a-project',
    '/api/projects'
  ];

  console.log('Testing routes on http://localhost:3000 ...\n');
  let allOk = true;
  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      const text = await res.text();
      const hasDriveUrl = text.includes('drive.usercontent.google.com') || text.includes('lh3.googleusercontent.com');
      console.log(`Route [${r}]: Status = ${res.status}, Length = ${text.length}, HasDriveMedia = ${hasDriveUrl}`);
      if (!res.ok) allOk = false;
    } catch (e) {
      console.error(`Route [${r}] Error:`, e.message);
      allOk = false;
    }
  }

  if (allOk) {
    console.log('\n>>> ALL TESTED ROUTES RETURNED 200 OK WITH REMOTE DRIVE MEDIA! <<<');
  } else {
    console.error('\n>>> SOME ROUTES FAILED <<<');
  }
}

testRoutes().catch(console.error);
