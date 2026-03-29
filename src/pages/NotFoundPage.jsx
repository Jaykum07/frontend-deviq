// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0d1117',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'Inter, sans-serif',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#e6edf3',
    marginTop: '2rem',
    marginBottom: '0.75rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6e7681',
    textAlign: 'center',
    maxWidth: '320px',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  btn: {
    backgroundColor: '#1f6feb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 24px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
};

// SVG illustration — no data / not found
const NotFoundSVG = () => (
  <svg
    viewBox="0 0 320 260"
    width="300"
    height="240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ground shadow */}
    <ellipse cx="160" cy="230" rx="110" ry="10" fill="#161b22" />

    {/* Monitor body */}
    <rect x="60" y="30" width="200" height="145"
      rx="12" fill="#161b22" stroke="#30363d" strokeWidth="2" />

    {/* Screen */}
    <rect x="74" y="44" width="172" height="118"
      rx="6" fill="#0d1117" />

    {/* Document icon on screen */}
    <rect x="118" y="64" width="64" height="78"
      rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />

    {/* Document header fold */}
    <path d="M164 64 L182 64 L182 82 L164 82 Z"
      fill="#21262d" stroke="#30363d" strokeWidth="1" />
    <path d="M164 64 L182 82 L164 82 Z" fill="#0d1117" />

    {/* Sad face — eyes */}
    <circle cx="138" cy="108" r="3.5" fill="#6e7681" />
    <circle cx="154" cy="108" r="3.5" fill="#6e7681" />

    {/* Sad face — frown */}
    <path d="M136 122 Q146 116 156 122"
      stroke="#6e7681" strokeWidth="2"
      strokeLinecap="round" fill="none" />

    {/* NO DATA label */}
    <text x="150" y="136"
      textAnchor="middle"
      fill="#484f58"
      fontSize="7"
      fontFamily="monospace"
      letterSpacing="1">
      NO DATA
    </text>

    {/* Monitor stand neck */}
    <rect x="148" y="175" width="24" height="20"
      rx="2" fill="#21262d" />

    {/* Monitor stand base */}
    <rect x="128" y="193" width="64" height="10"
      rx="5" fill="#21262d" />

    {/* Person — head */}
    <circle cx="252" cy="72" r="20"
      fill="#1c2333" stroke="#30363d" strokeWidth="1.5" />

    {/* Person — hair */}
    <path d="M234 65 Q252 52 270 65"
      fill="#30363d" />

    {/* Person — body */}
    <path d="M252 92 L252 148"
      stroke="#1c2333" strokeWidth="10"
      strokeLinecap="round" />

    {/* Person — left arm pointing at screen */}
    <path d="M252 108 Q228 104 210 98"
      stroke="#1c2333" strokeWidth="8"
      strokeLinecap="round" fill="none" />

    {/* Person — right arm */}
    <path d="M252 108 Q268 118 274 112"
      stroke="#1c2333" strokeWidth="8"
      strokeLinecap="round" fill="none" />

    {/* Person — left leg */}
    <path d="M252 148 Q242 168 236 184"
      stroke="#1c2333" strokeWidth="8"
      strokeLinecap="round" fill="none" />

    {/* Person — right leg */}
    <path d="M252 148 Q262 168 268 184"
      stroke="#1c2333" strokeWidth="8"
      strokeLinecap="round" fill="none" />

    {/* Floating dots — decorative */}
    <circle cx="44" cy="80"  r="3" fill="#1f6feb" opacity="0.5" />
    <circle cx="34" cy="110" r="2" fill="#1f6feb" opacity="0.3" />
    <circle cx="54" cy="130" r="2" fill="#1f6feb" opacity="0.4" />
    <circle cx="290" cy="140" r="3" fill="#1f6feb" opacity="0.4" />
    <circle cx="302" cy="110" r="2" fill="#1f6feb" opacity="0.3" />

    {/* 404 text floating above monitor */}
    <text x="160" y="24"
      textAnchor="middle"
      fill="#30363d"
      fontSize="18"
      fontWeight="700"
      fontFamily="Inter, sans-serif"
      letterSpacing="4">
      404
    </text>
  </svg>
);

const NotFoundPage = () => {
  return (
    <div style={s.page}>
      <NotFoundSVG />

      <h2 style={s.title}>Page Not Found</h2>

      <p style={s.subtitle}>
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link to="/dashboard" style={s.btn}>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
