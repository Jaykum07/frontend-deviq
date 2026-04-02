import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { colors, card } from '../../theme';
import { LANG_COLORS } from '../../utils/analyzeHelpers';

const LangChart = ({ title, data }) => {
  return (
    <div style={{ ...card, borderRadius: '14px' }}>
      <h2 style={{
        fontSize: '0.9rem', fontWeight: '600',
        color: colors.textPrimary, marginBottom: '1rem',
      }}>
        {title}
      </h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="45%"
              innerRadius={50} outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={LANG_COLORS[i % LANG_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: colors.surface2,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                color: colors.textPrimary,
                fontSize: '0.82rem',
              }}
              formatter={(v, n) => [`${v} repos`, n]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(v) => (
                <span style={{ color: colors.textSecondary, fontSize: '0.75rem' }}>
                  {v}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div style={{
          height: '200px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: colors.textMuted, fontSize: '0.85rem',
        }}>
          No data available
        </div>
      )}
    </div>
  );
};

export default LangChart;