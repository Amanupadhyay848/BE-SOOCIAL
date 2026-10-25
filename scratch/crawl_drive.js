const fs = require('fs');

async function getFolderData(folderId) {
  const url = `https://drive.google.com/drive/folders/${folderId}`;
  const res = await fetch(url);
  const html = await res.text();

  // Find all tr rows with data-id
  const rowRegex = /<tr[^>]*data-id="([^"]+)"[^>]*>([\s\S]*?)<\/tr>/g;
  let match;
  const items = [];
  while ((match = rowRegex.exec(html)) !== null) {
    const id = match[1];
    const rowContent = match[2];

    // Find name
    const ariaMatch = rowContent.match(/aria-label="([^"]+)"/);
    const label = ariaMatch ? ariaMatch[1] : '';

    // Check if folder
    const isFolder = rowContent.includes('Shared folder') || label.includes('folder');

    // Extract cleaner filename
    let cleanName = label;
    if (label.includes(' Video Shared')) cleanName = label.replace(' Video Shared', '');
    if (label.includes(' Image Shared')) cleanName = label.replace(' Image Shared', '');
    if (label.includes(' Shared folder')) cleanName = label.replace(' Shared folder', '');
    if (label.includes(' Binary Shared')) cleanName = label.replace(' Binary Shared', '');

    items.push({ id, label, cleanName, isFolder });
  }

  // Also check if there's any aria-label with data-id
  return { html, items };
}

async function mapAll() {
  console.log('Mapping root public folder: 1tbdd8QepQfXsRKQLSnZNh_yqf6gLUHoY');
  const root = await getFolderData('1tbdd8QepQfXsRKQLSnZNh_yqf6gLUHoY');
  console.log('Root items:', root.items);

  const mediaItem = root.items.find(i => i.cleanName === 'media' || i.isFolder);
  const mediaId = mediaItem ? mediaItem.id : '1VFpM6q-6vFFQgHko5J4IJjeyHMD8LCZr';

  console.log('\nMapping media folder:', mediaId);
  const media = await getFolderData(mediaId);
  console.log('Media items count:', media.items.length);
  media.items.forEach(i => console.log(`  - ${i.cleanName} (${i.id}) [folder=${i.isFolder}]`));

  const portfolioItem = media.items.find(i => i.cleanName === 'portfolio');
  const aiFilmmakingItem = media.items.find(i => i.cleanName === 'ai-filmmaking');

  if (portfolioItem) {
    console.log('\nMapping portfolio folder:', portfolioItem.id);
    const portfolio = await getFolderData(portfolioItem.id);
    console.log('Portfolio items count:', portfolio.items.length);
    portfolio.items.forEach(i => console.log(`    * ${i.cleanName} (${i.id})`));
  }

  if (aiFilmmakingItem) {
    console.log('\nMapping ai-filmmaking folder:', aiFilmmakingItem.id);
    const aiFilm = await getFolderData(aiFilmmakingItem.id);
    console.log('ai-filmmaking items count:', aiFilm.items.length);
    aiFilm.items.forEach(i => console.log(`    * ${i.cleanName} (${i.id})`));
  }
}

mapAll().catch(console.error);
