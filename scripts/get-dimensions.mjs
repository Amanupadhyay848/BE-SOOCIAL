import fs from 'node:fs';

function findDimensions(filePath) {
  const stat = fs.statSync(filePath);
  const fd = fs.openSync(filePath, 'r');
  
  // Read first 1MB and last 2MB (where moov/tkhd usually are)
  const chunkSize = Math.min(stat.size, 10 * 1024 * 1024);
  const buf = Buffer.alloc(chunkSize);
  
  // Try reading beginning
  fs.readSync(fd, buf, 0, chunkSize, 0);
  let res = parseTkhd(buf);
  
  // If not found, try reading end
  if (!res && stat.size > chunkSize) {
    const endBuf = Buffer.alloc(chunkSize);
    fs.readSync(fd, endBuf, 0, chunkSize, stat.size - chunkSize);
    res = parseTkhd(endBuf);
  }
  
  fs.closeSync(fd);
  return res;
}

function parseTkhd(buf) {
  const tkhdIdx = buf.indexOf(Buffer.from('tkhd'));
  if (tkhdIdx === -1) return null;
  
  // Box starts 4 bytes before 'tkhd'
  const boxStart = tkhdIdx - 4;
  const version = buf.readUInt8(boxStart + 8);
  const widthOffset = boxStart + 8 + (version === 1 ? 88 : 76);
  const heightOffset = widthOffset + 4;
  
  if (heightOffset + 4 > buf.length) return null;
  
  const width = buf.readUInt32BE(widthOffset) >> 16;
  const height = buf.readUInt32BE(heightOffset) >> 16;
  return { width, height, aspect: (width / height).toFixed(3), ratioStr: getAspectStr(width, height) };
}

function getAspectStr(w, h) {
  const r = w / h;
  if (Math.abs(r - 16/9) < 0.05) return '16/9';
  if (Math.abs(r - 9/16) < 0.05) return '9/16';
  if (Math.abs(r - 4/3) < 0.05) return '4/3';
  if (Math.abs(r - 1/1) < 0.05) return '1/1';
  if (Math.abs(r - 21/9) < 0.05) return '21/9';
  if (Math.abs(r - 2.35) < 0.05) return '2.35/1';
  if (Math.abs(r - 2.39) < 0.05) return '2.39/1';
  if (Math.abs(r - 4/5) < 0.05) return '4/5';
  return `${w}/${h}`;
}

const files = [
  'public/media/hod-sample-render.mp4',
  'public/media/me-vs-dooms.mp4',
  'public/media/sample.mp4'
];

for (const f of files) {
  console.log(f, findDimensions(f));
}
