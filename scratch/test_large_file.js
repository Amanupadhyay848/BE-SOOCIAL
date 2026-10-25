async function testLargeFile() {
  // blinkpic.mp4 is 292MB, ID: 1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM
  const url = 'https://drive.google.com/uc?export=download&id=1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM';
  const res = await fetch(url, { redirect: 'manual' });
  console.log('blinkpic direct status:', res.status);
  console.log('Location:', res.headers.get('location'));
  console.log('Content-Type:', res.headers.get('content-type'));

  const text = await res.text();
  console.log('Response preview:', text.substring(0, 300));
}

testLargeFile().catch(console.error);
