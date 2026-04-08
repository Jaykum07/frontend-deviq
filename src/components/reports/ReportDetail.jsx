import { colors, font, card } from '../../theme';
import { useNavigate } from 'react-router-dom';

const ScoreRow = ({ label, value, max, color }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '0.78rem', color: colors.textMuted }}>{label}</span>
        <span style={{ fontSize: '0.78rem', fontWeight: '700', color, fontFamily: font.mono }}>
          {value}/{max}
        </span>
      </div>
      <div style={{ height: '5px', backgroundColor: colors.surface2, borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: color, borderRadius: '999px' }} />
      </div>
    </div>
  );
};

const DeveloperSnapshot = ({ username, data, color }) => {
  const navigate = useNavigate();
  const score    = data?.totalScore || 0;
  const scoreCol = score >= 70 ? colors.green : score >= 40 ? colors.yellow : colors.red;

  return (
    <div style={{
      ...card,
      borderRadius: '12px',
      borderTop:    `3px solid ${color}`,
    }}>
      {/* Header */}
      <div style={{
        display:      'flex',
        alignItems:   'center',
        gap:          '12px',
        marginBottom: '1rem',
      }}>
        {data?.avatarUrl ? (
          <img src={data.avatarUrl} alt={username}
            style={{ width: '40px', height: '40px', borderRadius: '50%', border: `2px solid ${color}40` }} />
        ) : (
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: `${color}20`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: '700', color,
          }}>
            {username?.charAt(0).toUpperCase()}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.9rem', fontWeight: '700', color: colors.textPrimary, fontFamily: font.mono }}>
            {username}
          </p>
          {data?.name && (
            <p style={{ fontSize: '0.75rem', color: colors.textMuted }}>{data.name}</p>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '1.6rem', fontWeight: '700', color: scoreCol, fontFamily: font.mono, lineHeight: 1 }}>
            {score}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>/ 100</p>
        </div>
      </div>

      {/* Score bars */}
      <ScoreRow label="Activity"   value={data?.activityScore   || 0} max={20} color={color} />
      <ScoreRow label="Popularity" value={data?.popularityScore || 0} max={25} color={color} />
      <ScoreRow label="Quality"    value={data?.qualityScore    || 0} max={20} color={color} />
      <ScoreRow label="Diversity"  value={data?.diversityScore  || 0} max={15} color={color} />
      <ScoreRow label="Community"  value={data?.communityScore  || 0} max={20} color={color} />

      {/* Quick stats */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-around',
        borderTop:      `1px solid ${colors.border}`,
        paddingTop:     '0.75rem',
        marginTop:      '0.75rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: colors.yellow, fontFamily: font.mono }}>
            ★ {data?.totalStars?.toLocaleString() || 0}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>stars</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: colors.blue, fontFamily: font.mono }}>
            {data?.primaryLanguage || '—'}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>language</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: colors.purple, fontFamily: font.mono }}>
            {data?.followers?.toLocaleString() || 0}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>followers</p>
        </div>
      </div>

      {/* View profile */}
      <button
        onClick={() => navigate(`/analyze/${username}`)}
        style={{
          width:           '100%',
          backgroundColor: 'transparent',
          border:          `1px solid ${colors.border}`,
          borderRadius:    '8px',
          padding:         '7px',
          color:           colors.textSecondary,
          fontSize:        '0.78rem',
          cursor:          'pointer',
          fontFamily:      font.family,
          marginTop:       '0.75rem',
          transition:      'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.color       = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.color       = colors.textSecondary;
        }}
      >
        View full profile →
      </button>
    </div>
  );
};

const SNAPSHOT_COLORS = ['#58a6ff', '#3fb950', '#d29922', '#f85149'];

const ReportDetail = ({ report, onClose }) => {
  if (!report) return null;

  const isComparison = report.type === 'comparison';
  const snapshot     = report.snapshot || {};
  const snapEntries  = Object.entries(snapshot);

  // Find winner for comparison
  const winner = isComparison
    ? snapEntries.sort((a, b) => (b[1].totalScore || 0) - (a[1].totalScore || 0))[0]?.[0]
    : null;

  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display:         'flex',
        alignItems:      'flex-start',
        justifyContent:  'center',
        zIndex:          200,
        padding:         '1rem',
        paddingTop:      '4rem',
        overflowY:       'auto',
        animation:       'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width:           '100%',
          maxWidth:        isComparison ? '900px' : '520px',
          backgroundColor: colors.bg,
          border:          `1px solid ${colors.border}`,
          borderRadius:    '16px',
          padding:         '1.75rem',
          marginBottom:    '2rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          marginBottom:   '1.25rem',
        }}>
          <div style={{ flex: 1, marginRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: isComparison ? `${colors.purple}20` : `${colors.blue}20`,
                border:          `1px solid ${isComparison ? `${colors.purple}40` : `${colors.blue}40`}`,
                color:           isComparison ? colors.purple : colors.blue,
                borderRadius:    '20px',
                padding:         '2px 10px',
                fontSize:        '0.7rem',
                fontWeight:      '600',
                textTransform:   'uppercase',
                letterSpacing:   '0.05em',
              }}>
                {isComparison ? 'Comparison Report' : 'Single Report'}
              </span>
              {winner && (
                <span style={{
                  backgroundColor: `${colors.yellow}20`,
                  border:          `1px solid ${colors.yellow}40`,
                  color:           colors.yellow,
                  borderRadius:    '20px',
                  padding:         '2px 10px',
                  fontSize:        '0.7rem',
                  fontWeight:      '600',
                }}>
                  🏆 Winner: {winner}
                </span>
              )}
            </div>
            <h2 style={{
              fontSize:   '1.1rem',
              fontWeight: '700',
              color:      colors.textPrimary,
            }}>
              {report.title}
            </h2>
            <p style={{ fontSize: '0.75rem', color: colors.textMuted, marginTop: '4px' }}>
              Saved on {new Date(report.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: colors.textMuted, cursor: 'pointer',
              fontSize: '1.3rem', flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Notes */}
        {report.notes && (
          <div style={{
            backgroundColor: colors.surface,
            border:          `1px solid ${colors.border}`,
            borderRadius:    '8px',
            padding:         '10px 14px',
            marginBottom:    '1.25rem',
          }}>
            <p style={{ fontSize: '0.75rem', color: colors.textMuted, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Notes
            </p>
            <p style={{ fontSize: '0.85rem', color: colors.textSecondary, lineHeight: '1.5' }}>
              {report.notes}
            </p>
          </div>
        )}

        {/* Snapshot data */}
        {snapEntries.length > 0 ? (
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: isComparison
                ? `repeat(${Math.min(snapEntries.length, 2)}, 1fr)`
                : '1fr',
              gap: '1rem',
            }}
          >
            {snapEntries
              .sort((a, b) => (b[1].totalScore || 0) - (a[1].totalScore || 0))
              .map(([username, data], i) => (
                <DeveloperSnapshot
                  key={username}
                  username={username}
                  data={data}
                  color={SNAPSHOT_COLORS[i % SNAPSHOT_COLORS.length]}
                />
              ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '2rem',
            color: colors.textMuted, fontSize: '0.875rem',
          }}>
            No snapshot data available
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            width:           '100%',
            backgroundColor: 'transparent',
            border:          `1px solid ${colors.border}`,
            borderRadius:    '8px',
            padding:         '10px',
            color:           colors.textSecondary,
            fontSize:        '0.875rem',
            cursor:          'pointer',
            fontFamily:      font.family,
            marginTop:       '1.25rem',
            transition:      'all 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.blue}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportDetail;