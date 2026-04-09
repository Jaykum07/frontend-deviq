import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import { colors, font, btnPrimary } from "../theme";

// ── Helpers ───────────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{
    backgroundColor: colors.surface,
    border:          `1px solid ${colors.border}`,
    borderRadius:    "14px",
    padding:         "1.5rem",
    ...style,
  }}>
    {children}
  </div>
);

const Badge = ({ children, color }) => (
  <span style={{
    backgroundColor: `${color}15`,
    border:          `1px solid ${color}30`,
    color:           color,
    borderRadius:    "20px",
    padding:         "3px 12px",
    fontSize:        "0.72rem",
    fontWeight:      "600",
    textTransform:   "uppercase",
    letterSpacing:   "0.06em",
    display:         "inline-block",
  }}>
    {children}
  </span>
);

// ── FAQ item ──────────────────────────────────────────────────────────────────
const FAQ = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${colors.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width:          "100%",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          padding:        "16px 0",
          background:     "none",
          border:         "none",
          cursor:         "pointer",
          fontFamily:     font.family,
          textAlign:      "left",
          gap:            "16px",
        }}
      >
        <span style={{ fontSize: "0.9rem", fontWeight: "600", color: colors.textPrimary }}>
          {question}
        </span>
        <span style={{
          color:     colors.textMuted,
          fontSize:  "1.2rem",
          flexShrink:0,
          transform: open ? "rotate(45deg)" : "none",
          transition:"transform 0.2s",
          display:   "inline-block",
        }}>
          +
        </span>
      </button>
      {open && (
        <p style={{
          fontSize:     "0.85rem",
          color:        colors.textMuted,
          lineHeight:   "1.7",
          paddingBottom:"16px",
          animation:    "fadeIn 0.2s ease",
        }}>
          {answer}
        </p>
      )}
    </div>
  );
};

