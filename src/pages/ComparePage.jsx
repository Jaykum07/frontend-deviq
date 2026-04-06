import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UsernameInput from "../components/compare/UserNameInput";
import WinnerBanner from "../components/compare/WinnerBanner";
import CompareCard from "../components/compare/CompareCard";
import CompareChart from "../components/compare/CompareChart";
import { compareUsersApi } from "../api/compareApi";
import { createReportApi } from "../api/reportApi";
import { colors, font, btnPrimary, card } from "../theme";

const ComparePage = () => {
  const navigate = useNavigate();

  const [usernames, setUsernames] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportSaved, setReportSaved] = useState(false);

  // ── Compare ─────────────────────────────────────────────────────────────────
  const handleCompare = async () => {
    if (usernames.length < 2) {
      setError("Add at least 2 usernames to compare");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await compareUsersApi(usernames);
      setResults(res.data);
      setReportTitle(`Comparison — ${usernames.join(" vs ")}`);
    } catch (err) {
      setError(err.response?.data?.message || "Comparison failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Save comparison report ───────────────────────────────────────────────────
  const handleSaveReport = async () => {
    if (!reportTitle.trim()) {
      setError("Please enter a title for the report");
      return;
    }
    setSaving(true);
    setError("");
    try {
      // Get analysis IDs from results
      // We need to fetch them from the compare results
      // Results have githubUsername — we match to get analysisIds
      const analysisIds = results.results
        .map((r) => r.analysisId)
        .filter(Boolean);

      if (analysisIds.length < 2) {
        setError("Cannot save - please compare again after backend restart");
        setSaving(false);
        return;
      }

      await createReportApi({
        title: reportTitle.trim(),
        type: "comparison",
        analysisIds: analysisIds.length > 0 ? analysisIds : undefined,
        notes: `Compared: ${usernames.join(", ")}. Winner: ${results.winner}`,
      });

      setSavedMsg("Comparison report saved!");
      setShowSaveForm(false);
      setReportSaved(true);
      setTimeout(() => setSavedMsg(""), 3000);
      navigate("/reports");
    } catch (err) {
      setError(
        `Failed to save report: ${err.response?.data?.message || "Try again."}`
      );
    } finally {
      setSaving(false);
    }
  };

  const winner = results?.results?.[0];

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .compare-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .compare-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .compare-grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: colors.bg,
          fontFamily: font.family,
        }}
      >
        <Navbar />

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "2rem 1.25rem",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "2rem", animation: "fadeIn 0.4s ease" }}>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: colors.textPrimary,
                marginBottom: "6px",
                letterSpacing: "-0.3px",
              }}
            >
              Compare developers
            </h1>
            <p style={{ fontSize: "0.9rem", color: colors.textMuted }}>
              Add 2 to 4 GitHub usernames and compare their profiles side by
              side
            </p>
          </div>

          {/* Username input */}
          <UsernameInput usernames={usernames} onChange={setUsernames} />

          {/* Error */}
          {error && (
            <div
              style={{
                backgroundColor: colors.redDim,
                border: `1px solid ${colors.red}40`,
                color: colors.red,
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Compare button */}
          {!results && (
            <button
              onClick={handleCompare}
              disabled={loading || usernames.length < 2}
              style={{
                ...btnPrimary,
                padding: "12px 32px",
                fontSize: "0.95rem",
                opacity: usernames.length < 2 ? 0.5 : 1,
                cursor: usernames.length < 2 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "1.5rem",
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff40",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  Compare developers
                </>
              )}
            </button>
          )}

          {/* Loading state */}
          {loading && (
            <div
              style={{
                ...card,
                borderRadius: "14px",
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: `3px solid ${colors.border}`,
                  borderTopColor: colors.blue,
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              <p style={{ color: colors.textSecondary, fontSize: "0.9rem" }}>
                Fetching and analyzing profiles...
              </p>
              <p
                style={{
                  color: colors.textMuted,
                  fontSize: "0.8rem",
                  marginTop: "4px",
                }}
              >
                This may take a few seconds
              </p>
            </div>
          )}

          {/* Results */}
          {!loading && results && (
            <div style={{ animation: "fadeIn 0.4s ease" }}>
              {/* Toast */}
              {savedMsg && (
                <div
                  style={{
                    position: "fixed",
                    top: "80px",
                    right: "20px",
                    backgroundColor: colors.green,
                    color: "#000",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    zIndex: 150,
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  ✓ {savedMsg}
                </div>
              )}

              {/* Winner banner */}
              <WinnerBanner winner={winner} />

              {/* Bar chart */}
              <CompareChart results={results.results} />

              {/* Compare cards grid */}
              <div
                className={`compare-grid compare-grid-${results.results.length}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(
                    results.results.length,
                    2
                  )}, 1fr)`,
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {results.results.map((result, i) => (
                  <CompareCard
                    key={result.githubUsername}
                    result={result}
                    rank={result.rank}
                    colorIndex={i}
                    isWinner={i === 0}
                  />
                ))}
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {/* New comparison */}
                <button
                  onClick={() => {
                    setResults(null);
                    setUsernames([]);
                    setError("");
                    setReportSaved(false);
                    setShowSaveForm(false);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    color: colors.textSecondary,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontFamily: font.family,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = colors.blue)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = colors.border)
                  }
                >
                  New comparison
                </button>

                {/* Save report button */}
                <button
                  onClick={() => {
                    if (!reportSaved) setShowSaveForm(!showSaveForm);
                  }}
                  disabled={reportSaved}
                  style={{
                    ...btnPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 20px",
                    opacity: reportSaved ? 0.7 : 1,
                    cursor: reportSaved ? "not-allowed" : "pointer",
                    backgroundColor: reportSaved ? colors.green : colors.blueBg,
                  }}
                >
                  {reportSaved ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Report saved
                    </>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Save report
                    </>
                  )}
                </button>
              </div>

              {/* Save report form */}
              {showSaveForm && (
                <div
                  style={{
                    ...card,
                    borderRadius: "12px",
                    padding: "1.25rem",
                    marginTop: "1rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: colors.textPrimary,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Save comparison report
                  </h3>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Report title"
                    style={{
                      width: "100%",
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: colors.textPrimary,
                      fontSize: "0.875rem",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: font.family,
                      marginBottom: "0.75rem",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => setShowSaveForm(false)}
                      style={{
                        backgroundColor: "transparent",
                        border: `1px solid ${colors.border}`,
                        borderRadius: "8px",
                        padding: "8px 16px",
                        color: colors.textSecondary,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        fontFamily: font.family,
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveReport}
                      disabled={saving || !reportTitle.trim()}
                      style={{
                        ...btnPrimary,
                        padding: "8px 18px",
                        opacity: saving ? 0.6 : 1,
                        fontSize: "0.82rem",
                      }}
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ComparePage;
