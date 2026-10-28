import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, MapPin, ArrowRight, Clock, Users, 
  Tag, ExternalLink, Filter, BookOpen, Search, X, Ticket, ChevronRight,
  Sparkles, Cpu, Lightbulb, Award
} from "lucide-react";
import { UPCOMING_EVENTS } from "../data/mockData.js";
import { useApp } from "../context/AppContext.jsx";

const CATEGORY_TABS = [
  { id: "all", label: "All Summits & Meets", count: UPCOMING_EVENTS.length },
  { id: "summits", label: "Global Summits", count: UPCOMING_EVENTS.filter(e => e.category === "summits").length },
  { id: "launches", label: "Product Launches", count: UPCOMING_EVENTS.filter(e => e.category === "launches").length },
  { id: "roundtables", label: "Executive Meets", count: UPCOMING_EVENTS.filter(e => e.category === "roundtables").length },
  { id: "partnerships", label: "Strategic MoUs", count: UPCOMING_EVENTS.filter(e => e.category === "partnerships").length },
];

export default function SummitsPage() {
  const navigate = useNavigate();
  const { openPassModal, openSummitModal } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredEvents = useMemo(() => {
    return UPCOMING_EVENTS.filter((ev) => {
      // Category filter
      const matchesCategory = activeFilter === "all" || ev.category === activeFilter;

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        ev.title?.toLowerCase().includes(q) ||
        ev.type?.toLowerCase().includes(q) ||
        ev.description?.toLowerCase().includes(q) ||
        ev.venue?.toLowerCase().includes(q) ||
        ev.location?.toLowerCase().includes(q) ||
        (ev.hashtags && ev.hashtags.some(tag => tag.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="summits-page-luxury">
      {/* ══════════════════════════════════════════════════════════════════
          1. SUMMITS HERO BANNER
          Tailored Hero: Centered, Compact Ambient Gradient, Editorial Pill
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-hero-section hero-gradient-summits">
        <div className="container">
          <div className="discovery-hero-centered-content">
            <h1 className="discovery-hero-title">
              NexziByte Global Summits &amp; Conferences
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. LANDMARK GATHERINGS, EXECUTIVE INSIGHTS (3 VISUAL CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-cards-section">
        <div className="container">
          <div className="discovery-cards-header">
            <h2 className="discovery-cards-title">
              Landmark gatherings, executive insights
            </h2>
            <p className="discovery-cards-subtitle">
              Experience flagship tech keynotes, executive roundtables, and cross-industry collaborations.
            </p>
          </div>

          <div className="discovery-cards-grid">
            {/* Card 1 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-tech-stage.jpg"
                  alt="Flagship Keynotes & Unveilings"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/renewable-energy.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Flagship Keynotes &amp; Unveilings
                </h3>
                <p className="discovery-card-text">
                  Discover landmark product releases and ecosystem announcements from visionary architects.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/event-delegates-networking-landscape.jpg"
                  alt="Executive Leadership Roundtables"
                  className="discovery-card-img"
                  style={{ objectPosition: "center 10%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-team-collab.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Executive Leadership Roundtables
                </h3>
                <p className="discovery-card-text">
                  Participate in closed-door discussions with enterprise leaders, investors, and policy innovators.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-tech-meetup.jpg"
                  alt="Global Developer Networking"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-solutions-action.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Global Developer Networking
                </h3>
                <p className="discovery-card-text">
                  Connect with peers, exchange technical roadmaps, and build cross-industry relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. WHY ATTEND SUMMITS (3 COLUMNS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-why-section">
        <div className="container">
          <div className="discovery-why-header">
            <span className="discovery-overtitle">
              WHY ATTEND SUMMITS
            </span>
            <h2 className="discovery-why-title">
              High-impact executive summits
            </h2>
            <p className="discovery-why-subtitle">
              Designed for technology leaders, enterprise architects, founders, and ambitious engineers.
            </p>
          </div>

          <div className="discovery-why-grid">
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Sparkles size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Enterprise Previews
              </h3>
              <p className="discovery-why-col-desc">
                Gain first access to enterprise-grade AI frameworks, platforms, and distributed systems.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Users size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                High-Signal Peer Network
              </h3>
              <p className="discovery-why-col-desc">
                Network directly with engineering executives, startup founders, and global GCC leaders.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Lightbulb size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Actionable Blueprints
              </h3>
              <p className="discovery-why-col-desc">
                Take away verified architecture diagrams, security guidelines, and real-world deployment patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. MAIN SUMMITS & CONFERENCES DIRECTORY
          ══════════════════════════════════════════════════════════════════ */}
      <section className="summits-content-section" id="summits-browser" style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div className="events-section-header-row" style={{ marginBottom: "32px" }}>
            <div>
              <div className="events-section-tag">
                <Award size={13} className="text-blue-accent" />
                <span>ANNUAL CONFERENCES &amp; EXECUTIVE ROUNDTABLES</span>
              </div>
              <h2 className="events-section-heading" style={{ color: "#000000" }}>
                Upcoming &amp; Flagship Summits
              </h2>
              <p className="events-section-subtitle" style={{ color: "#000000" }}>
                Browse scheduled conferences, product launch announcements, and executive networking sessions.
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="events-search-filter-card" style={{ marginBottom: "32px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "18px 22px" }}>
            <div className="events-search-bar-wrap" style={{ marginBottom: "16px" }}>
              <div className="events-search-input-box">
                <Search size={18} className="events-search-icon" />
                <input
                  type="text"
                  className="events-search-input"
                  placeholder="Search summits by title, venue, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="events-search-clear-btn"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills & Count */}
            <div className="events-category-filters-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div className="events-filter-pills-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {CATEGORY_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`events-filter-pill-btn ${activeFilter === tab.id ? "active" : ""}`}
                    onClick={() => setActiveFilter(tab.id)}
                  >
                    <span>{tab.label}</span>
                    <span className="events-filter-pill-count">{tab.count}</span>
                  </button>
                ))}
              </div>

              <div className="events-count-pill" style={{ margin: 0, padding: "6px 14px" }}>
                <span className="events-count-number">{filteredEvents.length}</span>
                <span>Summits Listed</span>
              </div>
            </div>
          </div>

          {/* Summits Grid (3 Columns with Landscape Images & Pure Black Text) */}
          <div className="upcoming-events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {filteredEvents.map((ev) => (
              <div 
                key={ev.id} 
                className="event-card summit-card-enhanced"
                onClick={() => openSummitModal(ev)}
                tabIndex={0}
                role="button"
                aria-label={`View announcement for ${ev.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openSummitModal(ev);
                  }
                }}
              >
                {/* Landscape Image Banner */}
                <div className="event-card-image-wrap">
                  <img 
                    src={ev.image} 
                    alt={ev.title} 
                    className="event-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/renewable-energy.jpg";
                    }}
                  />
                  <span className="event-type-tag">{ev.type}</span>
                  {ev.number && (
                    <span className="event-index-tag">#{ev.number}</span>
                  )}
                </div>

                {/* Card Content Body with Pure Black Letters & Reduced Matter */}
                <div className="event-card-body" style={{ padding: "20px" }}>
                  <div className="event-meta-header" style={{ marginBottom: "10px" }}>
                    <div className="event-date-row" style={{ color: "#000000" }}>
                      <Calendar size={13} style={{ color: "#2563EB" }} />
                      <span style={{ fontWeight: 600 }}>{ev.date}</span>
                    </div>
                    {ev.spotsLeft && (
                      <span className="event-status-pill">
                        {ev.spotsLeft} Open
                      </span>
                    )}
                  </div>

                  <h3 className="event-card-heading" style={{ color: "#000000", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 8px 0" }}>
                    {ev.title}
                  </h3>

                  <div className="event-location-row" style={{ color: "#000000", marginBottom: "10px", fontSize: "0.85rem" }}>
                    <MapPin size={13} style={{ color: "#2563EB", flexShrink: 0 }} />
                    <span>{ev.venue || ev.location}</span>
                  </div>

                  <p className="event-card-text" style={{ color: "#000000", fontSize: "0.875rem", lineHeight: 1.5, margin: "0 0 16px 0" }}>
                    {ev.description?.length > 100 ? `${ev.description.slice(0, 100)}...` : ev.description}
                  </p>

                  {/* Footer Actions */}
                  <div className="event-card-footer" style={{ marginTop: "auto" }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm btn-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        openSummitModal(ev);
                      }}
                    >
                      <span>Read Announcement</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Filter State */}
          {filteredEvents.length === 0 && (
            <div className="events-empty-state" style={{ textAlign: "center", padding: "60px 20px" }}>
              <BookOpen size={40} style={{ opacity: 0.4, marginBottom: "12px" }} />
              <h3 style={{ color: "#000000" }}>No summits found matching your criteria</h3>
              <p style={{ color: "#000000" }}>Try clearing your search query or switching category filters.</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: "16px" }}
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. DELEGATE REGISTRATION & SPONSOR COLLABORATE BOX
          Pastel Ambient Gradient Card + Pure Black Letters
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-host-collab-section">
        <div className="container">
          <div className="host-collab-box collab-gradient-summits">
            <div className="host-collab-inner">
              <span className="host-collab-tag">
                DELEGATE PASSES &amp; SPONSORSHIP
              </span>

              <h2 className="host-collab-heading">
                Want to Sponsor or Exhibit at a NexziByte Summit?
              </h2>

              <p className="host-collab-text">
                Partner with NexziByte TechTalk to showcase your technology, engage enterprise leaders, or sponsor keynote sessions.
              </p>

              <div className="host-collab-btn-row">
                <button
                  type="button"
                  className="btn btn-blue-primary btn-lg"
                  onClick={() => openPassModal("delegate-pass")}
                >
                  <Ticket size={18} />
                  <span>Reserve Summit Pass</span>
                </button>

                <Link to="/partner" className="btn btn-secondary btn-lg">
                  <Users size={18} />
                  <span>Inquire as Sponsor</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
