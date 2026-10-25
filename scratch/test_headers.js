async function testHeadersOneByOne() {
  const url = 'https://drive.usercontent.google.com/download?id=11poiwi6HvSDJSAZ73-oolsNfSecV84iw&export=download&confirm=t';
  const headersList = [
    { name: 'Only User-Agent', h: { 'User-Agent': 'Mozilla/5.0' } },
    { name: 'With Range', h: { 'Range': 'bytes=0-1000' } },
    { name: 'With Sec-Fetch-Dest', h: { 'Sec-Fetch-Dest': 'video' } },
    { name: 'With Sec-Fetch-Mode no-cors', h: { 'Sec-Fetch-Mode': 'no-cors' } },
    { name: 'With Sec-Fetch-Site cross-site', h: { 'Sec-Fetch-Site': 'cross-site' } },
    { name: 'With Origin localhost', h: { 'Origin': 'http://localhost:3000' } },
    { name: 'With Referer localhost', h: { 'Referer': 'http://localhost:3000/' } },
  ];

  for (const item of headersList) {
    try {
      const res = await fetch(url, { headers: item.h });
      console.log(`${item.name} -> Status: ${res.status}`);
    } catch (e) {
      console.log(`${item.name} -> Error: ${e.message}`);
    }
  }
}
testHeadersOneByOne().catch(console.error);
