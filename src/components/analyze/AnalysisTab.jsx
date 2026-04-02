import { colors, font, card } from '../../theme';
import ActivityChart from './ActivityChart';
import LangChart     from './LangChart';
import { LANG_COLORS } from '../../utils/analyzeHelpers';

const AnalysisTab = ({metrics, langData, topRepoData, activityData }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Activity line chart */}
      <ActivityChart data={activityData} />

      {/* Two donuts */}
      <div
        className="analysis-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        <LangChart title="Language Per Repos"  data={langData}    />
        <LangChart title="Top Repos by Stars"  data={topRepoData} />
      </div>

      {/* Most starred highlight */}
      {metrics?.mostStarredRepo && (
        <div style={{
          ...card, borderRadius: '14px',
          display: 'flex', alignItems: 'center', gap: '16px',
          flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: '2rem' }}>⭐</div>
          <div>
            <p style={{
              fontSize: '0.75rem', color: colors.textMuted,
              marginBottom: '4px', textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Most starred repository
            </p>
            <p style={{
              fontSize: '1rem', fontWeight: '700',
              color: colors.blue, fontFamily: font.mono,
            }}>
              {metrics.mostStarredRepo}
            </p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <p style={{
              fontSize: '0.75rem', color: colors.textMuted,
              marginBottom: '4px', textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Primary language
            </p>
            <p style={{
              fontSize: '1rem', fontWeight: '700',
              color: colors.textPrimary, fontFamily: font.mono,
            }}>
              {metrics.primaryLanguage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisTab;