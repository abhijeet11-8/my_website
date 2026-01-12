import cv from "../content/cv.json";
import Link from "next/link";

export default function Home() {
  const profileName = cv.name || cv.fullName || '';
  return (
    <div className="profile-container">
      <div className="hero">
        <div className="text-panel">
          <img src="/profile.jpg" alt="Profile" className="avatar-small" />
          <div>
            <h1>{profileName}</h1>
            <p className="lead">{cv.headline}</p>
          </div>

        <div className="links" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {cv.github && (
            <a href={cv.github} target="_blank" rel="noopener noreferrer">
              <img src="/icons/github.svg" alt="GitHub" className="icon-social" />
            </a>
          )}
          {cv.linkedin && (
            <a href={cv.linkedin} target="_blank" rel="noopener noreferrer">
              <img src="/icons/linkedin.svg" alt="LinkedIn" className="icon-social" />
            </a>
          )}
        </div>

        <section id="education">
          <h3>Education</h3>
          {cv.education && cv.education.map((ed, i) => (
            <div key={i} style={{ marginTop: 10 }}>
              <strong>{ed.institution}</strong>
              <div className="muted">{ed.degree} — {ed.field} <span className="muted">{ed.year}</span></div>
            </div>
          ))}
        </section>


        <section id="experience">
          <h3>Experience</h3>
          {cv.experience && cv.experience.map((e, i) => (
            <div key={i} style={{ marginTop: 10 }}>
              <strong>{e.role}</strong> — <span className="muted">{e.company}</span>
              <div className="muted">{e.start}{e.end ? ' – ' + e.end : ''}</div>
              {e.summary && <div style={{ marginTop: 6 }}>{e.summary}</div>}
            </div>
          ))}
        </section>

        <section id="projects">
          <h3>Projects</h3>
          <ul className="projects-list">
            {cv.projects && cv.projects.map(p => (
              <li key={p.title}>
                {p.link && p.link.startsWith('/') ? (
                  <Link href={p.link} className="project-link">
                    <strong>{p.title}</strong>
                    <span className="muted">{p.summary ? ' ' + p.summary : ''}</span>
                  </Link>
                ) : (
                  <a href={p.link || '#'} target="_blank" rel="noopener noreferrer" className="project-link">
                    <strong>{p.title}</strong>
                    <span className="muted">{p.summary ? ' ' + p.summary : ''}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
        </div>
      </div>
    </div>
  );
}

