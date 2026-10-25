const fs = require('fs');
const html = fs.readFileSync('scratch/public_drive.html', 'utf8');

const id = '1VFpM6q-6vFFQgHko5J4IJjeyHMD8LCZr';
const pos = html.indexOf(id);
console.log('Chunk around id:');
console.log(html.substring(Math.max(0, pos - 500), Math.min(html.length, pos + 500)));
