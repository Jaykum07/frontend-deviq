import { colors, font, card, btnPrimary, btnSecondary } from "../../theme";

const ProfileHeader = ({ profile, username, metrics, onSave, reportSaved }) => {
  return (
    <div
      style={{
        ...card,
        borderRadius: "14px",
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginBottom: "1.25rem",
      }}
    >
      {/* Avatar */}
      <img
        src={profile.avatarUrl}
        alt={username}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover",
          border: `3px solid ${colors.border}`,
          flexShrink: 0,
        }}
      />

      {/* Info */}
      <div style={{ flex: 1, minWidth: "200px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "4px",
          }}
        >
          <h1
            style={{
              fontSize: "1.4rem",
              fontWeight: "700",
              color: colors.textPrimary,
            }}
          >
            {profile.name || username}
          </h1>
          <span
            style={{
              fontSize: "0.82rem",
              color: colors.textMuted,
              fontFamily: font.mono,
            }}
          >
            @{username}
          </span>
        </div>

        {profile.bio && (
          <p
            style={{
              fontSize: "0.875rem",
              color: colors.textSecondary,
              marginBottom: "10px",
            }}
          >
            {profile.bio}
          </p>
        )}

        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {profile.location && (
            <span style={{ fontSize: "0.78rem", color: colors.textMuted }}>
              📍 {profile.location}
            </span>
          )}
          <span style={{ fontSize: "0.78rem", color: colors.textMuted }}>
            👥 {profile.followers?.toLocaleString()} followers
          </span>
          <span style={{ fontSize: "0.78rem", color: colors.textMuted }}>
            📁 {profile.publicRepos} repos
          </span>
          <span style={{ fontSize: "0.78rem", color: colors.textMuted }}>
            📅 {metrics?.accountAgeInDays} days on GitHub
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          style={{
            ...btnSecondary,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        <button
          onClick={() => {
            if (!reportSaved) onSave();
          }}
          disabled={reportSaved}
          style={{
            ...btnPrimary,
            display: "flex",
            alignItems: "center",
            gap: "6px",
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
              Saved
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
              Save Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
