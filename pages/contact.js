import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setStatus(data?.error || 'error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <p>If you'd like to reach out about projects or collaborations, send me a message below.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Your email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <textarea
          placeholder="Message"
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        <button type="submit">Send</button>
      </form>

      {status === 'sending' && <p>Sending…</p>}
      {status === 'sent' && <p>Thanks — your message was sent.</p>}
      {status === 'error' && <p>Sorry — something went wrong.</p>}
    </div>
  );
}
