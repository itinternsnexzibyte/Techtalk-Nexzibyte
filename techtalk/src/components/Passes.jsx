import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, ShieldCheck, Zap, Ticket, Sparkles, QrCode, Lock, CheckCircle2 } from "lucide-react";
import { PASSES } from "../data/mockData.js";
import { useApp } from "../context/AppContext.jsx";

export default function Passes() {
  const { openPassModal } = useApp();
  const navigate = useNavigate();

  const getPassTheme = (id) => {
    switch (id) {
      case "visitor-pass": return "theme-visitor";
      case "student-pass": return "theme-student";
      case "founder-pass": return "theme-founder";
      case "delegation-pass":
      case "delegate-pass": return "theme-delegation";
      default: return "theme-founder";
    }
  };

  const getAdmitNum = (index) => {
    return `0${index + 1}`;
  };

  return (
    <section 
      className="passes-section" 
      id="passes" 
      style={{ 
        background: "linear-gradient(180deg, #FAF8FF 0%, #FFFFFF 50%, #FAF8FF 100%)",
        color: "#000000",
        minHeight: "100vh",
        paddingTop: "90px",
        paddingBottom: "90px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Dynamic Ambient Glowing Nebula Lights */}
      <div 
        aria-hidden="true" 
        style={{ 
          position: "absolute", 
          inset: 0, 
          pointerEvents: "none", 
          zIndex: 0,
          overflow: "hidden" 
        }}
      >
        <div 
          style={{ 
            position: "absolute", 
            top: "-10%", 
            left: "15%", 
            width: "550px", 
            height: "550px", 
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(236, 72, 153, 0.06) 50%, transparent 70%)", 
            filter: "blur(90px)", 
            borderRadius: "50%" 
          }} 
        />
        <div 
          style={{ 
            position: "absolute", 
            top: "30%", 
            right: "-5%", 
            width: "500px", 
            height: "500px", 
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.10) 0%, rgba(254, 215, 170, 0.06) 50%, transparent 70%)", 
            filter: "blur(100px)", 
            borderRadius: "50%" 
          }} 
        />
        <div 
          style={{ 
            position: "absolute", 
            bottom: "5%", 
            left: "-5%", 
            width: "520px", 
            height: "520px", 
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(0, 166, 153, 0.06) 50%, transparent 70%)", 
            filter: "blur(95px)", 
            borderRadius: "50%" 
          }} 
        />
        {/* Subtle Cyber Perspective Grid Texture */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(124, 58, 237, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.85) 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.85) 0%, transparent 80%)"
          }}
        />
      </div>

      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        {/* Header Block */}
        <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 56px auto", padding: "0 16px" }}>
          <div 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              background: "#FFFFFF",
              border: "1.5px solid #DDD6FE",
              color: "#6D28D9",
              fontSize: "0.8125rem",
              fontWeight: 750,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(109, 40, 217, 0.08)"
            }}
          >
            <Sparkles size={14} style={{ color: "#F59E0B" }} />
            <span>Official Accreditation Tiers</span>
          </div>

          <h1 
            style={{
              fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
              fontWeight: 900,
              color: "#000000",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              lineHeight: 1.15
            }}
          >
            Choose Your <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #2563EB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TechTalk Pass</span>
          </h1>
          <p 
            style={{
              fontSize: "clamp(1.02rem, 1.25vw, 1.2rem)",
              color: "#4B5563",
              lineHeight: 1.7,
              margin: "0 auto",
              maxWidth: "700px"
            }}
          >
            Four tailored accreditation paths designed for Students, Founders, Community Visitors, and Corporate Delegations.
          </p>
        </div>

        {/* 3D Holographic Tickets Grid */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            justifyItems: "center",
            alignItems: "stretch",
            maxWidth: "1360px",
            margin: "0 auto",
            padding: "0 16px"
          }}
        >
          {PASSES.map((pass, index) => {
            const themeClass = getPassTheme(pass.id);
            const admitNum = getAdmitNum(index);

            return (
              <div
                key={pass.id}
                className={`ticket-wrapper ${themeClass}`}
                onClick={() => openPassModal(pass.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openPassModal(pass.id)}
                aria-label={`Claim ${pass.type}`}
              >
                <div className="ticket modern-pass-card">
                  {/* Glowing ambient background header */}
                  <div className="modern-pass-header">
                    <div className="modern-pass-brand">
                      <div className="modern-pass-icon-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <span className="modern-pass-brand-text">TechTalk</span>
                    </div>
                    <div className="modern-pass-badge">
                      <span className="modern-pass-dot" />
                      <span>{pass.badge}</span>
                    </div>
                  </div>

                  {/* Main Price & Pass Info */}
                  <div className="modern-pass-body">
                    <div className="modern-pass-price-wrap">
                      <div className="modern-pass-price">{pass.price}</div>
                      <span className="modern-pass-admit-badge">ADMIT {admitNum}</span>
                    </div>
                    <h3 className="modern-pass-title">{pass.type}</h3>
                    <p className="modern-pass-desc">{pass.description}</p>

                    {/* Metadata Grid */}
                    <div className="modern-pass-specs">
                      <div className="modern-pass-spec-item">
                        <span className="modern-pass-spec-label">ACCREDITATION</span>
                        <span className="modern-pass-spec-value">{pass.type.replace(" PASS", "")}</span>
                      </div>
                      <div className="modern-pass-spec-item">
                        <span className="modern-pass-spec-label">ACCESS TIER</span>
                        <span className="modern-pass-spec-value">{pass.price === "FREE" ? "Standard" : "All-Access"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Modern Barcode & Security Strip */}
                  <div className="modern-pass-security">
                    <div className="modern-pass-barcode-wrap">
                      <div className="modern-pass-barcode" />
                      <div className="modern-pass-code">NXZB-2026-{pass.id.replace("-pass", "").toUpperCase()}</div>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="modern-pass-action">
                    <button
                      type="button"
                      className="modern-pass-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPassModal(pass.id);
                      }}
                    >
                      <span>Claim Pass</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Instant Accreditation Perks Bar */}
        <div 
          style={{
            maxWidth: "1100px",
            margin: "64px auto 0 auto",
            padding: "24px 32px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            textAlign: "left"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7C3AED" }}>
              <QrCode size={20} />
            </div>
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 750, color: "#000000" }}>Instant Digital QR Pass</div>
              <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>Delivered directly to email &amp; profile</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 750, color: "#000000" }}>Verified Certificate</div>
              <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>Official skill credential &amp; accreditation</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
              <Lock size={20} />
            </div>
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 750, color: "#000000" }}>Secure UPI &amp; Cards</div>
              <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>256-bit encrypted checkout &amp; GST bill</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(236, 72, 153, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#DB2777" }}>
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 750, color: "#000000" }}>Priority Stage Access</div>
              <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>Keynotes, founder meets &amp; labs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
