import { useState } from 'react';
import { colors, font, card, btnPrimary, btnSecondary } from '../../theme';
import { createReportApi } from '../../api/reportApi';

const SaveReportModal = ({ analysisId, username, onClose, onSaved }) => {
  const [title,  setTitle]  = useState(`${username} — Analysis Report`);
  const [notes,  setNotes]  = useState('');
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');

  const handleSave = async () => {
    if (!title.trim()) { setError('Title is required'); return; }
    setSaving(true);
    try {
      await createReportApi({
        title:      title.trim(),
        type:       'single',
        analysisId,
        notes:      notes.trim(),
      });
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save report');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '10px 14px',
    color: colors.textPrimary,
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: font.family,
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200, padding: '1rem',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        ...card,
        width: '100%', maxWidth: '460px',
        borderRadius: '16px', padding: '1.75rem',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}>
          <h3 style={{
            fontSize: '1rem', fontWeight: '600',
            color: colors.textPrimary,
          }}>
            Save Report
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: colors.textMuted, cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            ✕
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: colors.redDim,
            border: `1px solid ${colors.red}40`,
            color: colors.red, borderRadius: '8px',
            padding: '8px 12px', fontSize: '0.82rem',
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {/* Title */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block', fontSize: '0.82rem',
            color: colors.textMuted, marginBottom: '6px',
          }}>
            Report title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block', fontSize: '0.82rem',
            color: colors.textMuted, marginBottom: '6px',
          }}>
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your evaluation notes..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex', gap: '10px',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{ ...btnSecondary, padding: '8px 18px' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              ...btnPrimary, padding: '8px 20px',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveReportModal;