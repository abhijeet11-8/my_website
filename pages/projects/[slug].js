import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import katex from 'katex';

function renderMath(md) {
  // render $$...$$ (display)
  md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
    try {
      return katex.renderToString(expr, { displayMode: true });
    } catch (e) { return `<pre>${expr}</pre>`; }
  });
  // render $...$ (inline)
  md = md.replace(/\$([^\$\n]+?)\$/g, (_, expr) => {
    try { return katex.renderToString(expr, { displayMode: false }); }
    catch (e) { return `$${expr}$`; }
  });
  return md;
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'content', 'projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const paths = files.map(f => ({ params: { slug: f.replace(/\.md$/, '') } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'projects', `${params.slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const withMath = renderMath(content);
  const html = marked(withMath);
  return { props: { meta: data || {}, html } };
}

export default function ProjectPage({ meta, html }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // prefix slide paths if they start with /
  const slides = meta.slides ? (meta.slides.startsWith('/') ? `${base}${meta.slides}` : `${base}/${meta.slides}`) : null;
  // prefix image paths in rendered html
  const adjustedHtml = html.replace(/src="\/(?!_next)/g, `src="${base}/`);
  return (
    <article className="thoughts" style={{ maxWidth: '900px', margin: '3rem auto' }}>
      <h1>{meta.title}</h1>
      {meta.date && <div style={{ color: '#9b9b9b', marginBottom: '1rem' }}>{meta.date}</div>}

      {slides ? (
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 8, alignItems: 'center' }}>
            <strong style={{ fontSize: 14 }}>Slides</strong>
            <div style={{ color: '#9b9b9b' }}>{slides}</div>
            <div style={{ marginLeft: 'auto' }}>
              <a href={slides} target="_blank" rel="noopener noreferrer" style={{ color: '#4aa3ff', textDecoration: 'none' }}>Open in new tab</a>
              <span style={{ marginLeft: 12 }}>
                <a href={slides} download style={{ color: '#4aa3ff', textDecoration: 'none' }}>Download</a>
              </span>
            </div>
          </div>

          <div style={{ border: '1px solid rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden' }}>
            <iframe src={slides} width="100%" height="600" title="Project slides" style={{ border: 'none' }} />
          </div>
        </div>
      ) : null}

      <div dangerouslySetInnerHTML={{ __html: adjustedHtml }} />
    </article>
  );
}
