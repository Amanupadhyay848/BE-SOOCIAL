async function testConfirmParam() {
  const urls = [
    'https://drive.google.com/uc?export=download&id=1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM&confirm=t',
    'https://drive.usercontent.google.com/download?id=1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM&export=download&confirm=t',
    'https://drive.google.com/uc?id=1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM&export=download&confirm=xxx'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { 'Range': 'bytes=0-1000' }
      });
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.status}, Type: ${res.headers.get('content-type')}, Range: ${res.headers.get('content-range')}`);
    } catch (e) {
      console.error(e);
    }
  }
}

testConfirmParam().catch(console.error);
