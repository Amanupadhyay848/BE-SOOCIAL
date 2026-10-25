const fs = require('fs');

async function inspectPublicDrive() {
  const url = 'https://drive.google.com/drive/folders/1tbdd8QepQfXsRKQLSnZNh_yqf6gLUHoY';
  const res = await fetch(url);
  const html = await res.text();
  fs.writeFileSync('scratch/public_drive.html', html);
  console.log('Saved html, length:', html.length);

  const regex = /aria-label="([^"]+)"/g;
  let m;
  const items = [];
  while ((m = regex.exec(html)) !== null) {
    items.push(m[1]);
  }
  console.log('Found aria-labels:', items);
}

inspectPublicDrive().catch(console.error);
