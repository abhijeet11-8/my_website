import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `${name} <${email}>`,
      to,
      subject: `Website contact from ${name}`,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br/>')}</p><p>From: ${name} &lt;${email}&gt;</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send error', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
