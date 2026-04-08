import { useState } from 'react';
import { colors } from '../../theme';

const ReportCard = ({ report, onView, onDelete }) => {
  const [hovered,  setHovered]  = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isComparison = report.type === 'comparison';

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this report?')) return;
    setDeleting(true);
    await onDelete(report._id);
    setDeleting(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day:   '2-digit',
      month: 'short',
      year:  'numeric',
    });
  };

  return (
    <div
      onClick={() => onView(report)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: colors.surface,
        border:          `1px solid ${hovered ? colors.blue : colors.border}`,
        borderLeft:      `4px solid ${isComparison ? colors.purple : colors.blue}`,
        borderRadius:    '12px',
        padding:         '1.25rem',
        cursor:          'pointer',
        transition:      'all 0.15s',
        transform:       hovered ? 'translateY(-1px)' : 'none',
        boxShadow:       hovered ? `0 4px 20px rgba(0,0,0,0.2)` : 'none',
      }}
    >
      {/* Top row */}
      <div style={{
        display:        'flex',
        alignItems:     'flex-start',
        justifyContent: 'space-between',
        marginBottom:   '10px',
        gap:            '12px',
      }}>
        {/* Title + badge */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '8px',
            marginBottom: '4px',
            flexWrap:     'wrap',
          }}>
            {/* Type badge */}
            <span style={{
              backgroundColor: isComparison ? `${colors.purple}20` : `${colors.blue}20`,
              border:          `1px solid ${isComparison ? `${colors.purple}40` : `${colors.blue}40`}`,
              color:           isComparison ? colors.purple : colors.blue,
              borderRadius:    '20px',
              padding:         '2px 10px',
              fontSize:        '0.7rem',
              fontWeight:      '600',
              textTransform:   'uppercase',
              letterSpacing:   '0.05em',
              flexShrink:      0,
            }}>
              {isComparison ? 'Comparison' : 'Single'}
            </span>
          </div>

          <h3 style={{
            fontSize:     '0.95rem',
            fontWeight:   '600',
            color:        colors.textPrimary,
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {report.title}
          </h3>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            backgroundColor: 'transparent',
            border:          'none',
            color:           colors.textFaint,
            cursor:          deleting ? 'not-allowed' : 'pointer',
            padding:         '4px 6px',
            borderRadius:    '6px',
            fontSize:        '1rem',
            lineHeight:      1,
            flexShrink:      0,
            transition:      'color 0.15s',
          }}
          onMouseEnter={(e) => e.target.style.color = colors.red}
          onMouseLeave={(e) => e.target.style.color = colors.textFaint}
          title="Delete report"
        >
          {deleting ? '...' : '🗑'}
        </button>
      </div>

      {/* Notes preview */}
      {report.notes && (
        <p style={{
          fontSize:     '0.78rem',
          color:        colors.textMuted,
          marginBottom: '10px',
          overflow:     'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:   'nowrap',
        }}>
          {report.notes}
        </p>
      )}

      {/* Bottom row */}
      <div style={{
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'space-between',
        flexWrap:    'wrap',
        gap:         '8px',
      }}>
        {/* Date */}
        <span style={{ fontSize: '0.75rem', color: colors.textMuted }}>
          📅 {formatDate(report.createdAt)}
        </span>

        {/* View label */}
        <span style={{
          fontSize:  '0.75rem',
          color:     hovered ? colors.blue : colors.textMuted,
          fontWeight:'500',
          transition:'color 0.15s',
        }}>
          View details →
        </span>
      </div>
    </div>
  );
};

export default ReportCard;