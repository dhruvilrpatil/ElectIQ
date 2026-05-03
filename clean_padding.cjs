const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      getFiles(p, files);
    } else {
      if (['.js', '.jsx', '.css'].includes(path.extname(p))) {
        files.push(p);
      }
    }
  }
  return files;
}

const files = [...getFiles('frontend/src'), ...getFiles('backend/src')];

const markers = [
  "\n// --- GENERATED METADATA BLOCK ---",
  "\n/* --- GENERATED METADATA BLOCK --- */",
  "\n// --- ARCHITECTURAL CONTEXT & EVALUATION DATA ---",
  "\n/* --- ARCHITECTURAL CONTEXT & EVALUATION DATA --- */"
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let cleaned = false;
  
  for (const marker of markers) {
    const idx = content.indexOf(marker);
    if (idx !== -1) {
      content = content.substring(0, idx);
      cleaned = true;
    }
  }
  
  if (cleaned) {
    fs.writeFileSync(file, content);
  }
});

console.log(`Cleaned all fake padding from ${files.length} files.`);
