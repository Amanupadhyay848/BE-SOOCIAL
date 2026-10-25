async function checkPreview() {
  const url = 'https://drive.google.com/file/d/1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM/preview';
  const res = await fetch(url);
  const text = await res.text();
  console.log('Preview status:', res.status);
  console.log('Preview length:', text.length);
  // Look for video stream URLs in the preview HTML
  const videostreams = text.match(/https:\/\/[^"'\\]+googlevideo\.com[^"'\\]+/g);
  console.log('Found googlevideo streams:', videostreams);
}

checkPreview().catch(console.error);
