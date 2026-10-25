async function testRange() {
  const url = 'https://drive.google.com/uc?export=download&id=11poiwi6HvSDJSAZ73-oolsNfSecV84iw';
  const res = await fetch(url, {
    headers: { 'Range': 'bytes=0-1000' }
  });
  console.log('Range Request Status:', res.status);
  console.log('Accept-Ranges:', res.headers.get('accept-ranges'));
  console.log('Content-Range:', res.headers.get('content-range'));
  console.log('Content-Type:', res.headers.get('content-type'));
}

testRange().catch(console.error);
