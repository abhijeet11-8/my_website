import profile from "../content/profile.json";
import Link from "next/link";

export default function Home() {
  const profileName = profile.name || profile.fullName || '';
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <div className="profile-container">
      <div className="hero">
        <div className="text-panel">
          <div className="profile-header">
            <img src={`${base}/profile.jpg`} alt="Profile" className="avatar-small" />
            <div>
              <h1>{profileName}</h1>
              <p className="lead">{profile.headline}</p>
            </div>
          </div>

        <div className="links" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <img src={`${base}/icons/github.svg`} alt="GitHub" className="icon-social" />
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={`${base}/icons/linkedin.svg`} alt="LinkedIn" className="icon-social" />
            </a>
          )}
          {profile.gmail && (
            <a href={`mailto:${profile.gmail}`} target="_blank" rel="noopener noreferrer">
              <img src={`${base}/icons/mail.svg`} alt="Email" className="icon-social icon-mail" />
            </a>
          )}
        </div>

        <section id="education">
          <h3>Education</h3>
          {profile.education && profile.education.map((ed, i) => (
            <div key={i} className="entry" style={{ marginTop: 10 }}>
              <strong>{ed.institution}</strong>
              <div className="muted">{ed.degree} — {ed.field} <span className="muted">{ed.year}</span></div>
            </div>
          ))}
        </section>


        <section id="experience">
          <h3>Experience</h3>
          {profile.experience && profile.experience.map((e, i) => (
            <div key={i} className="entry" style={{ marginTop: 10 }}>
              <strong>{e.role}</strong> — <span className="muted">{e.company}</span>
              <div className="muted">{e.start}{e.end ? ' – ' + e.end : ''}</div>
              {e.summary && <div style={{ marginTop: 6 }}>{e.summary}</div>}
            </div>
          ))}
        </section>

        <section id="projects">
          <h3>Projects</h3>
          <ul className="projects-list">
            {profile.projects && profile.projects.map(p => (
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

