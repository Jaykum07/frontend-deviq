import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar        from '../components/Navbar';
import ProfileHeader from '../components/analyze/ProfileHeader';
import TabNav        from '../components/analyze/TabNav';
import OverviewTab   from '../components/analyze/OverviewTab';
import ReposTab      from  '../components/analyze/ReposTab';
import AnalysisTab   from '../components/analyze/AnalysisTab';
import RepoDetailModal from '../components/modals/RepoDetailModal';
import SaveReportModal from '../components/modals/SaveReportModal';
import { analyzeUserApi }  from '../api/githubApi';
import { colors, font, card, btnPrimary } from '../theme';
import { buildActivityData } from '../utils/analyzeHelpers';

// ── Loading skeleton ──────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.25rem' }}>
    {[100, 180, 80, 320, 200].map((h, i) => (
      <div
        key={i}
        className="animate-pulse"
        style={{
          height: `${h}px`,
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          marginBottom: '1rem',
        }}
      />
    ))}
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const AnalyzePage = () => {
  const { username } = useParams();
  const navigate     = useNavigate();

  const [analysis,   setAnalysis]   = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [activeTab,  setActiveTab]  = useState('overview');
  const [activeRepo, setActiveRepo] = useState(null);
  const [showSave,   setShowSave]   = useState(false);
  const [savedMsg,   setSavedMsg]   = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await analyzeUserApi(username);
        setAnalysis(res.data.analysis);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          `Could not find GitHub user "${username}"`
        );
      } finally {
        setLoading(false);
      }
    };
    
    if (username) fetchAnalysis();
  }, [username]);

  
  
  const handleSaved = () => {
    setShowSave(false);
    setSavedMsg('Report saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const profile  = analysis?.profile      || {};
  const scores   = analysis?.scores       || {};
  const metrics  = analysis?.metrics      || {};
  const repos    = analysis?.repositories || [];

  const langData = Object.entries(metrics.languageDistribution || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const topRepoData = [...repos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 8)
    .filter((r) => r.stars > 0)
    .map((r) => ({ name: r.name, value: r.stars }));

  const activityData = buildActivityData(repos);

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .score-grid    { grid-template-columns: 1fr !important; }
          .metrics-grid  { grid-template-columns: 1fr 1fr !important; }
          .repo-hide     { display: none !important; }
          .analysis-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.bg,
        fontFamily: font.family,
      }}>
        <Navbar />

        {/* Loading */}
        
        {loading && <LoadingSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div style={{
            maxWidth: '900px', margin: '3rem auto',
            padding: '0 1.25rem', textAlign: 'center',
          }}>
            <div style={{
              ...card, borderRadius: '14px', padding: '3rem',
              borderColor: `${colors.red}40`,
            }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
              <h2 style={{
                fontSize: '1.25rem', fontWeight: '600',
                color: colors.textPrimary, marginBottom: '8px',
              }}>
                Profile not found
              </h2>
              <p style={{
                color: colors.textMuted,
                marginBottom: '1.5rem', fontSize: '0.9rem',
              }}>
                {error}
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                style={btnPrimary}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        {!loading && !error && analysis && (
          <div style={{
            maxWidth: '900px', margin: '0 auto',
            padding: '2rem 1.25rem',
            animation: 'fadeIn 0.4s ease',
          }}>

            {/* Success toast */}
            {savedMsg && (
              <div style={{
                position: 'fixed', top: '80px', right: '20px',
                backgroundColor: colors.green, color: '#000',
                borderRadius: '8px', padding: '10px 18px',
                fontSize: '0.875rem', fontWeight: '600',
                zIndex: 150, animation: 'fadeIn 0.3s ease',
              }}>
                ✓ {savedMsg}
              </div>
            )}

            {/* Profile header */}
            <ProfileHeader
              profile={profile}
              username={username}
              metrics={metrics}
              onSave={() => setShowSave(true)}
            />

            {/* Tab navigation */}
            <TabNav
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* Tab content */}
            {activeTab === 'overview' && (
              <OverviewTab
                scores={scores}
                metrics={metrics}
                langData={langData}
              />
            )}

            {activeTab === 'repos' && (
              <ReposTab
                repos={repos}
                onRepoClick={setActiveRepo}
              />
            )}

            {activeTab === 'analysis' && (
              <AnalysisTab
                repos={repos}
                metrics={metrics}
                langData={langData}
                topRepoData={topRepoData}
                activityData={activityData}
              />
            )}

          </div>
        )}

        {/* Modals */}
        {activeRepo && (
          <RepoDetailModal
            repo={activeRepo}
            onClose={() => setActiveRepo(null)}
          />
        )}

        {showSave && (
          <SaveReportModal
            analysisId={analysis?._id}
            username={username}
            onClose={() => setShowSave(false)}
            onSaved={handleSaved}
          />
        )}
      </div>
    </>
  );
};

export default AnalyzePage;
