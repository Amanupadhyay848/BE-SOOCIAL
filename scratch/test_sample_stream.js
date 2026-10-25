async function testSample456MB() {
  const url = 'https://drive.usercontent.google.com/download?id=19_kr2sCuf8wbmjpv6-3BCGO9znDmum2e&export=download&confirm=t';
  const res = await fetch(url, {
    headers: { 'Range': 'bytes=0-1000' }
  });
  console.log(`URL: ${url}`);
  console.log(`Status: ${res.status}, Type: ${res.headers.get('content-type')}, Range: ${res.headers.get('content-range')}`);
}

testSample456MB().catch(console.error);
