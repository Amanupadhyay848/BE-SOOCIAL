async function print403() {
  const url = 'https://drive.usercontent.google.com/download?id=11poiwi6HvSDJSAZ73-oolsNfSecV84iw&export=download&confirm=t';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Sec-Fetch-Dest': 'video',
    }
  });
  console.log('Status:', res.status);
  console.log(await res.text());
}
print403().catch(console.error);
