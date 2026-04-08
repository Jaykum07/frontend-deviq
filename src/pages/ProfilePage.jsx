import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { updateProfileApi, changePasswordApi } from "../api/authApi";
import { getHistoryApi } from "../api/historyApi";
import { getReportsApi } from "../api/reportApi";
import { colors, font, btnPrimary } from "../theme";

// ── Reusable input ────────────────────────────────────────────────────────────
const Input = ({ label, type = "text", value, onChange, disabled, placeholder }) => (
  <div style={{ marginBottom: "1rem" }}>
    <label style={{
      display:      "block",
      fontSize:     "0.78rem",
      fontWeight:   "600",
      color:        colors.textMuted,
      marginBottom: "6px",
      textTransform:"uppercase",
      letterSpacing:"0.05em",
    }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      style={{
        width:           "100%",
        backgroundColor: disabled ? colors.surface2 : colors.bg,
        border:          `1px solid ${colors.border}`,
        borderRadius:    "8px",
        padding:         "10px 14px",
        color:           disabled ? colors.textMuted : colors.textPrimary,
        fontSize:        "0.875rem",
        outline:         "none",
        boxSizing:       "border-box",
        fontFamily:      font.family,
        cursor:          disabled ? "not-allowed" : "text",
        transition:      "border-color 0.2s",
      }}
      onFocus={(e) => { if (!disabled) e.target.style.borderColor = colors.blue; }}
      onBlur={(e)  => { if (!disabled) e.target.style.borderColor = colors.border; }}
    />
  </div>
);

// ── Alert ─────────────────────────────────────────────────────────────────────
const Alert = ({ type, msg }) => {
  if (!msg) return null;
  const isErr = type === "error";
  return (
    <div style={{
      backgroundColor: isErr ? "rgba(248,81,73,0.1)"  : "rgba(63,185,80,0.1)",
      border:          `1px solid ${isErr ? "rgba(248,81,73,0.4)" : "rgba(63,185,80,0.4)"}`,
      color:           isErr ? colors.red : colors.green,
      borderRadius:    "8px",
      padding:         "10px 14px",
      fontSize:        "0.82rem",
      marginBottom:    "1rem",
      display:         "flex",
      alignItems:      "center",
      gap:             "8px",
    }}>
      <span>{isErr ? "✕" : "✓"}</span>
      {msg}
    </div>
  );
};

// ── Section wrapper ───────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{
    backgroundColor: colors.surface,
    border:          `1px solid ${colors.border}`,
    borderRadius:    "14px",
    padding:         "1.5rem",
    marginBottom:    "1rem",
    ...style,
  }}>
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div style={{ marginBottom: "1.25rem" }}>
    <h2 style={{
      fontSize:   "0.95rem",
      fontWeight: "600",
      color:      colors.textPrimary,
      marginBottom: subtitle ? "4px" : 0,
    }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: "0.78rem", color: colors.textMuted }}>
        {subtitle}
      </p>
    )}
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const navigate        = useNavigate();
  const { user, login, logout } = useAuth();

  const [name,       setName]       = useState(user?.name || "");
  const [nameSaving, setNameSaving] = useState(false);
  const [nameAlert,  setNameAlert]  = useState({ type: "", msg: "" });

  const [curPwd,    setCurPwd]    = useState("");
  const [newPwd,    setNewPwd]    = useState("");
  const [conPwd,    setConPwd]    = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdAlert,  setPwdAlert]  = useState({ type: "", msg: "" });

  const [stats, setStats] = useState({ searches: 0, reports: 0 });

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    try {
      const [h, r] = await Promise.all([getHistoryApi(1, 100), getReportsApi()]);
      setStats({
        searches: h.data.pagination?.totalRecords || 0,
        reports:  r.data.count || 0,
      });
    } catch (err) {
        console.error("Failed to load stats:", err);
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!name.trim() || name.trim() === user?.name) return;
    setNameSaving(true);
    setNameAlert({ type: "", msg: "" });
    try {
      const res = await updateProfileApi(name.trim());
      login(res.data.user, localStorage.getItem("accessToken"));
      setNameAlert({ type: "success", msg: "Name updated successfully" });
    } catch (err) {
      setNameAlert({ type: "error", msg: err.response?.data?.message || "Failed to update" });
    } finally { setNameSaving(false); }
  };

  const handleChangePwd = async (e) => {
    e.preventDefault();
    setPwdAlert({ type: "", msg: "" });
    if (!curPwd || !newPwd || !conPwd) {
      setPwdAlert({ type: "error", msg: "Please fill all fields" }); return;
    }
    if (newPwd.length < 6) {
      setPwdAlert({ type: "error", msg: "New password must be at least 6 characters" }); return;
    }
    if (newPwd !== conPwd) {
      setPwdAlert({ type: "error", msg: "Passwords do not match" }); return;
    }
    setPwdSaving(true);
    try {
      await changePasswordApi(curPwd, newPwd);
      setPwdAlert({ type: "success", msg: "Password changed successfully" });
      setCurPwd(""); setNewPwd(""); setConPwd("");
    } catch (err) {
      setPwdAlert({ type: "error", msg: err.response?.data?.message || "Failed to change password" });
    } finally { setPwdSaving(false); }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric",
      })
    : "—";

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .stats-row    { grid-template-columns: 1fr 1fr !important; }
          .stats-row > div:last-child { grid-column: 1 / -1; }
        }
      `}</style>

      <div style={{
        minHeight:       "100vh",
        backgroundColor: colors.bg,
        fontFamily:      font.family,
      }}>
        <Navbar />

        <div style={{
          maxWidth: "760px",
          margin:   "0 auto",
          padding:  "2rem 1.25rem 4rem",
        }}>

          {/* ── Page header ── */}
          <div style={{ marginBottom: "2rem", animation: "fadeIn 0.4s ease" }}>
            <h1 style={{
              fontSize:      "1.75rem",
              fontWeight:    "700",
              color:         colors.textPrimary,
              marginBottom:  "4px",
              letterSpacing: "-0.3px",
            }}>
              My profile
            </h1>
            <p style={{ fontSize: "0.875rem", color: colors.textMuted }}>
              Manage your account information and security settings
            </p>
          </div>

          {/* ── Profile overview card ── */}
          <Card style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{
              display:     "flex",
              gap:         "1.25rem",
              alignItems:  "center",
              flexWrap:    "wrap",
              marginBottom:"1.5rem",
            }}>
              {/* Big avatar */}
              <div style={{
                width:           "72px",
                height:          "72px",
                borderRadius:    "18px",
                backgroundColor: "rgba(88,166,255,0.15)",
                border:          "2px solid rgba(88,166,255,0.3)",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "1.6rem",
                fontWeight:      "700",
                color:           colors.blue,
                fontFamily:      font.mono,
                flexShrink:      0,
              }}>
                {initials}
              </div>

              {/* Name + email + badge */}
              <div style={{ flex: 1, minWidth: "180px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                  <h2 style={{
                    fontSize:   "1.15rem",
                    fontWeight: "700",
                    color:      colors.textPrimary,
                  }}>
                    {user?.name}
                  </h2>
                  <span style={{
                    backgroundColor: "rgba(63,185,80,0.15)",
                    border:          "1px solid rgba(63,185,80,0.3)",
                    color:           colors.green,
                    borderRadius:    "20px",
                    padding:         "2px 10px",
                    fontSize:        "0.68rem",
                    fontWeight:      "600",
                    textTransform:   "uppercase",
                    letterSpacing:   "0.05em",
                  }}>
                    Recruiter
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: colors.textMuted, marginBottom: "4px" }}>
                  {user?.email}
                </p>
                <p style={{ fontSize: "0.75rem", color: colors.textFaint }}>
                  Member since {memberSince}
                </p>
              </div>

              {/* Quick action */}
              <button
                onClick={() => navigate("/guide")}
                style={{
                  backgroundColor: "transparent",
                  border:          `1px solid ${colors.border}`,
                  borderRadius:    "8px",
                  padding:         "7px 14px",
                  fontSize:        "0.78rem",
                  color:           colors.textSecondary,
                  cursor:          "pointer",
                  fontFamily:      font.family,
                  display:         "flex",
                  alignItems:      "center",
                  gap:             "6px",
                  flexShrink:      0,
                  transition:      "all 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.blue}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                How it works
              </button>
            </div>

            {/* Stats row */}
            <div
              className="stats-row"
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap:                 "10px",
                paddingTop:          "1.25rem",
                borderTop:           `1px solid ${colors.border}`,
              }}
            >
              {[
                { label: "Total searches", value: stats.searches, color: colors.blue,   icon: "🔍" },
                { label: "Saved reports",  value: stats.reports,  color: colors.purple, icon: "📄" },
                { label: "Account type",   value: "Recruiter",    color: colors.green,  icon: "👤" },
              ].map((s) => (
                <div key={s.label} style={{
                  backgroundColor: colors.surface2,
                  borderRadius:    "10px",
                  padding:         "12px 14px",
                  textAlign:       "center",
                }}>
                  <div style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{s.icon}</div>
                  <p style={{
                    fontSize:   "1.35rem",
                    fontWeight: "700",
                    color:      s.color,
                    fontFamily: font.mono,
                    lineHeight: 1,
                    marginBottom:"4px",
                  }}>
                    {s.value}
                  </p>
                  <p style={{
                    fontSize:      "0.68rem",
                    color:         colors.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* ── Two column layout on desktop ── */}
          <div
            className="profile-grid"
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 "1rem",
              alignItems:          "start",
            }}
          >
            {/* ── Edit name ── */}
            <Card>
              <SectionTitle
                title="Edit name"
                subtitle="Update your display name"
              />
              <form onSubmit={handleUpdateName}>
                <Alert type={nameAlert.type} msg={nameAlert.msg} />
                <Input
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
                <Input
                  label="Email address"
                  value={user?.email || ""}
                  disabled
                />
                <button
                  type="submit"
                  disabled={nameSaving || name.trim() === user?.name}
                  style={{
                    ...btnPrimary,
                    width:   "100%",
                    padding: "10px",
                    opacity: nameSaving || name.trim() === user?.name ? 0.5 : 1,
                    cursor:  nameSaving || name.trim() === user?.name
                      ? "not-allowed" : "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  {nameSaving ? "Saving..." : "Save changes"}
                </button>
              </form>
            </Card>

            {/* ── Change password ── */}
            <Card>
              <SectionTitle
                title="Change password"
                subtitle="Use at least 6 characters"
              />
              <form onSubmit={handleChangePwd}>
                <Alert type={pwdAlert.type} msg={pwdAlert.msg} />
                <Input
                  label="Current password"
                  type="password"
                  value={curPwd}
                  onChange={(e) => setCurPwd(e.target.value)}
                  placeholder="••••••••"
                />
                <Input
                  label="New password"
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Min 6 characters"
                />
                <Input
                  label="Confirm password"
                  type="password"
                  value={conPwd}
                  onChange={(e) => setConPwd(e.target.value)}
                  placeholder="Repeat password"
                />
                <button
                  type="submit"
                  disabled={pwdSaving}
                  style={{
                    ...btnPrimary,
                    width:   "100%",
                    padding: "10px",
                    opacity: pwdSaving ? 0.6 : 1,
                    fontSize:"0.875rem",
                  }}
                >
                  {pwdSaving ? "Updating..." : "Update password"}
                </button>
              </form>
            </Card>
          </div>

          {/* ── Quick links row ── */}
          <div style={{
            display:   "flex",
            gap:       "10px",
            flexWrap:  "wrap",
            margin:    "1rem 0",
          }}>
            {[
              { label: "Go to dashboard",      path: "/dashboard", color: colors.blue   },
              { label: "View my reports",      path: "/reports",   color: colors.purple },
              { label: "Compare developers",   path: "/compare",   color: colors.green  },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  backgroundColor: "transparent",
                  border:          `1px solid ${colors.border}`,
                  borderRadius:    "8px",
                  padding:         "8px 16px",
                  fontSize:        "0.82rem",
                  color:           colors.textSecondary,
                  cursor:          "pointer",
                  fontFamily:      font.family,
                  transition:      "all 0.15s",
                  display:         "flex",
                  alignItems:      "center",
                  gap:             "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.color       = item.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color       = colors.textSecondary;
                }}
              >
                {item.label} →
              </button>
            ))}
          </div>

          {/* ── Danger zone ── */}
          <Card style={{ borderColor: "rgba(248,81,73,0.3)" }}>
            <div style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              flexWrap:       "wrap",
              gap:            "1rem",
            }}>
              <div>
                <h2 style={{
                  fontSize:     "0.95rem",
                  fontWeight:   "600",
                  color:        colors.red,
                  marginBottom: "4px",
                }}>
                  Sign out
                </h2>
                <p style={{ fontSize: "0.78rem", color: colors.textMuted }}>
                  You will be signed out on this device
                </p>
              </div>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                style={{
                  backgroundColor: "rgba(248,81,73,0.1)",
                  border:          "1px solid rgba(248,81,73,0.4)",
                  borderRadius:    "8px",
                  padding:         "8px 18px",
                  fontSize:        "0.875rem",
                  fontWeight:      "500",
                  color:           colors.red,
                  cursor:          "pointer",
                  fontFamily:      font.family,
                  display:         "flex",
                  alignItems:      "center",
                  gap:             "8px",
                  transition:      "all 0.15s",
                  flexShrink:      0,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(248,81,73,0.2)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(248,81,73,0.1)"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign out
              </button>
            </div>
          </Card>

        </div>
      </div>
    </>
  );
};

export default ProfilePage;