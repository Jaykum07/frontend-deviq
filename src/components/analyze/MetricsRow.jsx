import { colors, font, card } from '../../theme';

const MetricCard = ({ label, value, accent }) => (
  <div style={{
    ...card,
    borderRadius: '10px',
    textAlign: 'center',
    borderTop: `2px solid ${accent}`,
    padding: '1rem',
  }}>
    <p style={{
      fontSize: '1.4rem', fontWeight: '700',
      color: colors.textPrimary,
      fontFamily: font.mono,
      marginBottom: '4px',
    }}>
      {value}
    </p>
    <p style={{
      fontSize: '0.72rem', color: colors.textMuted,
      textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>
      {label}
    </p>
  </div>
);

const MetricsRow = ({ metrics }) => {
  const items = [
    { label: 'Total Stars',    value: metrics?.totalStars?.toLocaleString()        || 0, accent: colors.yellow  },
    { label: 'Total Forks',    value: metrics?.totalForks?.toLocaleString()        || 0, accent: colors.blue    },
    { label: 'Active Repos',   value: metrics?.activeReposCount                    || 0, accent: colors.green   },
    { label: 'Days on GitHub', value: metrics?.accountAgeInDays?.toLocaleString()  || 0, accent: colors.purple  },
  ];

  return (
    <div
      className="metrics-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}
    >
      {items.map((item) => (
        <MetricCard key={item.label} {...item} />
      ))}
    </div>
  );
};

export default MetricsRow;