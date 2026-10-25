async function testThumb() {
  const url = 'https://lh3.googleusercontent.com/d/1fNguufzbEDEedUUy1oNdiI6Qsc0PnPgt';
  const res = await fetch(url);
  console.log('Starbucks thumb status:', res.status, 'Content-Type:', res.headers.get('content-type'), 'Length:', res.headers.get('content-length'));
}
testThumb().catch(console.error);
