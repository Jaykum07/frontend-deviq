import { colors, font } from '../../theme';

const WinnerBanner = ({ winner }) => {
  if (!winner) return null;

  return (
    <div style={{
      background:    `linear-gradient(135deg, ${colors.surface} 0%, #1c2333 100%)`,
      border:        `1px solid ${colors.green}40`,
      borderRadius:  '14px',
      padding:       '1.5rem',
      marginBottom:  '1.5rem',
      display:       'flex',
      alignItems:    'center',
      gap:           '1rem',
      flexWrap:      'wrap',
    }}>
      {/* Trophy */}
      <div style={{
        width:           '52px',
        height:          '52px',
        borderRadius:    '50%',
        backgroundColor: `${colors.yellow}20`,
        border:          `2px solid ${colors.yellow}40`,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        fontSize:        '1.5rem',
        flexShrink:      0,
      }}>
        🏆
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize:      '0.75rem',
          color:         colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom:  '4px',
        }}>
          Top developer
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <img
            src={winner.avatarUrl}
            alt={winner.githubUsername}
            style={{
              width:        '28px',
              height:       '28px',
              borderRadius: '50%',
              border:       `2px solid ${colors.green}`,
            }}
          />
          <span style={{
            fontSize:   '1.2rem',
            fontWeight: '700',
            color:      colors.textPrimary,
            fontFamily: font.mono,
          }}>
            {winner.githubUsername}
          </span>
          {winner.name && (
            <span style={{ fontSize: '0.85rem', color: colors.textMuted }}>
              {winner.name}
            </span>
          )}
        </div>
      </div>

      {/* Score */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <p style={{
          fontSize:   '2.5rem',
          fontWeight: '700',
          color:      colors.green,
          fontFamily: font.mono,
          lineHeight: 1,
        }}>
          {winner.scores?.totalScore}
        </p>
        <p style={{ fontSize: '0.75rem', color: colors.textMuted }}>
          out of 100
        </p>
      </div>
    </div>
  );
};

export default WinnerBanner;