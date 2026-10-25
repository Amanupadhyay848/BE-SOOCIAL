const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'lib', 'data', 'runtime-store.json');
if (fs.existsSync(storePath)) {
  fs.unlinkSync(storePath);
  console.log('Deleted old runtime-store.json to regenerate from fresh single-source-of-truth portfolio data!');
}
