import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PublicNavbar from '../components/PublicNavbar';
import { colors, font, card, btnPrimary } from '../theme';
import useAuth from '../hooks/useAuth';

// ── Step card ─────────────────────────────────────────────────────────────────
const StepCard = ({ number, title, description, color }) => (
  <div style={{
    ...card,
    borderRadius: '12px',
    display:      'flex',
    gap:          '1rem',
    alignItems:   'flex-start',
  }}>
    <div style={{
      width:           '40px',
      height:          '40px',
      borderRadius:    '10px',
      backgroundColor: `${color}20`,
      border:          `1px solid ${color}40`,
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      fontSize:        '1rem',
      fontWeight:      '700',
      color:           color,
      fontFamily:      font.mono,
      flexShrink:      0,
    }}>
      {number}
    </div>
    <div>
      <h3 style={{
        fontSize:     '0.95rem',
        fontWeight:   '600',
        color:        colors.textPrimary,
        marginBottom: '4px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize:   '0.82rem',
        color:      colors.textMuted,
        lineHeight: '1.6',
      }}>
        {description}
      </p>
    </div>
  </div>
);

// ── Score dimension card ──────────────────────────────────────────────────────
const ScoreCard = ({ label, max, color, description, example }) => (
  <div style={{
    ...card,
    borderRadius: '12px',
    borderTop:    `3px solid ${color}`,
  }}>
    <div style={{
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
      marginBottom:   '8px',
    }}>
      <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: colors.textPrimary }}>
        {label}
      </h3>
      <span style={{
        backgroundColor: `${color}20`,
        border:          `1px solid ${color}40`,
        color:           color,
        borderRadius:    '6px',
        padding:         '2px 10px',
        fontSize:        '0.78rem',
        fontWeight:      '700',
        fontFamily:      font.mono,
      }}>
        0–{max} pts
      </span>
    </div>
    <p style={{ fontSize: '0.8rem', color: colors.textMuted, lineHeight: '1.6', marginBottom: '8px' }}>
      {description}
    </p>
    <p style={{ fontSize: '0.75rem', color: colors.textFaint, fontStyle: 'italic' }}>
      Example: {example}
    </p>
  </div>
);

// ── Grade table row ───────────────────────────────────────────────────────────
const GradeRow = ({ range, grade, meaning, color }) => (
  <div style={{
    display:     'flex',
    alignItems:  'center',
    gap:         '12px',
    padding:     '10px 14px',
    borderBottom:`1px solid ${colors.border}`,
    flexWrap:    'wrap',
  }}>
    <span style={{
      fontFamily:  font.mono,
      fontWeight:  '700',
      color:       color,
      minWidth:    '70px',
      fontSize:    '0.875rem',
    }}>
      {range}
    </span>
    <span style={{
      backgroundColor: `${color}20`,
      border:          `1px solid ${color}40`,
      color:           color,
      borderRadius:    '6px',
      padding:         '2px 10px',
      fontSize:        '0.75rem',
      fontWeight:      '700',
      minWidth:        '80px',
      textAlign:       'center',
    }}>
      {grade}
    </span>
    <span style={{ fontSize: '0.82rem', color: colors.textSecondary, flex: 1 }}>
      {meaning}
    </span>
  </div>
);

// ── FAQ item ──────────────────────────────────────────────────────────────────
const FAQ = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: `1px solid ${colors.border}`,
      padding:      '0',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width:           '100%',
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'center',
          padding:         '14px 0',
          background:      'none',
          border:          'none',
          cursor:          'pointer',
          fontFamily:      font.family,
          textAlign:       'left',
          gap:             '12px',
        }}
      >
        <span style={{
          fontSize:   '0.875rem',
          fontWeight: '600',
          color:      colors.textPrimary,
        }}>
          {question}
        </span>
        <span style={{
          color:      colors.textMuted,
          fontSize:   '1.1rem',
          flexShrink: 0,
          transition: 'transform 0.2s',
          transform:  open ? 'rotate(45deg)' : 'none',
        }}>
          +
        </span>
      </button>
      {open && (
        <p style={{
          fontSize:     '0.82rem',
          color:        colors.textMuted,
          lineHeight:   '1.7',
          paddingBottom:'14px',
          animation:    'fadeIn 0.2s ease',
        }}>
          {answer}
        </p>
      )}
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
import { useState } from 'react';

