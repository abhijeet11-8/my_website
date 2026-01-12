import profile from "../content/profile.json";

export default function Contact() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || profile.gmail || 'vikramabhijeet68@gmail.com';

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <p>Connect with me:</p>

      <div className="contact-icons">
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <img src={`${base}/icons/github.svg`} alt="GitHub" className="contact-icon" />
          </a>
        )}

        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <img src={`${base}/icons/linkedin.svg`} alt="LinkedIn" className="contact-icon" />
          </a>
        )}

        <a href={`mailto:${email}`}>
          <img src={`${base}/icons/mail.svg`} alt="Email" className="contact-icon icon-mail" />
        </a>
      </div>
    </div>
  );
}
