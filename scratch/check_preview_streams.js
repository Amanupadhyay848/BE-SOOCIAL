async function checkPreviewStreams() {
  const url = 'https://drive.google.com/file/d/1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM/preview';
  const res = await fetch(url);
  const text = await res.text();
  
  ['fmt_stream_map', 'video', 'drive.google.com', 'download', 'preview', 'video_url', 'videoplayback'].forEach(k => {
    let pos = 0;
    let count = 0;
    while ((pos = text.indexOf(k, pos)) !== -1) {
      count++;
      pos += k.length;
    }
    console.log(`${k}: ${count} matches`);
  });

  // Check if there is an iframe embed or player config
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
  let sm;
  while ((sm = scriptRegex.exec(text)) !== null) {
    if (sm[1].includes('fmt_stream_map') || sm[1].includes('videoplayback') || sm[1].includes('downloadUrl')) {
      console.log('Found matching script block!');
      console.log(sm[1].substring(0, 500));
    }
  }
}

checkPreviewStreams().catch(console.error);
