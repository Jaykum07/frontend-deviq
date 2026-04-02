import { colors, card } from '../../theme';
import RepoRow from './RepoRow';

const ReposTab = ({ repos, onRepoClick }) => {
  return (
    <div style={{
      ...card, borderRadius: '14px',
      padding: 0, overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <h2 style={{
          fontSize: '0.9rem', fontWeight: '600',
          color: colors.textPrimary,
        }}>
          Repositories
        </h2>
        <span style={{ fontSize: '0.78rem', color: colors.textMuted }}>
          {repos.length} repos · click any row for details
        </span>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'flex', gap: '12px',
        padding: '8px 16px',
        backgroundColor: colors.surface2,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        {['Repository', 'Language', 'Stars', 'Forks', 'Updated'].map((h, i) => (
          <span
            key={h}
            className={i > 0 ? 'repo-hide' : ''}
            style={{
              flex:      i === 0 ? 1 : 'none',
              minWidth:  i > 0 ? '70px' : 'auto',
              fontSize:  '0.72rem',
              color:     colors.textFaint,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {repos.map((repo, i) => (
        <RepoRow
          key={repo.name}
          repo={repo}
          index={i}
          onClick={onRepoClick}
        />
      ))}

      {repos.length === 0 && (
        <div style={{
          padding: '2rem', textAlign: 'center',
          color: colors.textMuted, fontSize: '0.875rem',
        }}>
          No repositories found
        </div>
      )}
    </div>
  );
};

export default ReposTab;