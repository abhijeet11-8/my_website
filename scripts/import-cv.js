// Simple helper to extract text from a PDF CV and create a basic JSON file.
// Requires `npm install pdf-parse`.
const fs = require('fs');
const path = require('path');
let pdfParse;
try { pdfParse = require('pdf-parse'); } catch (e) {
  console.error('pdf-parse not found. Run: npm install pdf-parse');
  process.exit(1);
}

const argv = process.argv.slice(2);
if (argv.length < 1) {
  console.error('Usage: node import-cv.js <path-to-cv.pdf>');
  process.exit(1);
}
const pdfPath = path.resolve(argv[0]);
if (!fs.existsSync(pdfPath)) {
  console.error('File not found:', pdfPath);
  process.exit(1);
}

(async () => {
  const buffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(buffer);
  const text = data.text || '';

  // Very naive heuristics: split by lines and look for sections.
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out = { name: '', headline: '', experience: [], education: [], projects: [] };

  // first non-empty line -> name
  out.name = lines[0] || '';
  // next couple lines as headline
  out.headline = lines.slice(1,4).join(' ').slice(0,200);

  // find lines that look like dates to classify experience/education
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/\b(20|19)\d{2}\b/.test(l) && /\b(20|19)\d{2}\b/.test(lines[i+1] || '')) {
      // likely a date range + role line nearby
      const role = lines[i-1] || l;
      out.experience.push({ role: role, company: l, start: '', end: '' });
    }
  }

  const outPath = path.join(process.cwd(), 'content', 'cv.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('Wrote', outPath, '— edit the file to refine entries.');
})();
