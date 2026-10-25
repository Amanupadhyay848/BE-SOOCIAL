const fs = require('fs');
const html = fs.readFileSync('scratch/public_drive.html', 'utf8');

const id = '1VFpM6q-6vFFQgHko5J4IJjeyHMD8LCZr';
const pos = html.indexOf(id);
console.log(html.substring(pos + 1200, pos + 3000));
