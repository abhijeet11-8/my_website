import cv from '../content/cv.json';
import profile from '../content/profile.json';
import Link from 'next/link';

export default function CV() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <div style={{ maxWidth: 900, margin: '3rem auto', padding: '0 24px' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <img src={`${base}/profile.jpg`} alt="profile" style={{ width: 96, height: 96, borderRadius: 999 }} />
        <div>
          <h1>{cv.name || profile.name}</h1>
          <p className="lead">{cv.headline || profile.headline}</p>
        </div>
      </header>

      <section style={{ marginTop: 28 }}>
        <h2>Experience</h2>
        {cv.experience && cv.experience.map((e, i) => (
          <div key={i} style={{ marginTop: 12 }}>
            <strong>{e.role}</strong> — {e.company} <span className="muted">{e.start}{e.end ? ' – ' + e.end : ''}</span>
            <div className="muted">{e.summary}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Education</h2>
        {cv.education && cv.education.map((ed, i) => (
          <div key={i} style={{ marginTop: 12 }}>
            <strong>{ed.institution}</strong>
            <div className="muted">{ed.degree} — {ed.field} <span className="muted">{ed.year}</span></div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Projects</h2>
        <ul className="projects-list">
          {cv.projects && cv.projects.map(p => (
            <li key={p.title}>
              {p.link && p.link.startsWith('/') ? (
                <Link href={p.link} className="project-link"><strong>{p.title}</strong><span className="muted"> {p.summary}</span></Link>
              ) : (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link"><strong>{p.title}</strong><span className="muted"> {p.summary}</span></a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
