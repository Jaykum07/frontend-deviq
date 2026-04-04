import { useState } from 'react';
import { colors, font } from '../../theme';

const UsernameInput = ({ usernames, onChange }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const val = input.trim().toLowerCase();

    if (!val) {
      setError('Enter a username');
      return;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(val)) {
      setError('Only letters, numbers and hyphens');
      return;
    }
    if (usernames.includes(val)) {
      setError('Already added');
      return;
    }
    if (usernames.length >= 4) {
      setError('Maximum 4 usernames');
      return;
    }

    onChange([...usernames, val]);
    setInput('');
    setError('');
  };

  const handleRemove = (name) => {
    onChange(usernames.filter((u) => u !== name));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div style={{
      backgroundColor: colors.surface,
      border:          `1px solid ${colors.border}`,
      borderRadius:    '14px',
      padding:         '1.5rem',
      marginBottom:    '1.5rem',
    }}>
      <h2 style={{
        fontSize:     '0.9rem',
        fontWeight:   '600',
        color:        colors.textPrimary,
        marginBottom: '4px',
      }}>
        Add GitHub usernames to compare
      </h2>
      <p style={{
        fontSize:     '0.8rem',
        color:        colors.textMuted,
        marginBottom: '1.25rem',
      }}>
        Minimum 2, maximum 4 developers
      </p>

      {/* Input row */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '180px', position: 'relative' }}>
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke={colors.textMuted} strokeWidth="2"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. torvalds"
            style={{
              width:           '100%',
              backgroundColor: colors.bg,
              border:          `1px solid ${error ? colors.red : colors.border}`,
              borderRadius:    '8px',
              padding:         '10px 14px 10px 38px',
              color:           colors.textPrimary,
              fontSize:        '0.875rem',
              outline:         'none',
              fontFamily:      font.family,
              boxSizing:       'border-box',
              transition:      'border-color 0.2s',
            }}
            onFocus={(e)  => e.target.style.borderColor = colors.blue}
            onBlur={(e)   => e.target.style.borderColor = error ? colors.red : colors.border}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={usernames.length >= 4}
          style={{
            backgroundColor: usernames.length >= 4 ? colors.surface2 : colors.blueBg,
            color:           usernames.length >= 4 ? colors.textMuted  : '#fff',
            border:          'none',
            borderRadius:    '8px',
            padding:         '10px 20px',
            fontSize:        '0.875rem',
            fontWeight:      '600',
            cursor:          usernames.length >= 4 ? 'not-allowed' : 'pointer',
            fontFamily:      font.family,
            flexShrink:      0,
            transition:      'background-color 0.2s',
          }}
        >
          Add
        </button>
      </div>

      {/* Error */}
      {error && (
        <p style={{ fontSize: '0.8rem', color: colors.red, marginBottom: '0.75rem' }}>
          {error}
        </p>
      )}

      {/* Added usernames chips */}
      {usernames.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {usernames.map((name, i) => (
            <div
              key={name}
              style={{
                display:         'flex',
                alignItems:      'center',
                gap:             '8px',
                backgroundColor: `${CHIP_COLORS[i]}15`,
                border:          `1px solid ${CHIP_COLORS[i]}40`,
                borderRadius:    '20px',
                padding:         '5px 12px',
              }}
            >
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                backgroundColor: CHIP_COLORS[i],
                flexShrink: 0,
              }} />
              <span style={{
                fontSize:   '0.82rem',
                fontWeight: '600',
                color:      colors.textPrimary,
                fontFamily: font.mono,
              }}>
                {name}
              </span>
              <button
                onClick={() => handleRemove(name)}
                style={{
                  background:  'none',
                  border:      'none',
                  color:       colors.textMuted,
                  cursor:      'pointer',
                  fontSize:    '0.9rem',
                  lineHeight:  1,
                  padding:     '0 2px',
                  transition:  'color 0.15s',
                }}
                onMouseEnter={(e) => e.target.style.color = colors.red}
                onMouseLeave={(e) => e.target.style.color = colors.textMuted}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Count indicator */}
      <p style={{
        fontSize:   '0.75rem',
        color:      usernames.length >= 2 ? colors.green : colors.textMuted,
        marginTop:  '0.75rem',
      }}>
        {usernames.length === 0 && 'Add at least 2 usernames to compare'}
        {usernames.length === 1 && 'Add 1 more to start comparing'}
        {usernames.length >= 2 && `${usernames.length} developers ready to compare`}
      </p>
    </div>
  );
};

// Chip colors
const CHIP_COLORS = ['#58a6ff', '#3fb950', '#d29922', '#f85149'];

export default UsernameInput;