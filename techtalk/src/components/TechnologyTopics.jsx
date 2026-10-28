import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, Search, X, RotateCcw, 
  Clock, MapPin, Briefcase, GraduationCap, ChevronLeft, ChevronRight, BookOpen,
  Sparkles, Cpu, Lightbulb, Award, Users
} from "lucide-react";
import { COURSES, COURSE_CATEGORIES } from "../data/coursesData.js";
import { useApp } from "../context/AppContext.jsx";

export default function TechnologyTopics() {
  const { openCourseModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Filter courses based on active category and search query
  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === "all" ||
        course.categoryGroup === selectedCategory ||
        (course.categoryGroups && course.categoryGroups.includes(selectedCategory));

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchSubtitle = course.subtitle?.toLowerCase().includes(q);
      const matchDesc = course.shortDesc?.toLowerCase().includes(q);
      const matchCategory = course.category?.toLowerCase().includes(q);
      const matchTags = course.tags?.some((tag) => tag.toLowerCase().includes(q));
      const matchRoles = course.roles?.some((role) => role.toLowerCase().includes(q));

      return matchTitle || matchSubtitle || matchDesc || matchCategory || matchTags || matchRoles;
    });
  }, [selectedCategory, searchQuery]);

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: COURSES.length };
    COURSES.forEach((course) => {
      const groups = new Set([course.categoryGroup, ...(course.categoryGroups || [])]);
      groups.forEach((group) => {
        if (group) {
          counts[group] = (counts[group] || 0) + 1;
        }
      });
    });
    return counts;
  }, []);

  // Reset current index when category or search changes
  useEffect(() => {
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedCategory, searchQuery]);

  // Handle scroll synchronization
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild?.offsetWidth || 380;
    const gap = 24;
    const itemFullWidth = cardWidth + gap;
    const newIndex = Math.round(scrollLeft / itemFullWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < filteredCourses.length) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const clampedIndex = Math.max(0, Math.min(index, filteredCourses.length - 1));
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

  const totalCards = filteredCourses.length;

  return (
    <div className="courses-page-luxury-wrap">
      {/* ══════════════════════════════════════════════════════════════════
          1. COURSES HERO BANNER
          Tailored Hero: Centered, Compact Ambient Pastel Gradient
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-hero-section hero-gradient-courses">
        <div className="container">
          <div className="discovery-hero-centered-content">
            <h1 className="discovery-hero-title">
              Technical Courses &amp; Industry Certifications
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. MASTERCLASSES & PRODUCTION CODE (3 VISUAL CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-cards-section">
        <div className="container">
          <div className="discovery-cards-header">
            <h2 className="discovery-cards-title">
              Architect-led masterclasses, production code
            </h2>
            <p className="discovery-cards-subtitle">
              Practical engineering curricula designed with leading Fortune 500 tech architects.
            </p>
          </div>

          <div className="discovery-cards-grid">
            {/* Card 1 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/generative-ai.jpg"
                  alt="Generative AI & Machine Learning"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/ai-course.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Generative AI &amp; Machine Learning
                </h3>
                <p className="discovery-card-text">
                  Build production LLM pipelines, autonomous agents, and fine-tune models from scratch.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/backend-distributed-systems.jpg"
                  alt="Cloud & Distributed Systems"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/docker-containerization.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Cloud &amp; Distributed Systems
                </h3>
                <p className="discovery-card-text">
                  Architect resilient microservices, Kubernetes clusters, and enterprise backend systems.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/courses-coding-lab.jpg"
                  alt="Full-Stack & Digital Engineering"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/digital-engineering.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Full-Stack &amp; Digital Engineering
                </h3>
                <p className="discovery-card-text">
                  Develop scalable React, Next.js, and modern enterprise software with real code reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. WHY LEARN WITH NEXZIBYTE (3 COLUMNS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-why-section">
        <div className="container">
          <div className="discovery-why-header">
            <span className="discovery-overtitle">
              WHY CHOOSE OUR COURSES
            </span>
            <h2 className="discovery-why-title">
              Engineering excellence by design
            </h2>
            <p className="discovery-why-subtitle">
              Created for developers, students, and engineers seeking real production capability.
            </p>
          </div>

          <div className="discovery-why-grid">
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Cpu size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Architect-Led Mentorship
              </h3>
              <p className="discovery-why-col-desc">
                Learn directly from principal architects working in Fortune 500 enterprises and GCCs.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Sparkles size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Production Repositories
              </h3>
              <p className="discovery-why-col-desc">
                Build real portfolio applications using production Git workflows, CI/CD, and cloud infrastructure.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <GraduationCap size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Verified Credentials
              </h3>
              <p className="discovery-why-col-desc">
                Earn industry-recognized certificates with verifiable QR authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. MAIN TECHNICAL COURSES DIRECTORY
          ══════════════════════════════════════════════════════════════════ */}
      <section className="courses-showcase-section" id="tech-topics-catalog" style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div className="events-section-header-row" style={{ marginBottom: "28px" }}>
            <div>
              <div className="events-section-tag">
                <GraduationCap size={13} className="text-blue-accent" />
                <span>TECHNICAL CURRICULUM &amp; CERTIFICATIONS</span>
              </div>
              <h2 className="events-section-heading" style={{ color: "#000000" }}>
                Explore Technical Courses
              </h2>
              <p className="events-section-subtitle" style={{ color: "#000000" }}>
                Filter through {COURSES.length}+ specialized technology masterclasses and certification tracks.
              </p>
            </div>
          </div>

          {/* Filter Controls: Search & Category Pills */}
          <div className="events-search-filter-card" style={{ marginBottom: "32px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "18px 22px" }}>
            <div className="events-search-bar-wrap" style={{ marginBottom: "16px" }}>
              <div className="events-search-input-box">
                <Search size={18} className="events-search-icon" />
                <input
                  type="text"
                  placeholder="Search courses, tools, or skills (e.g., Python, AWS, Docker)..."
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

            {/* Category Tabs */}
            <div className="events-category-filters-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div className="events-filter-pills-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {COURSE_CATEGORIES.map((cat) => {
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
                <span className="events-count-number">{filteredCourses.length}</span>
                <span>Courses Listed</span>
              </div>
            </div>
          </div>

          {/* Courses Horizontal Carousel / Grid */}
          {filteredCourses.length > 0 ? (
            <div className="courses-carousel-wrapper">
              <div 
                className="courses-carousel-track" 
                ref={scrollContainerRef}
                onScroll={handleScroll}
              >
                {filteredCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="course-carousel-card"
                    onClick={() => openCourseModal(course, "curriculum")}
                    style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openCourseModal(course, "curriculum");
                      }
                    }}
                  >
                    {/* Course Image */}
                    <div className="course-carousel-img-wrap">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="course-carousel-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/ai-course.jpg";
                        }}
                      />
                      <span className="past-badge-pill" style={{ background: "#2563EB" }}>
                        {course.category || "TECHNOLOGY"}
                      </span>
                    </div>

                    {/* Course Card Body */}
                    <div className="course-carousel-body" style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 className="course-carousel-title" style={{ color: "#000000", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 8px 0" }}>
                        {course.title}
                      </h3>
                      
                      <p className="course-carousel-desc" style={{ color: "#000000", fontSize: "0.875rem", lineHeight: 1.5, margin: "0 0 16px 0", flex: 1 }}>
                        {(course.subtitle || course.shortDesc)?.length > 100 
                          ? `${(course.subtitle || course.shortDesc).slice(0, 100)}...` 
                          : (course.subtitle || course.shortDesc)}
                      </p>

                      {/* Read More Action Button */}
                      <div className="course-carousel-footer" style={{ marginTop: "auto" }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm btn-full"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openCourseModal(course, "curriculum");
                          }}
                          aria-label={`View curriculum for ${course.title}`}
                        >
                          <span>View Curriculum</span>
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Carousel Controls (← [index / total] →) */}
              {totalCards > 1 && (
                <div className="courses-carousel-nav-bar" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "24px" }}>
                  <button
                    type="button"
                    className="carousel-nav-arrow-btn"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous Course"
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
                    aria-label="Next Course"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
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
                No Courses Found
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#000000", marginBottom: "20px" }}>
                We couldn't find any courses matching "{searchQuery}" in this category.
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
          5. ENTERPRISE UPSKILLING / CORPORATE TRAINING CTA
          Pastel Ambient Gradient Card + Pure Black Letters
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-host-collab-section">
        <div className="container">
          <div className="host-collab-box collab-gradient-courses">
            <div className="host-collab-inner">
              <span className="host-collab-tag">
                CORPORATE &amp; ENTERPRISE UPSKILLING
              </span>

              <h2 className="host-collab-heading">
                Looking to Upskill Your Engineering Team?
              </h2>

              <p className="host-collab-text">
                Custom corporate training cohorts, hands-on architectural bootcamps, and direct hiring pipelines for tech enterprises.
              </p>

              <div className="host-collab-btn-row">
                <button
                  type="button"
                  className="btn btn-blue-primary btn-lg"
                  onClick={() => scrollToSection("tech-topics-catalog")}
                >
                  <GraduationCap size={18} />
                  <span>Explore All Tracks</span>
                </button>

                <Link to="/partner" className="btn btn-secondary btn-lg">
                  <Users size={18} />
                  <span>Corporate Training Inquiry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
