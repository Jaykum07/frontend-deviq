import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer,
  } from 'recharts';
  import { colors, font, card } from '../../theme';
  import { COMPARE_COLORS } from '../../utils/compareHelpers';
  
  const CompareChart = ({ results }) => {
    // Build chart data — one row per dimension
    const dimensions = [
      { label: 'Activity',   key: 'activityScore'   },
      { label: 'Popularity', key: 'popularityScore' },
      { label: 'Quality',    key: 'qualityScore'    },
      { label: 'Diversity',  key: 'diversityScore'  },
      { label: 'Community',  key: 'communityScore'  },
    ];
  
    const chartData = dimensions.map((dim) => {
      const row = { dimension: dim.label };
      results.forEach((r) => {
        row[r.githubUsername] = r.scores?.[dim.key] || 0;
      });
      return row;
    });
  
    return (
      <div style={{ ...card, borderRadius: '14px', marginBottom: '1.5rem' }}>
        <h2 style={{
          fontSize:     '0.9rem',
          fontWeight:   '600',
          color:        colors.textPrimary,
          marginBottom: '1.25rem',
        }}>
          Score comparison by dimension
        </h2>
  
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            barCategoryGap="25%"
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.border}
              vertical={false}
            />
            <XAxis
              dataKey="dimension"
              tick={{ fill: colors.textMuted, fontSize: 11, fontFamily: font.family }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: colors.textMuted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.surface2,
                border:          `1px solid ${colors.border}`,
                borderRadius:    '8px',
                color:           colors.textPrimary,
                fontSize:        '0.82rem',
              }}
            />
            <Legend
              formatter={(v) => (
                <span style={{ color: colors.textSecondary, fontSize: '0.78rem', fontFamily: font.mono }}>
                  {v}
                </span>
              )}
            />
            {results.map((r, i) => (
              <Bar
                key={r.githubUsername}
                dataKey={r.githubUsername}
                fill={COMPARE_COLORS[i % COMPARE_COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default CompareChart;