async function checkBrand() {
  const url = 'https://drive.google.com/drive/folders/1Q8K4t0olGAFeI-8oUn2pAUSD6N-UHgcO';
  const res = await fetch(url);
  const html = await res.text();
  const regex = /aria-label="([^"]+)"/g;
  let m;
  const items = [];
  while ((m = regex.exec(html)) !== null) {
    items.push(m[1]);
  }
  console.log('Brand Content items:', items);
}
checkBrand().catch(console.error);
