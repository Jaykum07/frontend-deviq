import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutApi } from "../api/authApi";
import useAuth from "../hooks/useAuth";
import { font } from "../theme";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try { await logoutApi(); } catch (err) {
      console.error("Logout failed:", err);
      alert("logout failed.");
    }
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Home"    },
    { path: "/compare",   label: "Compare" },
    { path: "/reports",   label: "Reports" },
    { path: "/guide",     label: "Guide"   },
  ];

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/dashboard" && location.pathname.startsWith(path));

  return (
    <>
      <style>{`
        .nav-link { transition: all 0.15s; }
        .nav-link:hover { color: #e6edf3 !important; background: #21262d !important; }
        .nav-logout:hover { color: #f85149 !important; border-color: #f85149 !important; }
        .profile-btn:hover {
          border-color: #58a6ff !important;
          color: #58a6ff !important;
          background: rgba(88,166,255,0.12) !important;
        }
        .hamburger { display: none; }
        .desktop-only { display: flex; }
        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-drawer { display: none !important; }
        }
        .mobile-link { transition: background 0.15s; }
        .mobile-link:hover { background: #21262d !important; }
      `}</style>

      <nav style={{
        position:        "sticky",
        top:             0,
        zIndex:          100,
        backgroundColor: "#161b22",
        borderBottom:    "1px solid #30363d",
        fontFamily:      font.family,
      }}>
        <div style={{
          maxWidth:       "1100px",
          margin:         "0 auto",
          padding:        "0 1.5rem",
          height:         "64px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "1rem",
        }}>

          {/* ── Logo ── */}
          <Link to="/dashboard" style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "10px",
            textDecoration: "none",
            flexShrink:     0,
          }}>
            <div style={{
              width:           "36px",
              height:          "36px",
              borderRadius:    "10px",
              overflow:        "hidden",
              border:          "1.5px solid #30363d",
              flexShrink:      0,
            }}>
              <img src="/deviqlogo.jpg" alt="DevIQ"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{
              fontSize:      "1.15rem",
              fontWeight:    "700",
              color:         "#e6edf3",
              letterSpacing: "-0.3px",
            }}>
              Dev<span style={{ color: "#58a6ff" }}>IQ</span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="desktop-only" style={{
            alignItems: "center",
            gap:        "2px",
            flex:       1,
            justifyContent: "center",
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link"
                style={{
                  padding:        "7px 14px",
                  borderRadius:   "8px",
                  fontSize:       "0.875rem",
                  fontWeight:     "500",
                  textDecoration: "none",
                  color:          isActive(link.path) ? "#58a6ff" : "#8b949e",
                  backgroundColor:isActive(link.path) ? "rgba(88,166,255,0.1)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right side ── */}
          <div className="desktop-only" style={{
            alignItems: "center",
            gap:        "8px",
            flexShrink: 0,
          }}>

            {/* Profile button */}
            <button
              onClick={() => navigate("/profile")}
              className="profile-btn"
              title={user?.name}
              style={{
                display:         "flex",
                alignItems:      "center",
                gap:             "8px",
                backgroundColor: location.pathname === "/profile"
                  ? "rgba(88,166,255,0.1)" : "#21262d",
                border:          `1px solid ${location.pathname === "/profile"
                  ? "#58a6ff" : "#30363d"}`,
                borderRadius:    "10px",
                padding:         "6px 12px 6px 6px",
                cursor:          "pointer",
                fontFamily:      font.family,
                color:           location.pathname === "/profile"
                  ? "#58a6ff" : "#8b949e",
                transition:      "all 0.15s",
              }}
            >
              {/* Avatar circle */}
              <div style={{
                width:           "26px",
                height:          "26px",
                borderRadius:    "50%",
                backgroundColor: "rgba(88,166,255,0.2)",
                border:          "1px solid rgba(88,166,255,0.4)",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "0.75rem",
                fontWeight:      "700",
                color:           "#58a6ff",
                fontFamily:      font.mono,
                flexShrink:      0,
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{
                fontSize:     "0.82rem",
                fontWeight:   "500",
                maxWidth:     "100px",
                overflow:     "hidden",
                textOverflow: "ellipsis",
                whiteSpace:   "nowrap",
              }}>
                {user?.name?.split(" ")[0]}
              </span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="nav-logout"
              style={{
                backgroundColor: "transparent",
                color:           "#8b949e",
                border:          "1px solid #30363d",
                borderRadius:    "8px",
                padding:         "7px 14px",
                fontSize:        "0.82rem",
                fontWeight:      "500",
                cursor:          "pointer",
                fontFamily:      font.family,
                transition:      "all 0.15s",
                display:         "flex",
                alignItems:      "center",
                gap:             "6px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>

          {/* ── Mobile right ── */}
          <div style={{
            display:    "flex",
            alignItems: "center",
            gap:        "10px",
          }}>
            {/* Mobile profile avatar */}
            <button
              onClick={() => navigate("/profile")}
              className="hamburger profile-btn"
              style={{
                width:           "36px",
                height:          "36px",
                borderRadius:    "50%",
                backgroundColor: "rgba(88,166,255,0.15)",
                border:          "1px solid rgba(88,166,255,0.3)",
                display:         "none",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "0.85rem",
                fontWeight:      "700",
                color:           "#58a6ff",
                cursor:          "pointer",
                fontFamily:      font.mono,
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hamburger"
              style={{
                width:           "36px",
                height:          "36px",
                display:         "none",
                alignItems:      "center",
                justifyContent:  "center",
                backgroundColor: "transparent",
                border:          "1px solid #30363d",
                borderRadius:    "8px",
                cursor:          "pointer",
                color:           "#8b949e",
                transition:      "all 0.15s",
              }}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6"  y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="3" y1="7"  x2="21" y2="7"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="17" x2="21" y2="17"/>
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div
            className="mobile-drawer"
            style={{
              borderTop:       "1px solid #30363d",
              backgroundColor: "#161b22",
              padding:         "0.75rem",
              animation:       "fadeIn 0.15s ease",
            }}
          >
            {/* Nav links */}
            <div style={{ marginBottom: "0.5rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="mobile-link"
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            "10px",
                    padding:        "11px 12px",
                    borderRadius:   "8px",
                    fontSize:       "0.9rem",
                    fontWeight:     "500",
                    textDecoration: "none",
                    color:          isActive(link.path) ? "#58a6ff" : "#8b949e",
                    backgroundColor:isActive(link.path)
                      ? "rgba(88,166,255,0.1)" : "transparent",
                    marginBottom:   "2px",
                  }}
                >
                  {/* Active dot */}
                  <div style={{
                    width:           "6px",
                    height:          "6px",
                    borderRadius:    "50%",
                    backgroundColor: isActive(link.path) ? "#58a6ff" : "#30363d",
                    flexShrink:      0,
                  }} />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider + user row */}
            <div style={{
              borderTop:   "1px solid #30363d",
              paddingTop:  "0.75rem",
              display:     "flex",
              alignItems:  "center",
              gap:         "10px",
            }}>
              {/* Avatar */}
              <div style={{
                width:           "34px",
                height:          "34px",
                borderRadius:    "50%",
                backgroundColor: "rgba(88,166,255,0.15)",
                border:          "1px solid rgba(88,166,255,0.3)",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "0.85rem",
                fontWeight:      "700",
                color:           "#58a6ff",
                fontFamily:      font.mono,
                flexShrink:      0,
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name + email */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize:     "0.875rem",
                  fontWeight:   "600",
                  color:        "#e6edf3",
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace:   "nowrap",
                }}>
                  {user?.name}
                </p>
                <p style={{
                  fontSize:     "0.75rem",
                  color:        "#6e7681",
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace:   "nowrap",
                }}>
                  {user?.email}
                </p>
              </div>

              {/* Logout icon button */}
              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  width:           "34px",
                  height:          "34px",
                  borderRadius:    "8px",
                  backgroundColor: "rgba(248,81,73,0.1)",
                  border:          "1px solid rgba(248,81,73,0.3)",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  cursor:          "pointer",
                  color:           "#f85149",
                  flexShrink:      0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;