async function testAllMediaStreams() {
  const ids = [
    { name: 'me-vs-dooms', id: '11poiwi6HvSDJSAZ73-oolsNfSecV84iw' },
    { name: 'hod-render', id: '1OCtmevynqH8c-EZwUw1XrX05Pp0W8wDK' },
    { name: 'starbucks', id: '1fNguufzbEDEedUUy1oNdiI6Qsc0PnPgt' },
    { name: 'blinkpic', id: '1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM' },
    { name: 'breaking-financial', id: '1ES1uf2zK36ZfXlmG4xf8hAbNfOuFI1xR' },
    { name: 'sample', id: '19_kr2sCuf8wbmjpv6-3BCGO9znDmum2e' },
    { name: 'ultimate-editors', id: '1pSLndbQTyouR9nLzGigh2hFbldgzYp9r' },
    { name: 'livzo', id: '18NX6d4OgaqvKLFY6PybhRL48B7p-6ebj' },
    { name: 'agentvoice', id: '1Ia2czIgX13_19U5hLoq1eWTMOe4DRHp4' },
    { name: 'pioneer-air', id: '1QU5RFDDwyb-ZfcvU_BKhk-P0-bXYIiuD' },
    { name: 'nexl', id: '1dhcCerRy9nEFTRcn6ntKfRMXyZkTJmvd' },
    { name: 'spec-driven', id: '1bQpM551mibB8o4_6vh5PrJ-Z2VlZQR7L' },
    { name: 'ai-essentials', id: '1mQoLmx1AGCzwWvsBlE3JEUrJlTI0FaiL' },
  ];

  for (const item of ids) {
    try {
      const res = await fetch(`http://localhost:3000/api/media/${item.id}`, {
        headers: { 'Range': 'bytes=0-100' }
      });
      console.log(`${item.name} (${item.id}) -> Status: ${res.status}, Type: ${res.headers.get('content-type')}, Range: ${res.headers.get('content-range')}`);
    } catch (e) {
      console.error(`${item.name} Error:`, e.message);
    }
  }
}

testAllMediaStreams().catch(console.error);
