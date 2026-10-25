const fs = require('fs');

const html = fs.readFileSync('scratch/public_drive.html', 'utf8');

const ids = [
  '1VFpM6q-6vFFQgHko5J4IJjeyHMD8LCZr',
  '1UucOVHYC6e87VSFSABQIWwrbEyutexqz',
  '1zwdPv9lO3TpXr1rI6SNRVU-J0ASrvZ__',
  '1bkSLmbFPeimmOhOtdu04EIVo7724aLlz',
  '1u7luhKQwbRjZ0CnURrGnrMkCkKPq1dEC',
  '12BsP-xxrRiH_0DuUhEIBFWm2EVW76ZUk',
  '1DPK_GWqaXNb_bLnAJimNUGj_0t17DFUu',
  '1knJfDbofozJbqassQrFERzGHuzeeuXIK'
];

ids.forEach(id => {
  const pos = html.indexOf(id);
  if (pos !== -1) {
    const chunk = html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 300));
    console.log(`\nID: ${id}`);
    const ariaMatch = chunk.match(/aria-label="([^"]+)"/);
    console.log('Aria:', ariaMatch ? ariaMatch[1] : 'none');
  }
});
