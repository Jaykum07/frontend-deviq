import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutApi } from '../api/authApi';
import useAuth from '../hooks/useAuth';
import { colors, font } from '../theme';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try { await logoutApi(); } catch (err) {
      console.error('Logout failed:', err);
    }
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Home'    },
    { path: '/compare',   label: 'Compare' },
    { path: '/reports',   label: 'Reports' },
  ];

  const isActive = (path) =>
    location.pathname === path ||
    (path !== '/dashboard' && location.pathname.startsWith(path));

  return (
    <>
      <nav style={{
        position:        'sticky',
        top:             0,
        zIndex:          100,
        backgroundColor: colors.surface,
        borderBottom:    `1px solid ${colors.border}`,
        fontFamily:      font.family,
      }}>
        <div style={{
          maxWidth:      '1100px',
          margin:        '0 auto',
          padding:       '0 1.25rem',
          height:        '62px',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
        }}>

          {/* ── Logo ── */}
          <Link to="/dashboard" style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '10px',
            textDecoration: 'none',
            flexShrink:     0,
          }}>
            <img
              src="/deviqlogo.jpg"
              alt="DevIQ"
              style={{
                width: '34px', height: '34px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${colors.border}`,
              }}
            />
            <span style={{
              fontSize:    '1.15rem',
              fontWeight:  '700',
              color:       colors.textPrimary,
              letterSpacing: '-0.3px',
            }}>
              Dev<span style={{ color: colors.blue }}>IQ</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '4px',
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding:        '6px 14px',
                  borderRadius:   '8px',
                  fontSize:       '0.875rem',
                  fontWeight:     '500',
                  textDecoration: 'none',
                  color:          isActive(link.path) ? colors.blue : colors.textSecondary,
                  backgroundColor:isActive(link.path) ? colors.blueDim : 'transparent',
                  transition:     'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) {
                    e.target.style.color           = colors.textPrimary;
                    e.target.style.backgroundColor = colors.surface2;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) {
                    e.target.style.color           = colors.textSecondary;
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right side ── */}
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '12px',
          }}>
            {/* User avatar + name */}
            <div style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '8px',
            }} className="desktop-nav">
              <div style={{
                width:           '30px',
                height:          '30px',
                borderRadius:    '50%',
                backgroundColor: colors.blueDim,
                border:          `1px solid ${colors.blue}40`,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontSize:        '0.8rem',
                fontWeight:      '600',
                color:           colors.blue,
                flexShrink:      0,
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{
                fontSize: '0.85rem',
                color:    colors.textMuted,
                maxWidth: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {user?.name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className='desktop-nav'
              style={{
                backgroundColor: 'transparent',
                color:           colors.textMuted,
                border:          `1px solid ${colors.border}`,
                borderRadius:    '8px',
                padding:         '6px 14px',
                fontSize:        '0.82rem',
                fontWeight:      '500',
                cursor:          'pointer',
                fontFamily:      font.family,
                transition:      'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.target.style.color       = colors.red;
                e.target.style.borderColor = colors.red;
              }}
              onMouseLeave={(e) => {
                e.target.style.color       = colors.textMuted;
                e.target.style.borderColor = colors.border;
              }}
            >
              Logout
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display:         'none',
                backgroundColor: 'transparent',
                border:          'none',
                cursor:          'pointer',
                padding:         '4px',
                color:           colors.textSecondary,
              }}
              className="mobile-menu-btn"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div style={{
            borderTop:       `1px solid ${colors.border}`,
            backgroundColor: colors.surface,
            padding:         '0.75rem 1.25rem 1rem',
            animation:       'fadeIn 0.2s ease',
          }} className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display:        'block',
                  padding:        '10px 12px',
                  borderRadius:   '8px',
                  fontSize:       '0.9rem',
                  fontWeight:     '500',
                  textDecoration: 'none',
                  color:          isActive(link.path) ? colors.blue : colors.textSecondary,
                  backgroundColor:isActive(link.path) ? colors.blueDim : 'transparent',
                  marginBottom:   '2px',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{
              borderTop:   `1px solid ${colors.border}`,
              marginTop:   '0.75rem',
              paddingTop:  '0.75rem',
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.85rem', color: colors.textMuted }}>
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: 'transparent',
                  border:          'none',
                  color:           colors.red,
                  fontSize:        '0.85rem',
                  cursor:          'pointer',
                  fontFamily:      font.family,
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav   { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 641px) {
          .mobile-menu   { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;