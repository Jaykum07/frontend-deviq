import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, font } from '../../theme';
import { scoreColor, DIMENSION_LABELS, COMPARE_COLORS } from '../../utils/compareHelpers';

const DimensionBar = ({ label, value, max, color }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '0.75rem', color: colors.textMuted }}>{label}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color, fontFamily: font.mono }}>
          {value}/{max}
        </span>
      </div>
      <div style={{ height: '5px', backgroundColor: colors.surface2, borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: color, borderRadius: '999px', transition: 'width 0.8s ease' }} />
      </div>
    </div>
  );
};

const CompareCard = ({ result, rank, colorIndex, isWinner }) => {
  const navigate  = useNavigate();
  const [hovered, setHovered] = useState(false);
  const sc        = scoreColor(result.scores?.totalScore || 0);
  const cardColor = COMPARE_COLORS[colorIndex];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: colors.surface,
        border:          `1px solid ${isWinner ? colors.green : hovered ? colors.border : colors.border}`,
        borderTop:       `3px solid ${cardColor}`,
        borderRadius:    '14px',
        padding:         '1.25rem',
        transition:      'all 0.2s',
        transform:       hovered ? 'translateY(-2px)' : 'none',
        boxShadow:       hovered ? `0 8px 24px ${cardColor}15` : 'none',
        position:        'relative',
      }}
    >
      {/* Winner badge */}
      {isWinner && (
        <div style={{
          position:        'absolute',
          top:             '-1px',
          right:           '16px',
          backgroundColor: colors.yellow,
          color:           '#000',
          fontSize:        '0.68rem',
          fontWeight:      '700',
          padding:         '2px 10px',
          borderRadius:    '0 0 6px 6px',
          letterSpacing:   '0.05em',
        }}>
          WINNER
        </div>
      )}

      {/* Rank */}
      <div style={{
        display:         'flex',
        alignItems:      'center',
        gap:             '10px',
        marginBottom:    '1rem',
      }}>
        <div style={{
          width:           '28px',
          height:          '28px',
          borderRadius:    '50%',
          backgroundColor: `${cardColor}20`,
          border:          `1px solid ${cardColor}40`,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          fontSize:        '0.8rem',
          fontWeight:      '700',
          color:           cardColor,
          fontFamily:      font.mono,
          flexShrink:      0,
        }}>
          #{rank}
        </div>

        {/* Avatar */}
        {result.avatarUrl ? (
          <img
            src={result.avatarUrl}
            alt={result.githubUsername}
            style={{
              width:        '36px',
              height:       '36px',
              borderRadius: '50%',
              objectFit:    'cover',
              border:       `2px solid ${cardColor}40`,
              flexShrink:   0,
            }}
          />
        ) : (
          <div style={{
            width:           '36px',
            height:          '36px',
            borderRadius:    '50%',
            backgroundColor: `${cardColor}20`,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '1rem',
            fontWeight:      '700',
            color:           cardColor,
            flexShrink:      0,
          }}>
            {result.githubUsername?.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Name */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize:     '0.9rem',
            fontWeight:   '700',
            color:        colors.textPrimary,
            fontFamily:   font.mono,
            marginBottom: '2px',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {result.githubUsername}
          </p>
          {result.name && (
            <p style={{ fontSize: '0.72rem', color: colors.textMuted }}>
              {result.name}
            </p>
          )}
        </div>
      </div>

      {/* Total score */}
      <div style={{
        backgroundColor: sc.bg,
        border:          `1px solid ${sc.border}`,
        borderRadius:    '10px',
        padding:         '12px',
        textAlign:       'center',
        marginBottom:    '1rem',
      }}>
        <p style={{
          fontSize:   '2.2rem',
          fontWeight: '700',
          color:      sc.text,
          fontFamily: font.mono,
          lineHeight: 1,
        }}>
          {result.scores?.totalScore}
        </p>
        <p style={{ fontSize: '0.72rem', color: colors.textMuted, marginTop: '2px' }}>
          total score
        </p>
      </div>

      {/* Dimension bars */}
      {DIMENSION_LABELS.map((dim) => (
        <DimensionBar
          key={dim.key}
          label={dim.label}
          value={result.scores?.[dim.key] || 0}
          max={dim.max}
          color={cardColor}
        />
      ))}

      {/* Quick stats */}
      <div style={{
        display:       'flex',
        justifyContent:'space-between',
        borderTop:     `1px solid ${colors.border}`,
        paddingTop:    '0.75rem',
        marginTop:     '0.75rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: colors.yellow, fontFamily: font.mono }}>
            ★ {result.totalStars?.toLocaleString() || 0}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>stars</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: colors.blue, fontFamily: font.mono }}>
            {result.publicRepos || 0}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>repos</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: colors.purple, fontFamily: font.mono }}>
            {result.followers?.toLocaleString() || 0}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>followers</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize:   '0.78rem',
            fontWeight: '600',
            color:      colors.textSecondary,
            fontFamily: font.mono,
          }}>
            {result.primaryLanguage || '—'}
          </p>
          <p style={{ fontSize: '0.68rem', color: colors.textMuted }}>language</p>
        </div>
      </div>

      {/* View profile button */}
      <button
        onClick={() => navigate(`/analyze/${result.githubUsername}`)}
        style={{
          width:           '100%',
          backgroundColor: 'transparent',
          border:          `1px solid ${colors.border}`,
          borderRadius:    '8px',
          padding:         '8px',
          color:           colors.textSecondary,
          fontSize:        '0.8rem',
          fontWeight:      '500',
          cursor:          'pointer',
          fontFamily:      font.family,
          marginTop:       '0.75rem',
          transition:      'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = cardColor;
          e.currentTarget.style.color       = cardColor;
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

export default CompareCard;