async function testRedirect() {
  const url = 'https://drive.google.com/uc?export=download&id=11poiwi6HvSDJSAZ73-oolsNfSecV84iw';
  const res = await fetch(url, { redirect: 'follow' });
  console.log('Final URL:', res.url);
  console.log('Final Status:', res.status);
  console.log('Headers:', Object.fromEntries(res.headers.entries()));
}

testRedirect().catch(console.error);
