import { useEffect, useState } from 'react';
import staticInterests from '../../content/interests.json';
import Link from 'next/link';

export default function InterestsPage() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
    fetch(`${base}/api/interests`)
      .then(r => {
        if (!r.ok) throw new Error('no api');
        return r.json();
      })
      .then(data => {
        if (cancelled) return;
        setItems(data && data.length ? data : staticInterests);
      })
      .catch(() => { if (!cancelled) setItems(staticInterests); });
    return () => { cancelled = true; };
  }, []);

  const list = items || staticInterests;

  return (
    <main>
      <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1.5rem' }}>
        <h1>Interests</h1>
        <p>These topics are editable in <strong>content/interests.json</strong>.</p>
        <ul>
          {list && list.length > 0 ? (
            list.map((it, i) => (
              <li key={i} style={{ margin: '8px 0', fontSize: '1.05rem' }}>{it}</li>
            ))
          ) : (
            <li className="muted">No interests listed</li>
          )}
        </ul>

        <div style={{ marginTop: 18 }}>
          <Link href="/">← Back to home</Link>
        </div>
      </div>
    </main>
  );
}
