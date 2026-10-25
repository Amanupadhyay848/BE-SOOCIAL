const fs = require('fs');

const html = fs.readFileSync('scratch_drive.html', 'utf8');

console.log('--- Term Search in Drive HTML ---');
['ai-filmmaking', 'portfolio', 'Brand Content', 'workflow', 'SAMPLE', 'starbucks', 'blinkpic', 'HOD', 'DOOMS'].forEach(term => {
  let idx = 0;
  let count = 0;
  while ((idx = html.indexOf(term, idx)) !== -1) {
    count++;
    idx += term.length;
  }
  console.log(`${term}: found ${count} times`);
});

// Extract context around matches
const terms = ['HOD', 'DOOMS', 'SAMPLE', 'portfolio', 'Brand Content', 'workflow', 'ai-filmmaking'];
terms.forEach(term => {
  const pos = html.indexOf(term);
  if (pos !== -1) {
    console.log(`\nContext around "${term}":`);
    console.log(html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 250)));
  }
});
