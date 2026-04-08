import { useNavigate } from 'react-router-dom';
import { colors, font, btnPrimary } from '../../theme';

const EmptyReports = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '4rem 1rem',
      textAlign:      'center',
    }}>
      {/* SVG illustration */}
      <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
        <rect x="20" y="10" width="100" height="90" rx="10"
          fill={colors.surface} stroke={colors.border} strokeWidth="1.5"/>
        <rect x="20" y="10" width="100" height="26" rx="10"
          fill={colors.surface2} stroke={colors.border} strokeWidth="1.5"/>
        <rect x="20" y="28" width="100" height="8"
          fill={colors.surface2}/>
        <rect x="35" y="17" width="40" height="6" rx="3"
          fill={colors.border}/>
        <rect x="35" y="50" width="70" height="5" rx="2.5"
          fill={colors.border} opacity="0.6"/>
        <rect x="35" y="62" width="50" height="5" rx="2.5"
          fill={colors.border} opacity="0.4"/>
        <rect x="35" y="74" width="60" height="5" rx="2.5"
          fill={colors.border} opacity="0.3"/>
        <circle cx="110" cy="90" r="22"
          fill={colors.surface} stroke={colors.border} strokeWidth="1.5"/>
        <line x1="110" y1="82" x2="110" y2="91"
          stroke={colors.textMuted} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="110" cy="96" r="1.5" fill={colors.textMuted}/>
      </svg>

      <h2 style={{
        fontSize:     '1.1rem',
        fontWeight:   '600',
        color:        colors.textPrimary,
        marginTop:    '1.5rem',
        marginBottom: '8px',
      }}>
        No reports yet
      </h2>
      <p style={{
        fontSize:     '0.875rem',
        color:        colors.textMuted,
        maxWidth:     '320px',
        lineHeight:   '1.6',
        marginBottom: '1.5rem',
      }}>
        Analyze a GitHub profile or compare developers to create your first report
      </p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ ...btnPrimary, padding: '10px 20px', fontSize: '0.875rem' }}
        >
          Search a developer
        </button>
        <button
          onClick={() => navigate('/compare')}
          style={{
            backgroundColor: 'transparent',
            border:          `1px solid ${colors.border}`,
            borderRadius:    '8px',
            padding:         '10px 20px',
            fontSize:        '0.875rem',
            color:           colors.textSecondary,
            cursor:          'pointer',
            fontFamily:      font.family,
          }}
        >
          Compare developers
        </button>
      </div>
    </div>
  );
};

export default EmptyReports;