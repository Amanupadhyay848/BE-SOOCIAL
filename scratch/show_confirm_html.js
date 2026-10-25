async function showHtml() {
  const url = 'https://drive.usercontent.google.com/download?id=1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM&export=download';
  const res = await fetch(url);
  const text = await res.text();
  console.log(text);
}
showHtml().catch(console.error);
