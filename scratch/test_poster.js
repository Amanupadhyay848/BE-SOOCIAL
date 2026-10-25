async function testPoster() {
  const urls = [
    'https://lh3.googleusercontent.com/d/14w00hpw4UNZk84FgUerS7NwmoCjlsW5u',
    'https://drive.usercontent.google.com/download?id=14w00hpw4UNZk84FgUerS7NwmoCjlsW5u&export=download&confirm=t'
  ];

  for (const url of urls) {
    const res = await fetch(url);
    console.log(`URL: ${url}`);
    console.log(`Status: ${res.status}, Type: ${res.headers.get('content-type')}, Length: ${res.headers.get('content-length')}`);
  }
}

testPoster().catch(console.error);
