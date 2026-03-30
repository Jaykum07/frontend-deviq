import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi';
import useAuth from '../hooks/useAuth';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0d1117',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: 'Inter, -apple-system, sans-serif',
  },
  wrapper: {
    width: '100%',
    maxWidth: '420px',
  },
  logoArea: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  logoImg: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  logoText: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  tagline: {
    fontSize: '0.85rem',
    color: '#6e7681',
  },
  card: {
    backgroundColor: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '16px',
    padding: '2rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#e6edf3',
    marginBottom: '1.5rem',
  },
  errorBox: {
    backgroundColor: 'rgba(248,81,73,0.1)',
    border: '1px solid rgba(248,81,73,0.4)',
    color: '#f85149',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#8b949e',
    marginBottom: '6px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    backgroundColor: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#e6edf3',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    backgroundColor: '#1f6feb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '11px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#1f6feb80',
    cursor: 'not-allowed',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.25rem',
    fontSize: '0.85rem',
    color: '#6e7681',
  },
  link: {
    color: '#58a6ff',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

const LoginPage = () => {
  const navigate    = useNavigate();
  const { login }   = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      console.log('Submitting Login Form with:', formData);
      const res = await loginApi(formData.email, formData.password);
      login(res.data.user, res.data.accessToken);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>

        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={styles.logoRow}>
            <img src="/deviqlogo.jpg" alt="DevIQ" style={styles.logoImg} />
            <span style={styles.logoText}>DevIQ</span>
          </div>
          <p style={styles.tagline}>Developer Intelligence Platform</p>
        </div>

        {/* Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Sign in to your account</h2>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={styles.footer}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>Create one</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;