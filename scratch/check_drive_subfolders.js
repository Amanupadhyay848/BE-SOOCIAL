const fs = require('fs');

async function checkSubfolders() {
  const folders = [
    { name: 'portfolio', id: '1r4XYeNrImTsWdWybRNs_39-9clCSzWQJ' },
    { name: 'Brand Content & Edits', id: '1Q8K4t0olGAFeI-8oUn2pAUSD6N-UHgcO' },
    { name: 'ai-filmmaking', id: '1jdlXgzMfBaLtIaGOFxNpkfUQ-VxEcZ0K' },
    { name: 'workflow', id: '1vTVMyjQZ1RCvY-SoMKc64VKRw6KkR-n0' },
  ];

  for (const f of folders) {
    const url = `https://drive.google.com/drive/folders/${f.id}`;
    const res = await fetch(url);
    const html = await res.text();
    const regex = /aria-label="([^"]+)"/g;
    let m;
    const items = [];
    while ((m = regex.exec(html)) !== null) {
      if (m[1].includes('.mp4') || m[1].includes('.jpg') || m[1].includes('.png') || m[1].includes('folder') || m[1].includes('Video') || m[1].includes('Image')) {
        items.push(m[1]);
      }
    }
    console.log(`\nFolder "${f.name}":`, items);
  }
}

checkSubfolders().catch(console.error);
