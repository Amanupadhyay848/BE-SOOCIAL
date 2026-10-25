const fs = require('fs');

async function checkMediaFolder() {
  const url = 'https://drive.google.com/drive/folders/1VFpM6q-6vFFQgHko5J4IJjeyHMD8LCZr';
  const res = await fetch(url);
  const html = await res.text();
  fs.writeFileSync('scratch/media_drive.html', html);

  const regex = /aria-label="([^"]+)"/g;
  let m;
  const items = [];
  while ((m = regex.exec(html)) !== null) {
    items.push(m[1]);
  }
  console.log('Media folder items:', items);

  // Extract all data-id values
  const idRegex = /data-id="([a-zA-Z0-9_-]{20,})"/g;
  const ids = new Set();
  while ((m = idRegex.exec(html)) !== null) {
    ids.add(m[1]);
  }
  console.log('Media folder Data IDs:', Array.from(ids));
}

checkMediaFolder().catch(console.error);
