import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReportCard from "../components/reports/ReportCard";
import ReportDetail from "../components/reports/ReportDetail";
import EmptyReports from "../components/reports/EmptyReports";
import {
  getReportsApi,
  deleteReportApi,
  getOneReportApi,
} from "../api/reportApi";
import { colors, font, card } from "../theme";

// ── Skeleton loader ───────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div
    className="animate-pulse"
    style={{
      height: "110px",
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "12px",
    }}
  />
);

// ── Stats bar ─────────────────────────────────────────────────────────────────
const StatsBar = ({ reports }) => {
  const single = reports.filter((r) => r.type === "single").length;
  const comparison = reports.filter((r) => r.type === "comparison").length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      {[
        { label: "Total reports", value: reports.length, accent: colors.blue },
        { label: "Single analysis", value: single, accent: colors.green },
        {
          label: "Comparison reports",
          value: comparison,
          accent: colors.purple,
        },
      ].map((s) => (
        <div
          key={s.label}
          style={{
            ...card,
            borderRadius: "10px",
            borderTop: `2px solid ${s.accent}`,
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "1.6rem",
              fontWeight: "700",
              color: colors.textPrimary,
              fontFamily: font.mono,
              marginBottom: "4px",
            }}
          >
            {s.value}
          </p>
          <p
            style={{
              fontSize: "0.72rem",
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReport, setActiveReport] = useState(null);
  const [filter, setFilter] = useState("all");
  // filter: 'all' | 'single' | 'comparison'

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await getReportsApi();
      setReports(res.data.reports || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (report) => {
    try {
      // Fetch full report with snapshot
      const res = await getOneReportApi(report._id);
      setActiveReport(res.data.report);
    } catch (err) {
      console.error(err);
      setActiveReport(report);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReportApi(id);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete report. Please trye again.");
      console.error(err);
    }
  };

  // Filtered reports
  const filtered = reports.filter((r) => {
    if (filter === "all") return true;
    if (filter === "single") return r.type === "single";
    if (filter === "comparison") return r.type === "comparison";
    return true;
  });

  const filterBtnStyle = (f) => ({
    padding: "6px 16px",
    borderRadius: "8px",
    fontSize: "0.82rem",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    fontFamily: font.family,
    transition: "all 0.15s",
    backgroundColor: filter === f ? `${colors.blue}20` : "transparent",
    color: filter === f ? colors.blue : colors.textSecondary,
  });

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .reports-grid { grid-template-columns: 1fr !important; }
          .stats-grid   { grid-template-columns: 1fr 1fr !important; }
          .stats-grid > div:last-child { grid-column: 1 / -1; }
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
            maxWidth: "900px",
            margin: "0 auto",
            padding: "2rem 1.25rem",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
              animation: "fadeIn 0.4s ease",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: colors.textPrimary,
                  marginBottom: "6px",
                  letterSpacing: "-0.3px",
                }}
              >
                Saved reports
              </h1>
              <p style={{ fontSize: "0.9rem", color: colors.textMuted }}>
                All your saved analysis and comparison reports
              </p>
            </div>
          </div>

          {/* Stats bar */}
          {!loading && reports.length > 0 && (
            <div className="stats-grid">
              <StatsBar reports={reports} />
            </div>
          )}

          {/* Filter tabs */}
          {!loading && reports.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "4px",
                marginBottom: "1.25rem",
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "10px",
                padding: "4px",
                width: "fit-content",
                animation: "fadeIn 0.4s ease",
              }}
            >
              {[
                { key: "all", label: `All (${reports.length})` },
                {
                  key: "single",
                  label: `Single (${
                    reports.filter((r) => r.type === "single").length
                  })`,
                },
                {
                  key: "comparison",
                  label: `Comparison (${
                    reports.filter((r) => r.type === "comparison").length
                  })`,
                },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={filterBtnStyle(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && reports.length === 0 && <EmptyReports />}

          {/* No results after filter */}
          {!loading && reports.length > 0 && filtered.length === 0 && (
            <div
              style={{
                ...card,
                borderRadius: "12px",
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <p style={{ color: colors.textMuted, fontSize: "0.875rem" }}>
                No {filter} reports found
              </p>
            </div>
          )}

          {/* Reports grid */}
          {!loading && filtered.length > 0 && (
            <div
              className="reports-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
                animation: "fadeIn 0.4s ease",
              }}
            >
              {filtered.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Report detail modal */}
      {activeReport && (
        <ReportDetail
          report={activeReport}
          onClose={() => setActiveReport(null)}
        />
      )}
    </>
  );
};

export default ReportsPage;
