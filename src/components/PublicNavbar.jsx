import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { font } from "../theme";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        .pub-link { transition: color 0.15s; }
        .pub-link:hover { color: #e6edf3 !important; }
        .pub-btn-outline:hover {
          background: rgba(88,166,255,0.1) !important;
          border-color: #58a6ff !important;
          color: #58a6ff !important;
        }
        .pub-hamburger { display: none; }
        .pub-desktop   { display: flex;  }
        @media (max-width: 768px) {
          .pub-hamburger { display: flex !important; }
          .pub-desktop   { display: none !important; }
        }
        @media (min-width: 769px) {
          .pub-mobile-menu { display: none !important; }
        }
        .pub-mobile-link:hover { background: #21262d !important; }
      `}</style>

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "rgba(13,17,23,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #21262d",
          fontFamily: font.family,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1.5px solid #30363d",
              }}
            >
              <img
                src="/deviqlogo.jpg"
                alt="DevIQ"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span
              style={{
                fontSize: "1.15rem",
                fontWeight: "700",
                color: "#e6edf3",
                letterSpacing: "-0.3px",
              }}
            >
              Dev<span style={{ color: "#58a6ff" }}>IQ</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            className="pub-desktop"
            style={{ alignItems: "center", gap: "4px" }}
          >
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Scoring", href: "#scoring" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="pub-link"
                style={{
                  padding: "7px 14px",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  color: "#8b949e",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div
            className="pub-desktop"
            style={{ alignItems: "center", gap: "8px" }}
          >
            <button
              onClick={() => navigate("/login")}
              className="pub-btn-outline"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #30363d",
                borderRadius: "8px",
                padding: "7px 16px",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#8b949e",
                cursor: "pointer",
                fontFamily: font.family,
                transition: "all 0.15s",
              }}
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{
                backgroundColor: "#1f6feb",
                border: "none",
                borderRadius: "8px",
                padding: "7px 18px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#ffffff",
                cursor: "pointer",
                fontFamily: font.family,
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#388bfd")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1f6feb")}
            >
              Get started free
            </button>
          </div>

          {/* Mobile right */}
          <div 
          className="pub-hamburger"
          style={{ alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="pub-hamburger"
              style={{
                width: "36px",
                height: "36px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                border: "1px solid #30363d",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#8b949e",
              }}
            >
              {mobileOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="pub-mobile-menu"
            style={{
              borderTop: "1px solid #21262d",
              backgroundColor: "rgba(13,17,23,0.98)",
              padding: "0.75rem",
              animation: "fadeIn 0.15s ease",
            }}
          >
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Scoring", href: "#scoring" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="pub-mobile-link"
                style={{
                  display: "block",
                  padding: "11px 12px",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  color: "#8b949e",
                  marginBottom: "2px",
                }}
              >
                {item.label}
              </a>
            ))}
            <div
              style={{
                display: "flex",
                gap: "8px",
                paddingTop: "0.75rem",
                borderTop: "1px solid #21262d",
                marginTop: "0.5rem",
              }}
            >
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  border: "1px solid #30363d",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "0.875rem",
                  color: "#8b949e",
                  cursor: "pointer",
                  fontFamily: font.family,
                }}
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setMobileOpen(false);
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#1f6feb",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontFamily: font.family,
                }}
              >
                Get started free
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default PublicNavbar;
