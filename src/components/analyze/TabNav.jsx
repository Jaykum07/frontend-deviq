import { colors, font } from '../../theme';

const TABS = ['overview', 'repos', 'analysis'];

const TabNav = ({ activeTab, onChange }) => {
  return (
    <div style={{
      display: 'flex', gap: '4px',
      marginBottom: '1.25rem',
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '10px',
      padding: '4px',
      width: 'fit-content',
    }}>
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            border: 'none',
            fontFamily: font.family,
            transition: 'all 0.15s',
            backgroundColor: activeTab === tab
              ? `${colors.blue}20`
              : 'transparent',
            color: activeTab === tab
              ? colors.blue
              : colors.textSecondary,
          }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabNav;