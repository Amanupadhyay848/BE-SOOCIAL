async function testBrowserVideoHeaders() {
  const url = 'https://drive.usercontent.google.com/download?id=11poiwi6HvSDJSAZ73-oolsNfSecV84iw&export=download&confirm=t';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Sec-Fetch-Dest': 'video',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'cross-site',
      'Range': 'bytes=0-'
    }
  });

  console.log('Status:', res.status);
  console.log('Content-Type:', res.headers.get('content-type'));
  console.log('Content-Disposition:', res.headers.get('content-disposition'));
  console.log('Access-Control-Allow-Origin:', res.headers.get('access-control-allow-origin'));
  console.log('Cross-Origin-Resource-Policy:', res.headers.get('cross-origin-resource-policy'));
}

testBrowserVideoHeaders().catch(console.error);
