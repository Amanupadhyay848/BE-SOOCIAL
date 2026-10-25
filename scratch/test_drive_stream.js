async function testDriveStreaming() {
  // Let's test with one of the file IDs from the user's drive
  // For example, one of the files we found
  const testIds = [
    { name: 'me-vs-dooms.mp4', id: '11poiwi6HvSDJSAZ73-oolsNfSecV84iw' }, // let's check
    { name: 'test-id', id: '1OCtmevynqH8c-EZwUw1XrX05Pp0W8wDK' }
  ];

  for (const item of testIds) {
    const urls = [
      `https://drive.google.com/uc?export=download&id=${item.id}`,
      `https://lh3.googleusercontent.com/d/${item.id}`,
      `https://drive.google.com/file/d/${item.id}/preview`
    ];

    for (const url of urls) {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${item.name} -> ${url} : Status = ${res.status}, Content-Type = ${res.headers.get('content-type')}, Content-Length = ${res.headers.get('content-length')}`);
      } catch (e) {
        console.log(`${item.name} -> ${url} : Error = ${e.message}`);
      }
    }
  }
}

testDriveStreaming().catch(console.error);
