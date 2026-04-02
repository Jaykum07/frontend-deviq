import { colors, font, card } from '../../theme';
import { scoreGrade, scoreBarColor } from '../../utils/analyzeHelpers';

// Single score dimension bar
const ScoreBar = ({ label, value, max }) => {
  const color = scoreBarColor(value, max);
  const pct   = Math.round((value / max) * 100);
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontSize: '0.82rem', color: colors.textSecondary }}>
          {label}
        </span>
        <span style={{ fontSize: '0.82rem', fontWeight: '700', color, fontFamily: font.mono }}>
          {value}/{max}
        </span>
      </div>
      <div style={{
        height: '6px', backgroundColor: colors.surface2,
        borderRadius: '999px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          backgroundColor: color, borderRadius: '999px',
          transition: 'width 1s ease',
        }} />
      </div>
    </div>
  );
};

const ScoreCard = ({ scores }) => {
  const grade = scoreGrade(scores?.totalScore || 0);

  return (
    <div style={{ ...card, borderRadius: '14px' }}>
      {/* Header row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
      }}>
        <h2 style={{
          fontSize: '0.9rem', fontWeight: '600',
          color: colors.textPrimary,
        }}>
          Score Breakdown
        </h2>
        <div style={{ textAlign: 'right' }}>
          <div>
            <span style={{
              fontSize: '2.25rem', fontWeight: '700',
              color: grade.color, fontFamily: font.mono, lineHeight: 1,
            }}>
              {scores?.totalScore}
            </span>
            <span style={{
              fontSize: '0.9rem', color: colors.textMuted,
              fontFamily: font.mono,
            }}>
              /100
            </span>
          </div>
          <div style={{
            fontSize: '0.75rem', fontWeight: '600',
            color: grade.color, textAlign: 'right',
          }}>
            {grade.label}
          </div>
        </div>
      </div>

      {/* Score bars */}
      <ScoreBar label="Activity"   value={scores?.activityScore}   max={20} />
      <ScoreBar label="Popularity" value={scores?.popularityScore} max={25} />
      <ScoreBar label="Quality"    value={scores?.qualityScore}    max={20} />
      <ScoreBar label="Diversity"  value={scores?.diversityScore}  max={15} />
      <ScoreBar label="Community"  value={scores?.communityScore}  max={20} />
    </div>
  );
};

export default ScoreCard;