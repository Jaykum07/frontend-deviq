// src/theme.js
// Single source of truth for all colors, spacing, typography
// Change values here → updates entire app

export const colors = {
    // Backgrounds
    bg:        '#0d1117',
    surface:   '#161b22',
    surface2:  '#21262d',
    border:    '#30363d',
    borderHover: '#484f58',
  
    // Text
    textPrimary:   '#e6edf3',
    textSecondary: '#8b949e',
    textMuted:     '#6e7681',
    textFaint:     '#484f58',
  
    // Accents
    blue:      '#58a6ff',
    blueBg:    '#1f6feb',
    blueDim:   '#1f6feb20',
    green:     '#3fb950',
    greenDim:  '#3fb95015',
    yellow:    '#d29922',
    yellowDim: '#d2992215',
    red:       '#f85149',
    redDim:    '#f8514915',
    purple:    '#bc8cff',
    purpleDim: '#bc8cff15',
  };
  
  export const font = {
    family: "'DM Sans', 'Segoe UI', sans-serif",
    mono:   "'JetBrains Mono', 'Fira Code', monospace",
  };
  
  // Reusable component styles
  export const card = {
    backgroundColor: colors.surface,
    border:          `1px solid ${colors.border}`,
    borderRadius:    '12px',
    padding:         '1.25rem 1.5rem',
  };
  
  export const inputBase = {
    backgroundColor: colors.bg,
    border:          `1px solid ${colors.border}`,
    borderRadius:    '8px',
    padding:         '10px 14px',
    color:           colors.textPrimary,
    fontSize:        '0.9rem',
    outline:         'none',
    width:           '100%',
    boxSizing:       'border-box',
    fontFamily:      font.family,
    transition:      'border-color 0.2s',
  };
  
  export const btnPrimary = {
    backgroundColor: colors.blueBg,
    color:           '#ffffff',
    border:          'none',
    borderRadius:    '8px',
    padding:         '10px 20px',
    fontSize:        '0.875rem',
    fontWeight:      '600',
    cursor:          'pointer',
    fontFamily:      font.family,
    transition:      'background-color 0.2s, transform 0.1s',
    whiteSpace:      'nowrap',
  };
  
  export const btnSecondary = {
    backgroundColor: 'transparent',
    color:           colors.textSecondary,
    border:          `1px solid ${colors.border}`,
    borderRadius:    '8px',
    padding:         '8px 16px',
    fontSize:        '0.82rem',
    fontWeight:      '500',
    cursor:          'pointer',
    fontFamily:      font.family,
    transition:      'all 0.2s',
  };