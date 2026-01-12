import Link from "next/link";
import { useState, useEffect } from "react";
import profile from "../content/profile.json";
import cv from "../content/cv.json";

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [thoughts, setThoughts] = useState(null);

  useEffect(() => {
    if (!open || thoughts) return;
    let cancelled = false;
    fetch('/api/thoughts')
      .then(r => r.json())
      .then(data => {
        if (!cancelled) setThoughts(data);
      })
      .catch(() => {
        if (!cancelled) setThoughts([]);
      });
    return () => { cancelled = true; };
  }, [open, thoughts]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <button className="hamburger" aria-label="Open menu" onClick={() => setOpen(true)}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="18" height="2" rx="1" fill="currentColor" />
              <rect y="5" width="18" height="2" rx="1" fill="currentColor" />
              <rect y="10" width="18" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className="nav-right" />
      </nav>

      {open && (
        <div className="overlay-menu">
          <button className="overlay-close" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
          <div className="overlay-inner">
            <ul className="overlay-list">
                <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
                <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>

                <li className="overlay-section">Thoughts</li>
                {thoughts && thoughts.length > 0 ? (
                  thoughts.map(t => (
                    <li key={t.slug}>
                      <Link href={`/thoughts/${t.slug}`} onClick={() => setOpen(false)}>
                        {t.title}{t.date ? <span className="muted"> — {t.date}</span> : null}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><span className="muted">Loading…</span></li>
                )}

                <li className="overlay-section">Projects</li>
                {cv.projects && cv.projects.map(p => (
                  <li key={p.title}>
                    <Link href={p.link || `/projects/${slugify(p.title)}`} onClick={() => setOpen(false)}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>

            <div className="overlay-footer">
              <a href={cv.github || profile.github} target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" className="icon-social" />
              </a>
              <a href={cv.linkedin || profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '12px' }}>
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="icon-social" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
