import {
    LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
  } from 'recharts';
  import { colors, card } from '../../theme';
  
  const ActivityChart = ({ data }) => {
    return (
      <div style={{ ...card, borderRadius: '14px' }}>
        <h2 style={{
          fontSize: '0.9rem', fontWeight: '600',
          color: colors.textPrimary, marginBottom: '1.25rem',
        }}>
          Repository Activity (by Quarter)
        </h2>
  
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.border}
                vertical={false}
              />
              <XAxis
                dataKey="quarter"
                tick={{ fill: colors.textMuted, fontSize: 11 }}
                axisLine={false} tickLine={false}
              />
              <YAxis
                tick={{ fill: colors.textMuted, fontSize: 11 }}
                axisLine={false} tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.surface2,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  color: colors.textPrimary,
                  fontSize: '0.82rem',
                }}
                formatter={(v) => [`${v} repos pushed`, 'Activity']}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke={colors.blue}
                strokeWidth={2}
                dot={{ fill: colors.blue, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{
            height: '160px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: colors.textMuted, fontSize: '0.85rem',
          }}>
            No activity data available
          </div>
        )}
      </div>
    );
  };
  
  export default ActivityChart;