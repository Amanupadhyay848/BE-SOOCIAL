const fs = require('fs');

const html = fs.readFileSync('scratch/public_drive.html', 'utf8');

// Look for data-id or links to folders/files
const idRegex = /data-id="([a-zA-Z0-9_-]{20,})"/g;
let m;
const ids = new Set();
while ((m = idRegex.exec(html)) !== null) {
  ids.add(m[1]);
}
console.log('Data IDs found:', Array.from(ids));

// Search for "media" context in html
let pos = 0;
while ((pos = html.indexOf('media', pos)) !== -1) {
  console.log('--- match at pos', pos, '---');
  console.log(html.substring(Math.max(0, pos - 150), Math.min(html.length, pos + 250)));
  pos += 5;
  if (pos > 50000) break; // sample first few
}
