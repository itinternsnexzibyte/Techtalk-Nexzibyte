import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Rocket, Users, Shield, TrendingUp, Building2, Calendar, 
  MapPin, Clock, ArrowRight, CheckCircle2, ChevronRight, 
  Ticket, Coffee, Award, Lock, Star, MessageSquare, Lightbulb, Sparkles
} from "lucide-react";
import { 
  FOUNDER_MEETS_LIST 
} from "../data/founderMeetsData.js";
import { useApp } from "../context/AppContext.jsx";

export default function FounderMeetsPage() {
  const navigate = useNavigate();
  const { openPassModal, showToast } = useApp();

  const [activeFilter, setActiveFilter] = useState("all"); // "all", "upcoming", "past"

  // Filtered Meets
  const filteredMeets = useMemo(() => {
    if (activeFilter === "all") return FOUNDER_MEETS_LIST;
    return FOUNDER_MEETS_LIST.filter((m) => m.status === activeFilter);
  }, [activeFilter]);

  const upcomingCount = FOUNDER_MEETS_LIST.filter(m => m.status === "upcoming").length;
  const pastCount = FOUNDER_MEETS_LIST.filter(m => m.status === "past").length;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="founder-meets-page-luxury">
      {/* ══════════════════════════════════════════════════════════════════
          1. EXECUTIVE HERO BANNER
          Tailored Hero: Centered, Compact Ambient Pastel Gradient
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-hero-section hero-gradient-founder">
        <div className="container">
          <div className="discovery-hero-centered-content">
            <h1 className="discovery-hero-title">
              Executive Founder Meets &amp; Venture Circles
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. CONNECT, SCALE, AND LEAD (3 VISUAL CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-cards-section">
        <div className="container">
          <div className="discovery-cards-header">
            <h2 className="discovery-cards-title">
              Connect, scale, and lead
            </h2>
            <p className="discovery-cards-subtitle">
              Curated closed-door mixers designed for high-growth tech founders and active investors.
            </p>
          </div>

          <div className="discovery-cards-grid">
            {/* Card 1 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-team-collab.jpg"
                  alt="Venture & Angel Roundtables"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/renewable-energy.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Venture &amp; Angel Roundtables
                </h3>
                <p className="discovery-card-text">
                  Connect directly with active angel syndicates and venture partners in curated closed-door settings.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-solutions-action.jpg"
                  alt="Product & Scale Architecture"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-tech-stage.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Product &amp; Scale Architecture
                </h3>
                <p className="discovery-card-text">
                  Exchange battle-tested growth playbooks, unit economics, and cloud infrastructure patterns.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/event-delegates-networking-landscape.jpg"
                  alt="Founder Peer Communities"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-tech-meetup.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Founder Peer Communities
                </h3>
                <p className="discovery-card-text">
                  Build enduring relationships with fellow founders navigating rapid technology and market shifts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. WHY JOIN FOUNDER MEETS (3 COLUMNS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-why-section">
        <div className="container">
          <div className="discovery-why-header">
            <span className="discovery-overtitle">
              WHY JOIN FOUNDER MEETS
            </span>
            <h2 className="discovery-why-title">
              Exclusive venture circles
            </h2>
            <p className="discovery-why-subtitle">
              Built for startup founders, CTOs, venture capitalists, and technical executives.
            </p>
          </div>

          <div className="discovery-why-grid">
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Users size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                High-Signal Peer Group
              </h3>
              <p className="discovery-why-col-desc">
                Share candid challenges, pricing frameworks, and growth metrics without corporate posturing.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Rocket size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Direct Enterprise Access
              </h3>
              <p className="discovery-why-col-desc">
                Access decision-makers across NexziByte's enterprise ecosystem for pilots and partnerships.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Shield size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Zero Friction Access
              </h3>
              <p className="discovery-why-col-desc">
                Curated, invite-only sessions with zero upfront fees or equity requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. FOUNDER MEETS DIRECTORY (UPCOMING & PAST)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="founder-meets-directory-section" id="meets-directory" style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div className="events-section-header-row" style={{ marginBottom: "28px" }}>
            <div>
              <div className="events-section-tag">
                <Calendar size={13} className="text-blue-accent" />
                <span>VENTURE SESSIONS &amp; INVESTOR MIXERS</span>
              </div>
              <h2 className="events-section-heading" style={{ color: "#000000" }}>
                Founder Meets Schedule
              </h2>
              <p className="events-section-subtitle" style={{ color: "#000000" }}>
                Browse upcoming closed-door roundtables and recaps from past investor mixers.
              </p>
            </div>

            {/* Filter Tabs */}
            {pastCount > 0 && (
              <div className="meets-filter-tabs" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className={`events-filter-pill-btn ${activeFilter === "all" ? "active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  All Meets ({FOUNDER_MEETS_LIST.length})
                </button>
                <button
                  type="button"
                  className={`events-filter-pill-btn ${activeFilter === "upcoming" ? "active" : ""}`}
                  onClick={() => setActiveFilter("upcoming")}
                >
                  Upcoming ({upcomingCount})
                </button>
                <button
                  type="button"
                  className={`events-filter-pill-btn ${activeFilter === "past" ? "active" : ""}`}
                  onClick={() => setActiveFilter("past")}
                >
                  Past Meets ({pastCount})
                </button>
              </div>
            )}
          </div>

          {/* Cards Grid: 3-column landscape cards with pure black typography */}
          <div className="founder-meets-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {filteredMeets.map((meet) => (
              <div 
                key={meet.id} 
                className="founder-meet-card"
                onClick={() => navigate(`/founder-meets/${meet.id}`)}
                tabIndex={0}
                role="button"
                style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/founder-meets/${meet.id}`);
                  }
                }}
              >
                {/* Event Image Banner */}
                <div className="meet-card-img-wrap">
                  <img 
                    src={meet.image} 
                    alt={meet.name} 
                    className="meet-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/renewable-energy.jpg";
                    }}
                  />
                  <span className="past-badge-pill" style={{ background: meet.status === "upcoming" ? "#16A34A" : "#111827" }}>
                    {meet.status === "upcoming" ? "Upcoming" : "Past Recap"}
                  </span>
                </div>

                {/* Event Information */}
                <div className="meet-card-body" style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div className="meet-card-meta-row" style={{ display: "flex", gap: "12px", marginBottom: "8px", fontSize: "0.85rem", color: "#000000" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: 600 }}>
                      <Calendar size={13} style={{ color: "#2563EB" }} />
                      <span>{meet.date}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <Clock size={13} style={{ color: "#2563EB" }} />
                      <span>{meet.time?.split("–")[0]}</span>
                    </div>
                  </div>

                  <h3 className="meet-card-title" style={{ color: "#000000", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 8px 0" }}>
                    {meet.name}
                  </h3>

                  <div className="meet-location-chip" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#000000", fontSize: "0.85rem", marginBottom: "10px" }}>
                    <MapPin size={13} style={{ color: "#2563EB", flexShrink: 0 }} />
                    <span>{meet.location}</span>
                  </div>

                  <p className="meet-card-desc" style={{ color: "#000000", fontSize: "0.875rem", lineHeight: 1.5, margin: "0 0 16px 0", flex: 1 }}>
                    {meet.shortDescription?.length > 100 ? `${meet.shortDescription.slice(0, 100)}...` : meet.shortDescription}
                  </p>

                  {/* Card Actions */}
                  <div className="meet-card-actions" style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm btn-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/founder-meets/${meet.id}`);
                      }}
                    >
                      <span>{meet.status === "upcoming" ? "View Details" : "Read Recap"}</span>
                      <ChevronRight size={14} />
                    </button>
                    {meet.status === "upcoming" && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPassModal(meet.registration?.passTypeId || "founder-pass");
                        }}
                      >
                        <Ticket size={13} />
                        <span>Pass</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. HOST A CIRCLE / PITCH APPLICATION CTA
          Pastel Ambient Gradient Card + Pure Black Letters
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-host-collab-section">
        <div className="container">
          <div className="host-collab-box collab-gradient-founder">
            <div className="host-collab-inner">
              <span className="host-collab-tag">
                COMMUNITY &amp; VENTURE INITIATIVE
              </span>

              <h2 className="host-collab-heading">
                Building Something Groundbreaking in AI, SaaS, or Cloud?
              </h2>

              <p className="host-collab-text">
                Apply to host a closed-door founder roundtable or pitch your startup to NexziByte's angel syndicates and enterprise client network.
              </p>

              <div className="host-collab-btn-row">
                <button
                  type="button"
                  className="btn btn-blue-primary btn-lg"
                  onClick={() => openPassModal("founder-pass")}
                >
                  <Ticket size={18} />
                  <span>Get Founder Pass</span>
                </button>

                <Link to="/partner" className="btn btn-secondary btn-lg">
                  <Rocket size={18} />
                  <span>Apply to Pitch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
