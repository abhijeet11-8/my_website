import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  try {
    const dir = path.join(process.cwd(), 'content', 'thoughts');
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    const items = files.map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      const slug = f.replace(/\.md$/, '');
      return {
        slug,
        title: data.title || slug,
        date: data.date || null,
        summary: data.summary || null,
      };
    }).sort((a,b) => (b.date || '').localeCompare(a.date || ''));

    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to read thoughts' });
  }
}
