import ScoreCard  from './ScoreCard';
import LangChart  from './LangChart';
import MetricsRow from './MetricsRow';

const OverviewTab = ({ scores, metrics, langData }) => {
  return (
    <>
      {/* Score + Language side by side */}
      <div
        className="score-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <ScoreCard scores={scores} />
        <LangChart title="Language Per Repos" data={langData} />
      </div>

      {/* 4 metric cards */}
      <MetricsRow metrics={metrics} />
    </>
  );
};

export default OverviewTab;