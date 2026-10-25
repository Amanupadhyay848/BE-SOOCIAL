async function testApiStream() {
  const url = 'http://localhost:3000/api/media/11poiwi6HvSDJSAZ73-oolsNfSecV84iw';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      'Sec-Fetch-Dest': 'video',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'same-origin',
      'Range': 'bytes=0-1000'
    }
  });

  console.log('API Route Stream Status:', res.status);
  console.log('Content-Type:', res.headers.get('content-type'));
  console.log('Content-Range:', res.headers.get('content-range'));
  console.log('Content-Length:', res.headers.get('content-length'));
  console.log('Accept-Ranges:', res.headers.get('accept-ranges'));

  const buf = await res.arrayBuffer();
  console.log('Received chunk bytes:', buf.byteLength);
}

testApiStream().catch(console.error);
