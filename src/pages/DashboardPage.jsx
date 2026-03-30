import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import { getHistoryApi, deleteOneHistoryApi, clearAllHistoryApi } from '../api/historyApi';
import { getReportsApi } from '../api/reportApi';
import { colors, font, card, btnPrimary, btnSecondary } from '../theme';

// ── Helpers ───────────────────────────────────────────────────────────────────
const timeAgo = (date) => {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60)        return 'just now';
  if (s < 3600)      return `${Math.floor(s/60)}m ago`;
  if (s < 86400)     return `${Math.floor(s/3600)}h ago`;
  if (s < 604800)    return `${Math.floor(s/86400)}d ago`;
  return new Date(date).toLocaleDateString();
};

const scoreColor = (n) => {
  if (n >= 70) return { text: colors.green,  bg: colors.greenDim,  border: `${colors.green}40`  };
  if (n >= 40) return { text: colors.yellow, bg: colors.yellowDim, border: `${colors.yellow}40` };
  return             { text: colors.red,    bg: colors.redDim,    border: `${colors.red}40`    };
};

// ── Skeleton loader row ───────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="animate-pulse" style={{
    ...card,
    height: '72px',
    borderRadius: '10px',
  }} />
);

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyHistory = () => (
  <div style={{
    ...card,
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    padding:        '3.5rem 1rem',
    textAlign:      'center',
  }}>
    <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
      <rect x="10" y="8" width="60" height="46" rx="8"
        fill={colors.surface2} stroke={colors.border} strokeWidth="1.5"/>
      <rect x="20" y="18" width="40" height="28" rx="4" fill={colors.bg}/>
      <circle cx="32" cy="34" r="3" fill={colors.border}/>
      <circle cx="40" cy="34" r="3" fill={colors.border}/>
      <circle cx="48" cy="34" r="3" fill={colors.border}/>
      <rect x="34" y="54" width="12" height="8" rx="2" fill={colors.surface2}/>
      <rect x="24" y="61" width="32" height="5" rx="2.5" fill={colors.surface2}/>
    </svg>
    <p style={{ color: colors.textSecondary, fontWeight: '600', marginTop: '1rem', fontSize: '0.95rem' }}>
      No searches yet
    </p>
    <p style={{ color: colors.textMuted, fontSize: '0.82rem', marginTop: '4px' }}>
      Enter a GitHub username above to get started
    </p>
  </div>
);

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, accent }) => (
  <div style={{
    ...card,
    borderRadius: '14px',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* accent bar */}
    <div style={{
      position:        'absolute',
      top: 0, left: 0,
      width:           '3px',
      height:          '100%',
      backgroundColor: accent || colors.blue,
      borderRadius:    '14px 0 0 14px',
    }}/>
    <p style={{
      fontSize:      '0.75rem',
      fontWeight:    '600',
      color:         colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom:  '10px',
    }}>
      {label}
    </p>
    <p style={{
      fontSize:   '2rem',
      fontWeight: '700',
      color:      colors.textPrimary,
      lineHeight: 1,
      marginBottom: '6px',
      fontFamily: font.mono,
    }}>
      {value}
    </p>
    <p style={{ fontSize: '0.78rem', color: colors.textMuted }}>
      {sub}
    </p>
  </div>
);

// ── History item ──────────────────────────────────────────────────────────────
const HistoryItem = ({ item, onView, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const analysis = item.analysisId;
  const score    = analysis?.scores?.totalScore ?? null;
  const sc       = score !== null ? scoreColor(score) : null;

  return (
    <div
      onClick={() => onView(item.githubUsername)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        alignItems:      'center',
        gap:             '14px',
        padding:         '14px 16px',
        backgroundColor: colors.surface,
        border:          `1px solid ${hovered ? colors.blue : colors.border}`,
        borderRadius:    '10px',
        cursor:          'pointer',
        transition:      'all 0.15s',
        transform:       hovered ? 'translateY(-1px)' : 'none',
        boxShadow:       hovered ? `0 4px 20px ${colors.blue}15` : 'none',
      }}
    >
      {/* Avatar */}
      {analysis?.profile?.avatarUrl ? (
        <img
          src={analysis.profile.avatarUrl}
          alt={item.githubUsername}
          style={{
            width: '42px', height: '42px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${colors.border}`,
            flexShrink: 0,
          }}
        />
      ) : (
        <div style={{
          width: '42px', height: '42px',
          borderRadius: '50%',
          backgroundColor: colors.blueDim,
          border: `2px solid ${colors.blue}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', fontWeight: '700',
          color: colors.blue, flexShrink: 0,
        }}>
          {item.githubUsername.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '0.9rem', fontWeight: '600',
          color: colors.textPrimary,
          marginBottom: '3px',
          fontFamily: font.mono,
        }}>
          {item.githubUsername}
        </p>
        <p style={{ fontSize: '0.75rem', color: colors.textMuted }}>
          {analysis?.profile?.name && `${analysis.profile.name} · `}
          {analysis?.metrics?.primaryLanguage && `${analysis.metrics.primaryLanguage} · `}
          {timeAgo(item.searchedAt)}
        </p>
      </div>

      {/* Score badge */}
      {sc && (
        <div style={{
          backgroundColor: sc.bg,
          border:          `1px solid ${sc.border}`,
          color:           sc.text,
          borderRadius:    '6px',
          padding:         '4px 10px',
          fontSize:        '0.8rem',
          fontWeight:      '700',
          flexShrink:      0,
          fontFamily:      font.mono,
        }}>
          {score}/100
        </div>
      )}

      {/* View btn */}
      <button
        onClick={(e) => { e.stopPropagation(); onView(item.githubUsername); }}
        style={{ ...btnSecondary, flexShrink: 0, padding: '5px 12px' }}
        className="hide-mobile"
      >
        View
      </button>

      {/* Delete btn */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
        style={{
          backgroundColor: 'transparent',
          border:          'none',
          color:           colors.textFaint,
          cursor:          'pointer',
          padding:         '4px 6px',
          borderRadius:    '6px',
          flexShrink:      0,
          fontSize:        '1rem',
          lineHeight:      1,
          transition:      'color 0.15s',
        }}
        onMouseEnter={(e) => e.target.style.color = colors.red}
        onMouseLeave={(e) => e.target.style.color = colors.textFaint}
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const DashboardPage = () => {
  const navigate  = useNavigate();
  const { user }  = useAuth();

  const [query,       setQuery]       = useState('');
  const [queryError,  setQueryError]  = useState('');
  const [history,     setHistory]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [histRes, repRes] = await Promise.all([
        getHistoryApi(1, 10),
        getReportsApi(),
      ]);
      setHistory(histRes.data.history  || []);
      setReportCount(repRes.data.count || 0);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
    finally { setLoading(false); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const v = query.trim();
    if (!v) { setQueryError('Please enter a GitHub username'); return; }
    if (!/^[a-zA-Z0-9-]+$/.test(v)) {
      setQueryError('Only letters, numbers and hyphens allowed');
      return;
    }
    setQueryError('');
    navigate(`/analyze/${v}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOneHistoryApi(id);
      setHistory(prev => prev.filter(h => h._id !== id));
    } catch (err) {
      console.error('Error deleting history item:', err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Clear all search history?')) return;
    try {
      await clearAllHistoryApi();
      setHistory([]);
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  };

  const lastName = history[0]?.githubUsername || '—';

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          .stats-grid  { grid-template-columns: 1fr 1fr !important; }
          .stats-grid > div:last-child { grid-column: 1 / -1; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', backgroundColor: colors.bg, fontFamily: font.family }}>
        <Navbar />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.25rem' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.4s ease' }}>
            <h1 style={{
              fontSize:    '1.75rem',
              fontWeight:  '700',
              color:       colors.textPrimary,
              marginBottom:'6px',
              letterSpacing: '-0.3px',
            }}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: '0.9rem', color: colors.textMuted }}>
              Analyze any GitHub developer profile and generate detailed reports
            </p>
          </div>

          {/* ── Search bar ── */}
          <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.4s ease 0.05s both' }}>
            <form onSubmit={handleSearch}>
              <div style={{
                display:   'flex',
                gap:       '10px',
                flexWrap:  'wrap',
              }}>
                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                  {/* Search icon */}
                  <svg
                    width="16" height="16"
                    viewBox="0 0 24 24" fill="none"
                    stroke={colors.textMuted} strokeWidth="2"
                    style={{
                      position: 'absolute',
                      left: '14px', top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setQueryError(''); }}
                    placeholder="Enter GitHub username  e.g. torvalds"
                    style={{
                      width:           '100%',
                      backgroundColor: colors.surface,
                      border:          `1px solid ${queryError ? colors.red : colors.border}`,
                      borderRadius:    '10px',
                      padding:         '12px 14px 12px 42px',
                      color:           colors.textPrimary,
                      fontSize:        '0.9rem',
                      outline:         'none',
                      fontFamily:      font.family,
                      boxSizing:       'border-box',
                      transition:      'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.blue}
                    onBlur={(e)  => e.target.style.borderColor = queryError ? colors.red : colors.border}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    ...btnPrimary,
                    borderRadius: '10px',
                    padding:      '12px 28px',
                    fontSize:     '0.9rem',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#388bfd'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.blueBg}
                >
                  Analyze
                </button>
              </div>
              {queryError && (
                <p style={{
                  fontSize: '0.8rem', color: colors.red,
                  marginTop: '6px', paddingLeft: '4px',
                }}>
                  {queryError}
                </p>
              )}
            </form>
          </div>

          {/* ── Stats row ── */}
          <div
            className="stats-grid"
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap:                 '1rem',
              marginBottom:        '2rem',
              animation:           'fadeIn 0.4s ease 0.1s both',
            }}
          >
            <StatCard
              label="Total searches"
              value={loading ? '—' : history.length}
              sub="in your history"
              accent={colors.blue}
            />
            <StatCard
              label="Saved reports"
              value={loading ? '—' : reportCount}
              sub="reports created"
              accent={colors.purple}
            />
            <StatCard
              label="Last searched"
              value={loading ? '—' : lastName}
              sub="most recent profile"
              accent={colors.green}
            />
          </div>

          {/* ── History section ── */}
          <div style={{ animation: 'fadeIn 0.4s ease 0.15s both' }}>
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              marginBottom:   '1rem',
            }}>
              <div>
                <h2 style={{
                  fontSize:   '1rem',
                  fontWeight: '600',
                  color:      colors.textPrimary,
                }}>
                  Recent searches
                </h2>
                {!loading && history.length > 0 && (
                  <p style={{ fontSize: '0.78rem', color: colors.textMuted, marginTop: '2px' }}>
                    {history.length} profile{history.length !== 1 ? 's' : ''} analyzed
                  </p>
                )}
              </div>
              {!loading && history.length > 0 && (
                <button
                  onClick={handleClearAll}
                  style={{
                    ...btnSecondary,
                    color:       colors.red,
                    borderColor: `${colors.red}40`,
                    fontSize:    '0.8rem',
                    padding:     '6px 12px',
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = colors.red}
                  onMouseLeave={(e) => e.target.style.borderColor = `${colors.red}40`}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Loading skeletons */}
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[1,2,3].map(i => <SkeletonRow key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {!loading && history.length === 0 && <EmptyHistory />}

            {/* History list */}
            {!loading && history.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {history.map(item => (
                  <HistoryItem
                    key={item._id}
                    item={item}
                    onView={(username) => navigate(`/analyze/${username}`)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Quick actions ── */}
          <div style={{
            display:       'flex',
            gap:           '12px',
            marginTop:     '2rem',
            flexWrap:      'wrap',
            animation:     'fadeIn 0.4s ease 0.2s both',
          }}>
            <button
              onClick={() => navigate('/compare')}
              style={{
                ...btnSecondary,
                display:     'flex',
                alignItems:  'center',
                gap:         '8px',
                padding:     '10px 18px',
                borderRadius:'10px',
                fontSize:    '0.875rem',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.blue}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6"  y1="20" x2="6"  y2="14"/>
              </svg>
              Compare developers
            </button>

            <button
              onClick={() => navigate('/reports')}
              style={{
                ...btnSecondary,
                display:     'flex',
                alignItems:  'center',
                gap:         '8px',
                padding:     '10px 18px',
                borderRadius:'10px',
                fontSize:    '0.875rem',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.purple}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              View saved reports
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default DashboardPage;