// ── Stat box ──────────────────────────────────────────────────────────────────
const Stat = ({ value, label }) => (
  <div style={{ textAlign: "center" }}>
    <p style={{
      fontSize:      "clamp(1.8rem, 4vw, 2.5rem)",
      fontWeight:    "800",
      color:         colors.textPrimary,
      fontFamily:    font.mono,
      letterSpacing: "-1px",
      lineHeight:    1,
      marginBottom:  "6px",
    }}>
      {value}
    </p>
    <p style={{ fontSize: "0.82rem", color: colors.textMuted }}>
      {label}
    </p>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon:        "⚡",
      title:       "Instant analysis",
      description: "Enter any GitHub username and get a full profile analysis in seconds. No manual browsing, no guesswork.",
      color:       colors.blue,
    },
    {
      icon:        "📊",
      title:       "0–100 scoring",
      description: "Every developer gets a structured score across 5 independent dimensions. Consistent, fair, and reproducible.",
      color:       colors.green,
    },
    {
      icon:        "⚖️",
      title:       "Side-by-side compare",
      description: "Compare up to 4 developers simultaneously. Ranked results with a bar chart make decisions obvious.",
      color:       colors.purple,
    },
    {
      icon:        "💾",
      title:       "Save reports",
      description: "Save single or comparison reports with your personal notes. Scores are frozen at evaluation date.",
      color:       colors.yellow,
    },
    {
      icon:        "📈",
      title:       "Activity charts",
      description: "See repository activity trends, language distribution, and commit patterns at a glance.",
      color:       colors.red,
    },
    {
      icon:        "🔒",
      title:       "Private & secure",
      description: "Each recruiter's data is completely isolated. Your reports and history are never visible to others.",
      color:       colors.textSecondary,
    },
  ];

  const steps = [
    {
      num:   "01",
      title: "Create your account",
      desc:  "Register with your email. No GitHub account needed — DevIQ is built for recruiters, not developers.",
      color: colors.blue,
    },
    {
      num:   "02",
      title: "Search a GitHub username",
      desc:  "Type any public GitHub username. DevIQ fetches their complete profile and analyzes it in seconds.",
      color: colors.green,
    },
    {
      num:   "03",
      title: "Read the score breakdown",
      desc:  "View score across 5 dimensions, language charts, repo list, and activity trend — all in one page.",
      color: colors.purple,
    },
    {
      num:   "04",
      title: "Compare and decide",
      desc:  "Add multiple candidates to Compare page. DevIQ ranks them automatically. Save the report with your notes.",
      color: colors.yellow,
    },
  ];

  const scoreDims = [
    { label: "Activity",   max: 20, color: colors.blue,   desc: "Code pushed in last 6 months"           },
    { label: "Popularity", max: 25, color: colors.yellow, desc: "Stars and forks (log scale)"             },
    { label: "Quality",    max: 20, color: colors.green,  desc: "README, original work, topics"           },
    { label: "Diversity",  max: 15, color: colors.purple, desc: "Number of distinct languages used"       },
    { label: "Community",  max: 20, color: colors.red,    desc: "Followers and recognition (log scale)"   },
  ];

  const faqs = [
    {
      q: "Do I need a GitHub account to use DevIQ?",
      a: "No. DevIQ is a platform for recruiters and evaluators. You only need a DevIQ account. The developers you analyze only need a public GitHub profile.",
    },
    {
      q: "Is the score 100% accurate?",
      a: "The score measures public GitHub activity — not raw coding skill. A developer with all private repos may score low even if they are excellent. We recommend using the score as a starting filter, not a final judgment.",
    },
    {
      q: "Can the developer see that I analyzed them?",
      a: "No. DevIQ only reads public GitHub data that is already visible to anyone. No notification is sent to the developer.",
    },
    {
      q: "How often is profile data updated?",
      a: "Profiles are cached for 6 hours. If a developer pushes new code, the score updates on the next fetch after cache expires.",
    },
    {
      q: "Can two recruiters see each other's reports?",
      a: "Never. All reports and history are completely private. Each account's data is fully isolated.",
    },
    {
      q: "How many developers can I compare at once?",
      a: "Between 2 and 4 developers can be compared in a single session. You can save multiple comparison reports for different groups.",
    },
  ];

  const sectionHead = (title, subtitle, id) => (
    <div id={id} style={{ textAlign: "center", marginBottom: "3rem" }}>
      <h2 style={{
        fontSize:      "clamp(1.5rem, 3vw, 2rem)",
        fontWeight:    "700",
        color:         colors.textPrimary,
        letterSpacing: "-0.3px",
        marginBottom:  "10px",
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize:  "0.95rem",
          color:     colors.textMuted,
          maxWidth:  "480px",
          margin:    "0 auto",
          lineHeight:"1.6",
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .feat-grid   { grid-template-columns: 1fr !important; }
          .steps-grid  { grid-template-columns: 1fr !important; }
          .score-grid  { grid-template-columns: 1fr !important; }
          .stats-grid  { grid-template-columns: 1fr 1fr !important; }
          .hero-btns   { flex-direction: column !important; }
          .hero-btns button { width: 100% !important; }
        }
        @media (max-width: 900px) {
          .feat-grid  { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <div style={{
        minHeight:       "100vh",
        backgroundColor: colors.bg,
        fontFamily:      font.family,
        overflowX:       "hidden",
      }}>
        <PublicNavbar />

        {/* ════════════════════════════════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          maxWidth:  "1100px",
          margin:    "0 auto",
          padding:   "5rem 1.5rem 4rem",
          textAlign: "center",
        }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <Badge color={colors.blue}>
              Developer Intelligence Platform
            </Badge>
          </div>

          <h1 style={{
            fontSize:      "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight:    "800",
            color:         colors.textPrimary,
            letterSpacing: "-1px",
            lineHeight:    "1.15",
            marginBottom:  "1.25rem",
            maxWidth:      "700px",
            margin:        "0 auto 1.25rem",
          }}>
            Evaluate developers{" "}
            <span style={{ color: colors.blue }}>with data,</span>
            <br />not guesswork
          </h1>

          <p style={{
            fontSize:   "1.05rem",
            color:      colors.textMuted,
            maxWidth:   "520px",
            margin:     "0 auto 2.5rem",
            lineHeight: "1.7",
          }}>
            DevIQ converts any GitHub username into a structured 0–100 score.
            Search, compare, and save reports — all in one platform built for recruiters.
          </p>

          <div
            className="hero-btns"
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              gap:            "12px",
              flexWrap:       "wrap",
              marginBottom:   "3rem",
            }}
          >
            <button
              onClick={() => navigate("/register")}
              style={{
                ...btnPrimary,
                padding:  "13px 32px",
                fontSize: "1rem",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#388bfd"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1f6feb"}
            >
              Get started free
              <svg width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{
                backgroundColor: "transparent",
                border:          `1px solid ${colors.border}`,
                borderRadius:    "10px",
                padding:         "13px 28px",
                fontSize:        "1rem",
                fontWeight:      "500",
                color:           colors.textSecondary,
                cursor:          "pointer",
                fontFamily:      font.family,
                transition:      "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.blue;
                e.currentTarget.style.color       = colors.blue;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.color       = colors.textSecondary;
              }}
            >
              Sign in
            </button>
          </div>

          {/* Hero preview card */}
          <div style={{
            maxWidth:        "640px",
            margin:          "0 auto",
            backgroundColor: colors.surface,
            border:          `1px solid ${colors.border}`,
            borderRadius:    "16px",
            padding:         "1.25rem",
            textAlign:       "left",
          }}>
            <div style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "12px",
              marginBottom: "1rem",
              paddingBottom:"1rem",
              borderBottom: `1px solid ${colors.border}`,
            }}>
              <div style={{
                width:        "44px",
                height:       "44px",
                borderRadius: "50%",
                backgroundColor: `${colors.blue}20`,
                border:       `2px solid ${colors.blue}40`,
                display:      "flex",
                alignItems:   "center",
                justifyContent:"center",
                fontSize:     "1rem",
                fontWeight:   "700",
                color:        colors.blue,
                fontFamily:   font.mono,
              }}>
                T
              </div>
              <div>
                <p style={{ fontSize: "0.95rem", fontWeight: "700", color: colors.textPrimary }}>
                  torvalds
                </p>
                <p style={{ fontSize: "0.75rem", color: colors.textMuted }}>
                  Linus Torvalds · Finland · 236k followers
                </p>
              </div>
              <div style={{
                marginLeft:      "auto",
                backgroundColor: `${colors.green}15`,
                border:          `1px solid ${colors.green}40`,
                borderRadius:    "8px",
                padding:         "4px 12px",
                textAlign:       "center",
              }}>
                <p style={{ fontSize: "1.3rem", fontWeight: "700", color: colors.green, fontFamily: font.mono }}>
                  87
                </p>
                <p style={{ fontSize: "0.62rem", color: colors.textMuted }}>/ 100</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Activity",   val: 18, max: 20, color: colors.blue   },
                { label: "Popularity", val: 25, max: 25, color: colors.yellow },
                { label: "Quality",    val: 16, max: 20, color: colors.green  },
                { label: "Diversity",  val: 10, max: 15, color: colors.purple },
                { label: "Community",  val: 18, max: 20, color: colors.red    },
              ].map((d) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "0.75rem", color: colors.textMuted, minWidth: "70px" }}>
                    {d.label}
                  </span>
                  <div style={{
                    flex:            1,
                    height:          "5px",
                    backgroundColor: colors.surface2,
                    borderRadius:    "999px",
                    overflow:        "hidden",
                  }}>
                    <div style={{
                      height:          "100%",
                      width:           `${(d.val / d.max) * 100}%`,
                      backgroundColor: d.color,
                      borderRadius:    "999px",
                    }} />
                  </div>
                  <span style={{
                    fontSize:   "0.72rem",
                    fontWeight: "600",
                    color:      d.color,
                    fontFamily: font.mono,
                    minWidth:   "40px",
                    textAlign:  "right",
                  }}>
                    {d.val}/{d.max}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            STATS SECTION
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          borderTop:    `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
          padding:      "3rem 1.5rem",
        }}>
          <div
            className="stats-grid"
            style={{
              maxWidth:            "800px",
              margin:              "0 auto",
              display:             "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap:                 "2rem",
            }}
          >
            <Stat value="5"   label="Score dimensions" />
            <Stat value="100" label="Max score per profile" />
            <Stat value="4"   label="Developers compared at once" />
            <Stat value="90d" label="History auto-expiry" />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FEATURES SECTION
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 1.5rem" }}>
          {sectionHead(
            "Everything you need to evaluate developers",
            "Built for recruiters who need fast, structured, and data-driven insights.",
            "features"
          )}

          <div
            className="feat-grid"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap:                 "1rem",
            }}
          >
            {features.map((f) => (
              <Card key={f.title} style={{ transition: "border-color 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = f.color}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
              >
                <div style={{
                  width:           "40px",
                  height:          "40px",
                  borderRadius:    "10px",
                  backgroundColor: `${f.color}15`,
                  border:          `1px solid ${f.color}30`,
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  fontSize:        "1.25rem",
                  marginBottom:    "0.875rem",
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontSize:     "0.95rem",
                  fontWeight:   "600",
                  color:        colors.textPrimary,
                  marginBottom: "6px",
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize:   "0.82rem",
                  color:      colors.textMuted,
                  lineHeight: "1.6",
                }}>
                  {f.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            HOW IT WORKS
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: colors.surface,
          borderTop:       `1px solid ${colors.border}`,
          borderBottom:    `1px solid ${colors.border}`,
          padding:         "5rem 1.5rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {sectionHead(
              "How it works",
              "From signup to your first report in under 2 minutes.",
              "how"
            )}
            <div
              className="steps-grid"
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap:                 "1rem",
                position:            "relative",
              }}
            >
              {steps.map((step, i) => (
                <div key={step.num} style={{ position: "relative" }}>
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div style={{
                      position:        "absolute",
                      top:             "20px",
                      left:            "calc(50% + 20px)",
                      right:           "-50%",
                      height:          "1px",
                      backgroundColor: colors.border,
                      zIndex:          0,
                    }} className="feat-grid" />
                  )}
                  <div style={{
                    backgroundColor: colors.bg,
                    border:          `1px solid ${colors.border}`,
                    borderRadius:    "14px",
                    padding:         "1.25rem",
                    textAlign:       "center",
                    position:        "relative",
                    zIndex:          1,
                  }}>
                    <div style={{
                      width:           "40px",
                      height:          "40px",
                      borderRadius:    "50%",
                      backgroundColor: `${step.color}20`,
                      border:          `2px solid ${step.color}40`,
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "0.82rem",
                      fontWeight:      "700",
                      color:           step.color,
                      fontFamily:      font.mono,
                      margin:          "0 auto 0.875rem",
                    }}>
                      {step.num}
                    </div>
                    <h3 style={{
                      fontSize:     "0.9rem",
                      fontWeight:   "600",
                      color:        colors.textPrimary,
                      marginBottom: "6px",
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontSize:   "0.78rem",
                      color:      colors.textMuted,
                      lineHeight: "1.6",
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SCORING CRITERIA
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 1.5rem" }}>
          {sectionHead(
            "Transparent scoring criteria",
            "Every score is calculated from 5 independent dimensions. No black box.",
            "scoring"
          )}

          <div
            className="score-grid"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap:                 "1rem",
              marginBottom:        "2rem",
            }}
          >
            {scoreDims.map((d) => (
              <Card key={d.label} style={{ textAlign: "center", borderTop: `3px solid ${d.color}`, padding: "1.25rem 1rem" }}>
                <p style={{
                  fontSize:     "1.6rem",
                  fontWeight:   "700",
                  color:        d.color,
                  fontFamily:   font.mono,
                  marginBottom: "6px",
                }}>
                  {d.max}
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: "600", color: colors.textPrimary, marginBottom: "6px" }}>
                  {d.label}
                </p>
                <p style={{ fontSize: "0.75rem", color: colors.textMuted, lineHeight: "1.5" }}>
                  {d.desc}
                </p>
              </Card>
            ))}
          </div>

          {/* Grade table */}
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{
              padding:         "12px 18px",
              backgroundColor: colors.surface2,
              borderBottom:    `1px solid ${colors.border}`,
              display:         "grid",
              gridTemplateColumns: "100px 100px 1fr",
              gap:             "12px",
            }}>
              {["Score", "Grade", "What it means"].map((h) => (
                <span key={h} style={{
                  fontSize:      "0.7rem",
                  color:         colors.textFaint,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight:    "600",
                }}>
                  {h}
                </span>
              ))}
            </div>
            {[
              { range: "80–100", grade: "Excellent", color: colors.green,  meaning: "Highly active, impactful developer. Strong candidate for senior or lead roles." },
              { range: "60–79",  grade: "Good",      color: colors.blue,   meaning: "Solid developer with consistent activity and decent community presence."        },
              { range: "40–59",  grade: "Average",   color: colors.yellow, meaning: "Some GitHub presence but inconsistent activity or limited impact."               },
              { range: "0–39",   grade: "Weak",      color: colors.red,    meaning: "Limited public activity. May have significant private work not reflected here."  },
            ].map((row, i) => (
              <div key={row.range} style={{
                display:             "grid",
                gridTemplateColumns: "100px 100px 1fr",
                gap:                 "12px",
                padding:             "12px 18px",
                alignItems:          "center",
                borderBottom:        i < 3 ? `1px solid ${colors.border}` : "none",
              }}>
                <span style={{ fontSize: "0.875rem", fontWeight: "700", color: row.color, fontFamily: font.mono }}>
                  {row.range}
                </span>
                <span style={{
                  backgroundColor: `${row.color}15`,
                  border:          `1px solid ${row.color}30`,
                  color:           row.color,
                  borderRadius:    "6px",
                  padding:         "2px 10px",
                  fontSize:        "0.75rem",
                  fontWeight:      "600",
                  display:         "inline-block",
                }}>
                  {row.grade}
                </span>
                <span style={{ fontSize: "0.82rem", color: colors.textSecondary }}>
                  {row.meaning}
                </span>
              </div>
            ))}
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FAQ
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: colors.surface,
          borderTop:       `1px solid ${colors.border}`,
          borderBottom:    `1px solid ${colors.border}`,
          padding:         "5rem 1.5rem",
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            {sectionHead("Frequently asked questions", null, "faq")}
            <Card>
              {faqs.map((f) => (
                <FAQ key={f.q} question={f.q} answer={f.a} />
              ))}
            </Card>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            CTA SECTION
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: "700px", margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
          <Badge color={colors.blue}>Free to use</Badge>
          <h2 style={{
            fontSize:      "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight:    "800",
            color:         colors.textPrimary,
            letterSpacing: "-0.5px",
            margin:        "1rem 0",
          }}>
            Start evaluating developers today
          </h2>
          <p style={{
            fontSize:     "0.95rem",
            color:        colors.textMuted,
            marginBottom: "2rem",
            lineHeight:   "1.6",
          }}>
            Create a free account and analyze your first developer profile in seconds.
            No credit card required.
          </p>
          <div className="hero-btns" style={{
            display: "flex", gap: "12px",
            justifyContent: "center", flexWrap: "wrap",
          }}>
            <button
              onClick={() => navigate("/register")}
              style={{
                ...btnPrimary,
                padding:      "13px 36px",
                fontSize:     "1rem",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#388bfd"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1f6feb"}
            >
              Create free account →
            </button>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════════ */}
        <footer style={{
          borderTop:       `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
          padding:         "3rem 1.5rem 2rem",
          fontFamily:      font.family,
        }}>
          <div style={{
            maxWidth:            "1100px",
            margin:              "0 auto",
            display:             "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap:                 "2rem",
            marginBottom:        "2.5rem",
          }} className="footer-grid">
            <style>{`.footer-grid { @media (max-width: 640px) { grid-template-columns: 1fr 1fr !important; } }`}</style>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.875rem" }}>
                <div style={{
                  width:        "32px",
                  height:       "32px",
                  borderRadius: "8px",
                  overflow:     "hidden",
                  border:       `1.5px solid ${colors.border}`,
                }}>
                  <img src="/deviqlogo.jpg" alt="DevIQ"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <span style={{
                  fontSize:   "1rem",
                  fontWeight: "700",
                  color:      colors.textPrimary,
                }}>
                  Dev<span style={{ color: colors.blue }}>IQ</span>
                </span>
              </div>
              <p style={{
                fontSize:   "0.82rem",
                color:      colors.textMuted,
                lineHeight: "1.6",
                maxWidth:   "240px",
              }}>
                Developer Intelligence Platform. Evaluate GitHub profiles with structured, data-driven scoring.
              </p>
            </div>

            {/* Platform */}
            <div>
              <p style={{
                fontSize:      "0.75rem",
                fontWeight:    "600",
                color:         colors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom:  "0.875rem",
              }}>
                Platform
              </p>
              {[
                { label: "Dashboard",  path: "/dashboard" },
                { label: "Compare",    path: "/compare"   },
                { label: "Reports",    path: "/reports"   },
                { label: "How it works", path: "/guide"   },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  style={{
                    display:        "block",
                    fontSize:       "0.82rem",
                    color:          colors.textMuted,
                    textDecoration: "none",
                    marginBottom:   "8px",
                    transition:     "color 0.15s",
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.textPrimary}
                  onMouseLeave={(e) => e.target.style.color = colors.textMuted}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Account */}
            <div>
              <p style={{
                fontSize:      "0.75rem",
                fontWeight:    "600",
                color:         colors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom:  "0.875rem",
              }}>
                Account
              </p>
              {[
                { label: "Sign in",    path: "/login"    },
                { label: "Register",   path: "/register" },
                { label: "My profile", path: "/profile"  },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  style={{
                    display:        "block",
                    fontSize:       "0.82rem",
                    color:          colors.textMuted,
                    textDecoration: "none",
                    marginBottom:   "8px",
                    transition:     "color 0.15s",
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.textPrimary}
                  onMouseLeave={(e) => e.target.style.color = colors.textMuted}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Tech */}
            <div>
              <p style={{
                fontSize:      "0.75rem",
                fontWeight:    "600",
                color:         colors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom:  "0.875rem",
              }}>
                Built with
              </p>
              {["React + Vite", "Node.js + Express", "MongoDB Atlas", "GitHub REST API"].map((tech) => (
                <p key={tech} style={{
                  fontSize:     "0.82rem",
                  color:        colors.textMuted,
                  marginBottom: "8px",
                }}>
                  {tech}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop:      `1px solid ${colors.border}`,
            paddingTop:     "1.25rem",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            "0.75rem",
          }}>
            <p style={{ fontSize: "0.78rem", color: colors.textFaint }}>
              © {new Date().getFullYear()} DevIQ — Developer Intelligence Platform.
              Built as a final year academic project.
            </p>
            <p style={{ fontSize: "0.78rem", color: colors.textFaint }}>
              Data sourced from GitHub Public API · Scores cached 6 hours
            </p>
          </div>
        </footer>

      </div>
    </>
  );
};

export default LandingPage;