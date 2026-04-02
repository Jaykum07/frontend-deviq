import { useState } from 'react';
import { colors, font } from '../../theme';
import { timeAgo } from '../../utils/analyzeHelpers';

const RepoRow = ({ repo, index, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(repo)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '12px 16px',
        backgroundColor: hovered ? colors.surface2 : 'transparent',
        borderBottom: `1px solid ${colors.border}`,
        cursor: 'pointer',
        transition: 'background-color 0.15s',
        flexWrap: 'wrap',
      }}
    >
      {/* Index */}
      <span style={{
        fontSize: '0.72rem', color: colors.textFaint,
        fontFamily: font.mono, minWidth: '22px', flexShrink: 0,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Name + description */}
      <div style={{ flex: 1, minWidth: '120px' }}>
        <p style={{
          fontSize: '0.875rem', fontWeight: '600',
          color: colors.blue, marginBottom: '2px',
          fontFamily: font.mono,
        }}>
          {repo.name}
        </p>
        {repo.description && (
          <p style={{
            fontSize: '0.72rem', color: colors.textMuted,
            whiteSpace: 'nowrap', overflow: 'hidden',
            textOverflow: 'ellipsis', maxWidth: '280px',
          }}>
            {repo.description}
          </p>
        )}
      </div>

      {/* Language */}
      {repo.language && (
        <span style={{
          fontSize: '0.72rem', color: colors.textSecondary,
          backgroundColor: colors.surface2,
          border: `1px solid ${colors.border}`,
          borderRadius: '6px', padding: '2px 8px', flexShrink: 0,
        }}>
          {repo.language}
        </span>
      )}

      {/* Stars */}
      <span style={{
        fontSize: '0.78rem', color: colors.yellow,
        flexShrink: 0, fontFamily: font.mono,
      }}>
        ★ {repo.stars?.toLocaleString()}
      </span>

      {/* Forks */}
      <span style={{
        fontSize: '0.78rem', color: colors.textMuted,
        flexShrink: 0, fontFamily: font.mono,
      }}>
        ⑂ {repo.forks?.toLocaleString()}
      </span>

      {/* Last pushed */}
      <span style={{
        fontSize: '0.72rem', color: colors.textFaint, flexShrink: 0,
      }}>
        {timeAgo(repo.pushedAt)}
      </span>

      {/* Arrow indicator */}
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={hovered ? colors.blue : colors.textFaint}
        strokeWidth="2" style={{ flexShrink: 0, transition: 'stroke 0.15s' }}
      >
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  );
};

export default RepoRow;