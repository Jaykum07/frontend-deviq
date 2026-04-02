import { colors, font, card, btnPrimary } from '../../theme';
import { LANG_COLORS } from '../../utils/analyzeHelpers';

const RepoDetailModal = ({ repo, onClose }) => {
  if (!repo) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200, padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          ...card,
          width: '100%', maxWidth: '600px',
          borderRadius: '16px', padding: '1.75rem',
          maxHeight: '85vh', overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: '1rem',
        }}>
          <div style={{ flex: 1, marginRight: '1rem' }}>
            <h2 style={{
              fontSize: '1.2rem', fontWeight: '700',
              color: colors.blue, marginBottom: '4px',
              fontFamily: font.mono,
            }}>
              {repo.name}
            </h2>
            {repo.description && (
              <p style={{
                fontSize: '0.85rem',
                color: colors.textSecondary,
                lineHeight: '1.5',
              }}>
                {repo.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: colors.textMuted, cursor: 'pointer',
              fontSize: '1.2rem', flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Topics + Language tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '8px', marginBottom: '1.25rem',
        }}>
          {repo.language && (
            <span style={{
              backgroundColor: `${colors.blue}20`,
              border: `1px solid ${colors.blue}40`,
              color: colors.blue,
              borderRadius: '20px', padding: '3px 12px',
              fontSize: '0.78rem', fontWeight: '500',
            }}>
              {repo.language}
            </span>
          )}
          {repo.topics?.slice(0, 6).map((topic) => (
            <span key={topic} style={{
              backgroundColor: colors.surface2,
              border: `1px solid ${colors.border}`,
              color: colors.textSecondary,
              borderRadius: '20px', padding: '3px 12px',
              fontSize: '0.75rem',
            }}>
              {topic}
            </span>
          ))}
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px', marginBottom: '1.25rem',
        }}>
          {[
            { label: 'Stars',    value: repo.stars,      accent: colors.yellow },
            { label: 'Forks',    value: repo.forks,      accent: colors.blue   },
            { label: 'Watchers', value: repo.watchers,   accent: colors.purple },
            { label: 'Issues',   value: repo.openIssues, accent: colors.red    },
          ].map((m) => (
            <div key={m.label} style={{
              backgroundColor: colors.surface2,
              border: `1px solid ${colors.border}`,
              borderTop: `2px solid ${m.accent}`,
              borderRadius: '8px', padding: '0.75rem',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '1.2rem', fontWeight: '700',
                color: colors.textPrimary,
                fontFamily: font.mono,
              }}>
                {m.value?.toLocaleString()}
              </p>
              <p style={{
                fontSize: '0.7rem', color: colors.textMuted,
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Detail rows */}
        <div style={{
          backgroundColor: colors.surface2,
          border: `1px solid ${colors.border}`,
          borderRadius: '10px', overflow: 'hidden',
          marginBottom: '1.25rem',
        }}>
          {[
            { label: 'Primary language', value: repo.language || 'Not specified'                               },
            { label: 'Repository size',  value: `${(repo.size / 1024).toFixed(1)} MB`                         },
            { label: 'Forked repo',      value: repo.isForked ? 'Yes' : 'No'                                  },
            { label: 'Last pushed',      value: repo.pushedAt  ? new Date(repo.pushedAt).toLocaleDateString()  : 'Unknown' },
            { label: 'Created',          value: repo.createdAt ? new Date(repo.createdAt).toLocaleDateString() : 'Unknown' },
          ].map((row, i) => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '10px 14px',
              borderBottom: i < 4 ? `1px solid ${colors.border}` : 'none',
            }}>
              <span style={{ fontSize: '0.82rem', color: colors.textMuted }}>
                {row.label}
              </span>
              <span style={{
                fontSize: '0.82rem', color: colors.textPrimary,
                fontFamily: font.mono, fontWeight: '500',
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* View on GitHub */}
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          style={{
            ...btnPrimary,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
            textDecoration: 'none', width: '100%',
            borderRadius: '8px', boxSizing: 'border-box',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepoDetailModal;