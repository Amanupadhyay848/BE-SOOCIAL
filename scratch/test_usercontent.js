async function testDriveUserContent() {
  const url = 'https://drive.usercontent.google.com/download?id=1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM&export=download';
  const res = await fetch(url, {
    headers: { 'Range': 'bytes=0-1000' }
  });
  console.log('Status:', res.status);
  console.log('Content-Type:', res.headers.get('content-type'));
  console.log('Content-Range:', res.headers.get('content-range'));
  console.log('Content-Length:', res.headers.get('content-length'));
}

testDriveUserContent().catch(console.error);
