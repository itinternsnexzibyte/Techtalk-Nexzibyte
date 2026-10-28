import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, X, RotateCcw, Clock, MapPin, DollarSign, 
  ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, GraduationCap, CheckCircle2, 
  Award, Users, Rocket, Layers, ShieldCheck, Sparkles, ChevronRight
} from "lucide-react";
import { 
  INTERNSHIPS, 
  INTERNSHIP_CATEGORIES, 
  INTERNSHIP_HIGHLIGHTS, 
  INTERNSHIP_STEPS
} from "../data/internshipsData.js";
import { useApp } from "../context/AppContext.jsx";

export default function InternshipPage() {
  const { openInternshipModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Filter internships based on category & search query
  const filteredInternships = useMemo(() => {
    return INTERNSHIPS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categoryGroup === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchDesc = item.shortDesc?.toLowerCase().includes(q);
      const matchSkills = item.skills?.some(s => s.toLowerCase().includes(q));

      return matchTitle || matchCat || matchDesc || matchSkills;
    });
  }, [selectedCategory, searchQuery]);

  // Dynamic counts for category tabs
  const categoryCounts = useMemo(() => {
    const counts = { all: INTERNSHIPS.length };
    INTERNSHIPS.forEach((item) => {
      if (item.categoryGroup) {
        counts[item.categoryGroup] = (counts[item.categoryGroup] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Reset index when filters change
  useEffect(() => {
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedCategory, searchQuery]);

  // Scroll sync handler
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild?.offsetWidth || 380;
    const gap = 24;
    const itemFullWidth = cardWidth + gap;
    const newIndex = Math.round(scrollLeft / itemFullWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < filteredInternships.length) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const clampedIndex = Math.max(0, Math.min(index, filteredInternships.length - 1));
    const cardWidth = container.firstElementChild?.offsetWidth || 380;
    const gap = 24;
    const scrollTarget = clampedIndex * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollTarget,
      behavior: "smooth"
    });
    setCurrentIndex(clampedIndex);
  };

  const handlePrev = () => {
    scrollToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToSlide(currentIndex + 1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalCards = filteredInternships.length;

  return (
    <div className="internship-page-container">
      {/* ══════════════════════════════════════════════════════════════════
          1. INTERNSHIPS HERO BANNER
          Tailored Hero: Centered, Compact Ambient Pastel Gradient
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-hero-section hero-gradient-internship">
        <div className="container">
          <div className="discovery-hero-centered-content">
            <h1 className="discovery-hero-title">
              Specialized Engineering Internships &amp; Cohorts
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. REAL CODEBASES, REAL EXPERIENCE (3 VISUAL CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-cards-section">
        <div className="container">
          <div className="discovery-cards-header">
            <h2 className="discovery-cards-title">
              Real codebases, real experience
            </h2>
            <p className="discovery-cards-subtitle">
              Ship features on live platforms and work directly with senior software architects.
            </p>
          </div>

          <div className="discovery-cards-grid">
            {/* Card 1 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/courses-students-collab.jpg"
                  alt="Real Production Codebases"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/ai-course.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Real Production Codebases
                </h3>
                <p className="discovery-card-text">
                  Ship actual features to live client and community platforms under senior supervision.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-workshop.jpg"
                  alt="Dedicated 1:1 Mentorship"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-tech-stage.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Dedicated 1:1 Mentorship
                </h3>
                <p className="discovery-card-text">
                  Receive weekly code reviews, architectural feedback, and career interview coaching.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/industry-events-expo.jpg"
                  alt="Placement & PPO Accelerator"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-team-collab.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Placement &amp; PPO Accelerator
                </h3>
                <p className="discovery-card-text">
                  Top performers transition directly into full-time roles and partner hiring pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. WHY INTERN AT NEXZIBYTE (3 COLUMNS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-why-section">
        <div className="container">
          <div className="discovery-why-header">
            <span className="discovery-overtitle">
              WHY INTERN WITH US
            </span>
            <h2 className="discovery-why-title">
              Accelerate your career trajectory
            </h2>
            <p className="discovery-why-subtitle">
              Designed for engineering students, recent graduates, and career transitioners.
            </p>
          </div>

          <div className="discovery-why-grid">
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Rocket size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Real Production Work
              </h3>
              <p className="discovery-why-col-desc">
                Build enterprise software rather than superficial toy projects or mock assignments.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Clock size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Flexible Hybrid Schedules
              </h3>
              <p className="discovery-why-col-desc">
                Full-time and hybrid options designed to balance your college academics and career goals.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Award size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Stipends &amp; Verified PPO
              </h3>
              <p className="discovery-why-col-desc">
                Performance incentives and direct conversion tracks to associate engineering positions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. ACTIVE INTERNSHIPS CATALOG & SEARCH
          ══════════════════════════════════════════════════════════════════ */}
      <section className="courses-showcase-section" id="internship-catalog" style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div className="events-section-header-row" style={{ marginBottom: "28px" }}>
            <div>
              <div className="events-section-tag">
                <Briefcase size={13} className="text-blue-accent" />
                <span>ACTIVE COHORTS (HYDERABAD &amp; REMOTE)</span>
              </div>
              <h2 className="events-section-heading" style={{ color: "#000000" }}>
                Explore Open Internship Positions
              </h2>
              <p className="events-section-subtitle" style={{ color: "#000000" }}>
                Select your domain of interest to discover active openings and application deadlines.
              </p>
            </div>
          </div>

          {/* Search Bar & Category Filter Pills */}
          <div className="events-search-filter-card" style={{ marginBottom: "32px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "18px 22px" }}>
            <div className="events-search-bar-wrap" style={{ marginBottom: "16px" }}>
              <div className="events-search-input-box">
                <Search size={18} className="events-search-icon" />
                <input
                  type="text"
                  placeholder="Search by role, skills or tools (e.g. Python, AI, React, HR, DevOps)..."
                  className="events-search-input"
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

            {/* Category Filter Pills */}
            <div className="events-category-filters-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div className="events-filter-pills-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {INTERNSHIP_CATEGORIES.map((cat) => {
                  const count = categoryCounts[cat.id] || 0;
                  const isActive = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`events-filter-pill-btn ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span>{cat.label}</span>
                      <span className="events-filter-pill-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="events-count-pill" style={{ margin: 0, padding: "6px 14px" }}>
                <span className="events-count-number">{filteredInternships.length}</span>
                <span>Tracks Listed</span>
              </div>
            </div>
          </div>

          {/* Internships Horizontal Carousel */}
          {filteredInternships.length > 0 ? (
            <div className="courses-carousel-wrapper">
              <div 
                className="courses-carousel-track" 
                ref={scrollContainerRef}
                onScroll={handleScroll}
              >
                {filteredInternships.map((item) => (
                  <div 
                    key={item.id} 
                    className="course-carousel-card"
                    onClick={() => openInternshipModal(item, "overview")}
                    style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openInternshipModal(item, "overview");
                      }
                    }}
                  >
                    {/* Image Banner */}
                    <div className="course-carousel-img-wrap">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="course-carousel-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/ai-course.jpg";
                        }}
                      />
                      <span className="past-badge-pill" style={{ background: "#2563EB" }}>
                        {item.category || "ENGINEERING"}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="course-carousel-body" style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ display: "flex", gap: "10px", marginBottom: "8px", fontSize: "0.825rem", color: "#000000" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
                          <Clock size={13} style={{ color: "#2563EB" }} />
                          <span>{item.duration || "3 Months"}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <MapPin size={13} style={{ color: "#2563EB" }} />
                          <span>{item.location || "Hyderabad / Hybrid"}</span>
                        </div>
                      </div>

                      <h3 className="course-carousel-title" style={{ color: "#000000", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 8px 0" }}>
                        {item.title}
                      </h3>

                      <p className="course-carousel-desc" style={{ color: "#000000", fontSize: "0.875rem", lineHeight: 1.5, margin: "0 0 16px 0", flex: 1 }}>
                        {item.shortDesc?.length > 100 ? `${item.shortDesc.slice(0, 100)}...` : item.shortDesc}
                      </p>

                      <div className="course-carousel-footer" style={{ marginTop: "auto" }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm btn-full"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openInternshipModal(item, "overview");
                          }}
                        >
                          <span>Track Details &amp; Apply</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Carousel Controls */}
              {totalCards > 1 && (
                <div className="courses-carousel-nav-bar" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "24px" }}>
                  <button
                    type="button"
                    className="carousel-nav-arrow-btn"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous Internship Track"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <div className="carousel-nav-counter" style={{ color: "#000000", fontWeight: 600 }}>
                    <span className="carousel-nav-current">{currentIndex + 1}</span>
                    <span className="carousel-nav-sep"> / </span>
                    <span className="carousel-nav-total">{totalCards}</span>
                  </div>

                  <button
                    type="button"
                    className="carousel-nav-arrow-btn"
                    onClick={handleNext}
                    disabled={currentIndex >= totalCards - 1}
                    aria-label="Next Internship Track"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="courses-empty-state" style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#F3E8FF",
                color: "#111827",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px"
              }}>
                <Search size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px", color: "#000000" }}>
                No Tracks Found
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#000000", marginBottom: "20px" }}>
                We couldn't find any internships matching "{searchQuery}" in this category.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleResetFilters}
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. CAMPUS PLACEMENT & COLLEGE COLLABORATE CTA
          Pastel Ambient Gradient Card + Pure Black Letters
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-host-collab-section">
        <div className="container">
          <div className="host-collab-box collab-gradient-internship">
            <div className="host-collab-inner">
              <span className="host-collab-tag">
                CAMPUS PLACEMENT &amp; COLLEGE PARTNERSHIPS
              </span>

              <h2 className="host-collab-heading">
                Partner with NexziByte for Campus Placements
              </h2>

              <p className="host-collab-text">
                Connect your college or institute with verified internship drives, skill bootcamps, and hackathons.
              </p>

              <div className="host-collab-btn-row">
                <button
                  type="button"
                  className="btn btn-blue-primary btn-lg"
                  onClick={() => scrollToSection("internship-catalog")}
                >
                  <Briefcase size={18} />
                  <span>Explore All 23 Tracks</span>
                </button>

                <Link to="/partner" className="btn btn-secondary btn-lg">
                  <Users size={18} />
                  <span>College Partnership Inquiry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
