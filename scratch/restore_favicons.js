const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const icons = [
  { name: 'apple-touch-icon.png', id: '1UucOVHYC6e87VSFSABQIWwrbEyutexqz' },
  { name: 'favicon-16x16.png', id: '1zwdPv9lO3TpXr1rI6SNRVU-J0ASrvZ__' },
  { name: 'favicon-32x32.png', id: '1bkSLmbFPeimmOhOtdu04EIVo7724aLlz' },
  { name: 'favicon.svg', id: '1u7luhKQwbRjZ0CnURrGnrMkCkKPq1dEC' },
  { name: 'icon-192.png', id: '12BsP-xxrRiH_0DuUhEIBFWm2EVW76ZUk' },
  { name: 'icon-512.png', id: '1DPK_GWqaXNb_bLnAJimNUGj_0t17DFUu' },
  { name: 'site.webmanifest', id: '1knJfDbofozJbqassQrFERzGHuzeeuXIK' },
];

async function downloadIcons() {
  for (const item of icons) {
    const url = `https://drive.usercontent.google.com/download?id=${item.id}&export=download&confirm=t`;
    console.log(`Downloading ${item.name}...`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to download ${item.name}: ${res.status}`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(publicDir, item.name), buffer);
    console.log(`Saved ${item.name} (${buffer.length} bytes)`);
  }
}

downloadIcons().catch(console.error);