const GuidePage = () => {
  const navigate  = useNavigate();
  const { user }  = useAuth();

  const steps = [
    {
      number:      '01',
      title:       'Create an account',
      description: 'Register with your email and password. No GitHub account needed — DevIQ is a platform for recruiters and evaluators, not developers.',
      color:       colors.blue,
    },
    {
      number:      '02',
      title:       'Search a GitHub username',
      description: 'Enter any public GitHub username in the search bar on your dashboard. DevIQ fetches their complete profile and analyzes it in seconds.',
      color:       colors.green,
    },
    {
      number:      '03',
      title:       'Read the analysis',
      description: 'View the score breakdown across 5 dimensions, language distribution chart, repository list, and activity trend. Click any repo for detailed information.',
      color:       colors.purple,
    },
    {
      number:      '04',
      title:       'Compare multiple developers',
      description: 'Go to the Compare page and add 2 to 4 GitHub usernames. DevIQ ranks them by total score and shows a side-by-side comparison chart.',
      color:       colors.yellow,
    },
    {
      number:      '05',
      title:       'Save and share reports',
      description: 'Save any analysis or comparison as a named report with your personal notes. All reports are stored privately in your account.',
      color:       colors.red,
    },
  ];

  const scoreDimensions = [
    {
      label:       'Activity',
      max:         20,
      color:       colors.blue,
      description: 'Measures how recently and consistently the developer has pushed code. We count repos with activity in the last 6 months divided by total repos.',
      example:     'A developer who pushed to 8 out of 10 repos in the last 6 months scores 16/20.',
    },
    {
      label:       'Popularity',
      max:         25,
      color:       colors.yellow,
      description: 'Measures real-world impact of the developer\'s work using total stars and forks across all repos. We use a log scale to keep scores fair regardless of repo size.',
      example:     'A developer with 500 total stars and 80 forks scores around 18/25.',
    },
    {
      label:       'Quality',
      max:         20,
      color:       colors.green,
      description: 'Measures whether repos follow best practices — README presence, original work (not just forks), and use of topic tags for discoverability.',
      example:     'A developer with README in 9/10 repos, 80% original repos, and topics tagged scores 17/20.',
    },
    {
      label:       'Diversity',
      max:         15,
      color:       colors.purple,
      description: 'Measures how many distinct programming languages the developer uses across their repos. Multi-language developers score higher.',
      example:     'A developer using JavaScript, Python, Go, CSS, and SQL (5 languages) scores 12.5/15.',
    },
    {
      label:       'Community',
      max:         20,
      color:       colors.red,
      description: 'Measures recognition by the developer community through followers count. We use a log scale so developers are not unfairly penalised for being newer.',
      example:     'A developer with 500 followers scores around 14/20.',
    },
  ];

  const faqs = [
    {
      question: 'Does the developer need to know I analyzed their profile?',
      answer:   'No. DevIQ only reads public GitHub data that is already visible to anyone. No notification is sent to the developer.',
    },
    {
      question: 'Why does the same developer show a different score sometimes?',
      answer:   'Profiles are cached for 6 hours. If a developer pushes new code, the score updates on the next fetch after the cache expires.',
    },
    {
      question: 'What if a developer has private repositories?',
      answer:   'GitHub API only provides access to public repositories. Private repos are not counted. This is a known limitation — the score reflects public contributions only.',
    },
    {
      question: 'Can two recruiters see each other\'s reports?',
      answer:   'No. All reports and search history are completely private. Each recruiter\'s data is isolated and only visible to them.',
    },
    {
      question: 'Is a high score guaranteed to mean a good developer?',
      answer:   'Not always. The score measures GitHub activity and public impact — not raw coding ability. A developer with many personal projects scores high. A developer who works entirely in private repos may score low even if they are excellent.',
    },
    {
      question: 'How many developers can I compare at once?',
      answer:   'Between 2 and 4 developers can be compared in a single comparison. You can save multiple comparison reports to compare different groups.',
    },
    {
      question: 'How long is my search history kept?',
      answer:   'Search history is automatically deleted after 90 days using MongoDB TTL index. This keeps your history relevant and your storage clean.',
    },
  ];

  return (
    <div style={{
      minHeight:       '100vh',
      backgroundColor: colors.bg,
      fontFamily:      font.family,
    }}>
      {user ? <Navbar />: <PublicNavbar />}

      <div style={{
        maxWidth: '800px',
        margin:   '0 auto',
        padding:  '2rem 1.25rem 4rem',
      }}>

        {/* ── Hero ── */}
        <div style={{
          textAlign:     'center',
          padding:       '3rem 1rem',
          marginBottom:  '2.5rem',
          animation:     'fadeIn 0.4s ease',
        }}>
          <div style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            backgroundColor:`${colors.blue}15`,
            border:         `1px solid ${colors.blue}30`,
            borderRadius:   '20px',
            padding:        '5px 16px',
            marginBottom:   '1.25rem',
          }}>
            <span style={{ fontSize: '0.78rem', color: colors.blue, fontWeight: '600', letterSpacing: '0.05em' }}>
              HOW IT WORKS
            </span>
          </div>

          <h1 style={{
            fontSize:      'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight:    '800',
            color:         colors.textPrimary,
            marginBottom:  '1rem',
            letterSpacing: '-0.5px',
            lineHeight:    '1.2',
          }}>
            Evaluate developers faster<br />
            <span style={{ color: colors.blue }}>with data, not guesswork</span>
          </h1>

          <p style={{
            fontSize:   '1rem',
            color:      colors.textMuted,
            maxWidth:   '500px',
            margin:     '0 auto 2rem',
            lineHeight: '1.7',
          }}>
            DevIQ converts any GitHub username into a structured performance
            report with a 0–100 score. No more manual profile browsing.
          </p>

          {!user && (
            <button
              onClick={() => navigate('/register')}
              style={{ ...btnPrimary, padding: '12px 32px', fontSize: '0.95rem' }}
            >
              Get started free →
            </button>
          )}
          {user && (
            <button
              onClick={() => navigate('/dashboard')}
              style={{ ...btnPrimary, padding: '12px 32px', fontSize: '0.95rem' }}
            >
              Go to dashboard →
            </button>
          )}
        </div>

        {/* ── How to use ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize:     '1.2rem',
            fontWeight:   '700',
            color:        colors.textPrimary,
            marginBottom: '1rem',
          }}>
            How to use DevIQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>

        {/* ── Scoring criteria ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{
              fontSize:     '1.2rem',
              fontWeight:   '700',
              color:        colors.textPrimary,
              marginBottom: '4px',
            }}>
              Scoring criteria
            </h2>
            <p style={{ fontSize: '0.85rem', color: colors.textMuted }}>
              Every profile is scored out of 100 across 5 independent dimensions
            </p>
          </div>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap:                 '1rem',
          }}>
            {scoreDimensions.map((dim) => (
              <ScoreCard key={dim.label} {...dim} />
            ))}
          </div>
        </div>

        {/* ── Grade table ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize:     '1.2rem',
            fontWeight:   '700',
            color:        colors.textPrimary,
            marginBottom: '1rem',
          }}>
            What does the score mean?
          </h2>
          <div style={{
            ...card,
            borderRadius: '14px',
            padding:      0,
            overflow:     'hidden',
          }}>
            <div style={{
              padding:         '12px 14px',
              backgroundColor: colors.surface2,
              borderBottom:    `1px solid ${colors.border}`,
              display:         'flex',
              gap:             '12px',
            }}>
              <span style={{ fontSize: '0.72rem', color: colors.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: '70px' }}>Score</span>
              <span style={{ fontSize: '0.72rem', color: colors.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: '80px' }}>Grade</span>
              <span style={{ fontSize: '0.72rem', color: colors.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>What it means</span>
            </div>
            <div style={{ padding: '0 14px' }}>
              <GradeRow range="80–100" grade="Excellent" color={colors.green}
                meaning="Highly active, impactful, and recognized developer. Strong candidate for senior roles." />
              <GradeRow range="60–79"  grade="Good"      color={colors.blue}
                meaning="Solid developer with consistent activity and decent community presence." />
              <GradeRow range="40–59"  grade="Average"   color={colors.yellow}
                meaning="Some GitHub presence but inconsistent activity or limited impact." />
              <GradeRow range="0–39"   grade="Weak"      color={colors.red}
                meaning="Limited public GitHub activity. May have private work not reflected in score." />
            </div>
          </div>
        </div>

        {/* ── Limitations ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize:     '1.2rem',
            fontWeight:   '700',
            color:        colors.textPrimary,
            marginBottom: '1rem',
          }}>
            Important limitations
          </h2>
          <div style={{
            ...card,
            borderRadius: '12px',
            borderLeft:   `4px solid ${colors.yellow}`,
          }}>
            {[
              'Private repositories are not visible to the GitHub API and are not counted in the score.',
              'The score measures GitHub activity, not raw coding ability or problem-solving skill.',
              'A developer who contributes to others\' repos but has few personal repos may score lower.',
              'Scores are cached for 6 hours. Very recent pushes may not reflect immediately.',
              'Log scale is used for stars and followers to prevent viral repos from dominating the score.',
            ].map((item, i) => (
              <div key={i} style={{
                display:      'flex',
                gap:          '10px',
                paddingBottom:'10px',
                marginBottom: i < 4 ? '10px' : 0,
                borderBottom: i < 4 ? `1px solid ${colors.border}` : 'none',
              }}>
                <span style={{ color: colors.yellow, flexShrink: 0, marginTop: '1px' }}>⚠</span>
                <p style={{ fontSize: '0.82rem', color: colors.textSecondary, lineHeight: '1.6' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize:     '1.2rem',
            fontWeight:   '700',
            color:        colors.textPrimary,
            marginBottom: '1rem',
          }}>
            Frequently asked questions
          </h2>
          <div style={{ ...card, borderRadius: '14px' }}>
            {faqs.map((faq) => (
              <FAQ key={faq.question} {...faq} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        {!user && (
          <div style={{
            ...card,
            borderRadius: '16px',
            textAlign:    'center',
            padding:      '2.5rem',
            borderColor:  `${colors.blue}40`,
          }}>
            <h2 style={{
              fontSize:     '1.3rem',
              fontWeight:   '700',
              color:        colors.textPrimary,
              marginBottom: '8px',
            }}>
              Ready to start evaluating?
            </h2>
            <p style={{
              fontSize:     '0.875rem',
              color:        colors.textMuted,
              marginBottom: '1.5rem',
            }}>
              Create a free account and analyze your first developer in seconds
            </p>
            <button
              onClick={() => navigate('/register')}
              style={{ ...btnPrimary, padding: '11px 32px', fontSize: '0.95rem' }}
            >
              Create free account →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default GuidePage;