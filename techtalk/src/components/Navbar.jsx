import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ChevronDown, ChevronUp, Menu, X, ArrowRight, User, ShieldCheck, 
  Calendar, Users, Rocket, Mic, BookOpen, Layers, CheckCircle2, Ticket,
  Handshake, Cpu, Globe, Bell, Plus, LogOut
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

import { NexziByteLogo } from "./NexziByteLogo.jsx";

// Official NexziByte Brand Logo + TechTalk Wordmark
export function TechTalkBrandedLogo({ height = 44, theme = "dark", showSubtitle = true }) {
  return (
    <div className="techtalk-brand-logo-wrap" aria-label="NexziByte TechTalk">
      <NexziByteLogo height={height} theme={theme} showTechTalk={true} showSubtitle={showSubtitle} />
    </div>
  );
}

export const TechLogoSymbol = TechTalkBrandedLogo;

// Custom Right Arrow SVG icon matching the boxed arrow button in reference images
function DropdownArrowIcon() {
  return (
    <svg 
      width="20" 
      height="15" 
      viewBox="0 0 20 15" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="dropdown-editorial-svg"
    >
      <path d="M1 7.5h17M12 2l6 5.5-6 5.5" />
    </svg>
  );
}

export default function Navbar() {
  const { setLoginModalOpen, openPassModal, user, isLoggedIn, logout, unreadNotificationCount } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".nav-dropdown-wrapper")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnterDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const handleDropdownNav = (e, path, hashId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    // If destination is a different page, navigate directly to that page!
    if (path && path !== location.pathname) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // If on the same page and a section ID exists, scroll smoothly to that section!
    if (hashId) {
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${hashId}`);
        return;
      }
    }

    // Default scroll top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  return (
    <header className={`site-header-dark header-websummit-white ${isHomePage ? "is-home-page" : "is-inner-page"} ${scrolled ? "scrolled" : ""}`}>
      <div className="container-wide">
        <div className="navbar-inner-dark">
          {/* LEFT: Exact User Official Brand Logo + TechTalk Graphic Logo */}
          <Link to="/" className="brand-logo-link" style={{ flexShrink: 0, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "12px", marginRight: "28px" }}>
            <img 
              src="/images/nexzibyte-official-brand-logo-tight.png?v=2" 
              alt="NexziByte Solutions Pvt Ltd" 
              style={{ height: "38px", width: "auto", display: "block", objectFit: "contain" }} 
            />
            <span style={{ height: "22px", width: "1px", background: "rgba(0, 0, 0, 0.15)", display: "inline-block" }} />
            <img 
              src="/images/techtalk-logo.png" 
              alt="TechTalk" 
              style={{ height: "30px", width: "auto", display: "block", objectFit: "contain" }} 
            />
          </Link>

          {/* CENTER: Navigation with Dropdown Cards matching reference screenshots */}
          <nav className="nav-center-menu-dark" aria-label="Main Navigation">
            {/* 1. COMMUNITY (Events & Pricing) */}
            <div 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnterDropdown("community")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button 
                type="button" 
                className={`nav-dropdown-btn-pill ${activeDropdown === "community" ? "is-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("community");
                }}
                aria-expanded={activeDropdown === "community"}
              >
                <span>Community</span>
                {activeDropdown === "community" ? (
                  <ChevronUp size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                ) : (
                  <ChevronDown size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                )}
              </button>

              {activeDropdown === "community" && (
                <div 
                  className="nav-editorial-dropdown-panel" 
                  role="menu"
                  onMouseEnter={() => handleMouseEnterDropdown("community")}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <a 
                    href="/events"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/events")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Events</div>
                      <div className="dropdown-editorial-desc">Explore career-growth events</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>

                  <a 
                    href="/summits"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/summits", "industry-events")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Summits</div>
                      <div className="dropdown-editorial-desc">Flagship tech conferences &amp; stages</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>

                  <a 
                    href="/founder-meets"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/founder-meets", "founder-meets")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Founder Meets</div>
                      <div className="dropdown-editorial-desc">Venture networking &amp; founder circles</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>

                  <a 
                    href="/passes"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/passes")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Pricing</div>
                      <div className="dropdown-editorial-desc">Find out pricing options</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 2. SERVICES (Courses & Internship in place of CV & Individual Coaching) */}
            <div 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnterDropdown("services")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button 
                type="button" 
                className={`nav-dropdown-btn-pill ${activeDropdown === "services" ? "is-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("services");
                }}
                aria-expanded={activeDropdown === "services"}
              >
                <span>Services</span>
                {activeDropdown === "services" ? (
                  <ChevronUp size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                ) : (
                  <ChevronDown size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                )}
              </button>

              {activeDropdown === "services" && (
                <div 
                  className="nav-editorial-dropdown-panel" 
                  role="menu"
                  onMouseEnter={() => handleMouseEnterDropdown("services")}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <a 
                    href="/courses"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/courses")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Courses</div>
                      <div className="dropdown-editorial-desc">Industry-aligned tech courses &amp; tracks</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>

                  <a 
                    href="/internship"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/internship")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Internship</div>
                      <div className="dropdown-editorial-desc">Gain real-world experience &amp; get hired (23 Tracks)</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 3. RESOURCES (Resource center & Success stories) */}
            <div 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnterDropdown("resources")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button 
                type="button" 
                className={`nav-dropdown-btn-pill ${activeDropdown === "resources" ? "is-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("resources");
                }}
                aria-expanded={activeDropdown === "resources"}
              >
                <span>Resources</span>
                {activeDropdown === "resources" ? (
                  <ChevronUp size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                ) : (
                  <ChevronDown size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                )}
              </button>

              {activeDropdown === "resources" && (
                <div 
                  className="nav-editorial-dropdown-panel" 
                  role="menu"
                  onMouseEnter={() => handleMouseEnterDropdown("resources")}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <a 
                    href="/explore"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/explore")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Resource center</div>
                      <div className="dropdown-editorial-desc">Download our free resources</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>

                  <a 
                    href="/#testimonials"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/#testimonials", "testimonials")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Success stories</div>
                      <div className="dropdown-editorial-desc">Inspiring job search journeys</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 4. ABOUT (About us & Contact us) */}
            <div 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnterDropdown("about")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button 
                type="button" 
                className={`nav-dropdown-btn-pill ${activeDropdown === "about" ? "is-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("about");
                }}
                aria-expanded={activeDropdown === "about"}
              >
                <span>About</span>
                {activeDropdown === "about" ? (
                  <ChevronUp size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                ) : (
                  <ChevronDown size={12} strokeWidth={2.4} style={{ color: "#000000" }} />
                )}
              </button>

              {activeDropdown === "about" && (
                <div 
                  className="nav-editorial-dropdown-panel" 
                  role="menu"
                  onMouseEnter={() => handleMouseEnterDropdown("about")}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <a 
                    href="/about"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/about")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">About us</div>
                      <div className="dropdown-editorial-desc">The story behind TechTalk</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>

                  <a 
                    href="/contact"
                    className="nav-editorial-dropdown-item"
                    onClick={(e) => handleDropdownNav(e, "/contact")}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title">Contact us</div>
                      <div className="dropdown-editorial-desc">Need help? Reach out to us</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>

                  <a 
                    href="https://www.nexzibyte.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-editorial-dropdown-item"
                    onClick={() => {
                      setActiveDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    role="menuitem"
                  >
                    <div className="dropdown-editorial-content">
                      <div className="dropdown-editorial-title" style={{ color: "#EB8CED" }}>Official Website</div>
                      <div className="dropdown-editorial-desc">Visit nexzibyte.com portal</div>
                    </div>
                    <div className="dropdown-editorial-arrow-box" aria-hidden="true">
                      <DropdownArrowIcon />
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 5. PARTNER (Matching Screenshot 2) */}
            <Link 
              to="/partner" 
              className={`nav-partner-btn ${location.pathname === "/partner" ? "is-active" : ""}`}
              style={{ textDecoration: "none" }}
            >
              <span>Partner</span>
            </Link>
          </nav>

          {/* RIGHT: Web Summit Style Action Buttons & Profile (Pic 2 Layout) */}
          <div className="nav-right-actions-dark">
            {/* Admin Portal Shortcut Button strictly for nexzibyte@gmail.com */}
            {isLoggedIn && (user?.email?.toLowerCase().trim() === "nexzibyte@gmail.com" || user?.email?.toLowerCase().trim() === "nexzibyteadmin@gmail.com") && (
              <Link
                to="/admin"
                className="nav-admin-btn-header"
                id="nav-admin-btn"
                title="Admin Command Center"
              >
                <ShieldCheck size={14} className="nav-admin-btn-icon" />
                <span>Admin</span>
              </Link>
            )}

            {/* Book Tickets Gradient Button (Pic 2) */}
            <button 
              type="button" 
              className="websummit-nav-ticket-btn"
              onClick={() => openPassModal("visitor-pass")}
              title="Book Conference Passes"
              id="nav-book-tickets-btn"
            >
              <Ticket size={16} />
              <span>Book tickets</span>
            </button>

            {/* Login Button (Replacing Exhibit button per user request) */}
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="websummit-nav-login-btn"
                title={`Account: ${user?.name || "Profile"}`}
                aria-label="My Account"
                id="nav-account-btn"
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user?.name || "Profile"} 
                    style={{ width: "20px", height: "20px", borderRadius: "50%", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <User size={16} />
                )}
                <span>{user?.name ? user.name.split(" ")[0] : "Profile"}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="websummit-nav-login-btn"
                id="nav-login-btn"
                title="Login to TechTalk"
                aria-label="Login"
              >
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              type="button"
              className="mobile-toggle-btn-dark"
              style={{ color: "#FFFFFF" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-dark">
          {/* USER PROFILE Section */}
          {isLoggedIn ? (
            <div className="mobile-drawer-section" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.12)", paddingBottom: "14px" }}>
              <div className="mobile-drawer-category">TECHNOLOGY PROFILE &amp; ACTIONS</div>
              <Link 
                to="/profile"
                className={`mobile-nav-link-dark ${location.pathname === "/profile" ? "active-mobile-blue" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5768D2", fontWeight: 700 }}
              >
                <User size={18} />
                <span>{user?.name || "M. L. S. V. Aiswarya"} (View Profile)</span>
              </Link>
              {/* ADMIN COMMAND CENTER strictly for nexzibyte@gmail.com */}
              {isLoggedIn && (user?.email?.toLowerCase().trim() === "nexzibyte@gmail.com" || user?.email?.toLowerCase().trim() === "nexzibyteadmin@gmail.com") && (
                <Link 
                  to="/admin"
                  className="mobile-nav-link-dark"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: "10px", color: "#EB8CED", fontWeight: 800, marginTop: "6px" }}
                >
                  <ShieldCheck size={18} />
                  <span> Admin Portal &amp; Member Analytics</span>
                </Link>
              )}
              <Link 
                to="/create-post"
                className="mobile-nav-link-dark"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5768D2", fontWeight: 700, marginTop: "6px" }}
              >
                <Plus size={18} />
                <span>+ Create Technical Dispatch</span>
              </Link>
              <Link 
                to="/profile?tab=notifications"
                className="mobile-nav-link-dark"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}
              >
                <Bell size={18} />
                <span>Notifications {unreadNotificationCount > 0 ? `(${unreadNotificationCount} unread)` : ""}</span>
              </Link>
            </div>
          ) : (
            <div className="mobile-drawer-section" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.12)", paddingBottom: "14px" }}>
              <div className="mobile-drawer-category">COMMUNITY ACCOUNT</div>
              <Link 
                to="/login"
                className="mobile-nav-link-dark"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5768D2", fontWeight: 700 }}
              >
                <User size={18} />
                <span>Sign In to NexziByte TechTalk</span>
              </Link>
            </div>
          )}

          {/* COMMUNITY Section */}
          <div className="mobile-drawer-section">
            <div className="mobile-drawer-category">COMMUNITY</div>
            <button 
              type="button" 
              className={`mobile-nav-link-dark ${location.pathname === "/events" ? "active-mobile-blue" : ""}`}
              onClick={() => handleNavigation("/events", null)}
            >
              Events (Upcoming &amp; Discovery)
            </button>
            <button 
              type="button" 
              className={`mobile-nav-link-dark ${location.pathname.startsWith("/summits") ? "active-mobile-blue" : ""}`}
              onClick={() => handleNavigation("/summits", null)}
            >
              Summits (Flagship Conferences)
            </button>
            <button 
              type="button" 
              className={`mobile-nav-link-dark ${location.pathname.startsWith("/founder-meets") ? "active-mobile-blue" : ""}`}
              onClick={() => handleNavigation("/founder-meets", null)}
            >
              Founder Meets (Venture Network)
            </button>
            <button 
              type="button" 
              className="mobile-nav-link-dark" 
              onClick={() => handleNavigation("/pricing", null)}
            >
              Pricing &amp; Passes
            </button>
          </div>

          {/* SERVICES Section */}
          <div className="mobile-drawer-section">
            <div className="mobile-drawer-category">SERVICES</div>
            <button 
              type="button" 
              className={`mobile-nav-link-dark ${location.pathname === "/courses" ? "active-mobile-blue" : ""}`}
              onClick={() => handleNavigation("/courses", "tech-topics")}
            >
              Courses (65+ Tracks)
            </button>
            <button 
              type="button" 
              className={`mobile-nav-link-dark ${location.pathname === "/internship" ? "active-mobile-blue" : ""}`}
              onClick={() => handleNavigation("/internship", null)}
            >
              Internship (23 Specialized Tracks)
            </button>
          </div>

          {/* RESOURCES Section */}
          <div className="mobile-drawer-section">
            <div className="mobile-drawer-category">RESOURCES</div>
            <button 
              type="button" 
              className="mobile-nav-link-dark" 
              onClick={() => handleNavigation("/explore", null)}
            >
              Resource Center &amp; Articles
            </button>
            <button 
              type="button" 
              className="mobile-nav-link-dark" 
              onClick={() => handleNavigation("/#testimonials", "testimonials")}
            >
              Success Stories
            </button>
          </div>

          {/* ABOUT & PARTNER Section */}
          <div className="mobile-drawer-section">
            <div className="mobile-drawer-category">ABOUT &amp; PARTNER</div>
            <button 
              type="button" 
              className="mobile-nav-link-dark" 
              onClick={() => handleNavigation("/about", null)}
            >
              About Us
            </button>
            <button 
              type="button" 
              className="mobile-nav-link-dark" 
              onClick={() => handleNavigation("/contact", null)}
            >
              Contact Us
            </button>
            <a 
              href="https://www.nexzibyte.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mobile-nav-link-dark"
              style={{ color: "#EB8CED", textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Official Website (nexzibyte.com) ↗
            </a>
            <Link 
              to="/partner" 
              className="mobile-nav-link-dark" 
              style={{ textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Partner With Us
            </Link>
          </div>
          
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            {isLoggedIn ? (
              <Link 
                to="/profile"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", textDecoration: "none" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={15} />
                <span>My Account</span>
              </Link>
            ) : (
              <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                <Link 
                  to="/login"
                  className="btn btn-secondary btn-sm"
                  style={{ 
                    flex: 1, 
                    textAlign: "center", 
                    textDecoration: "none", 
                    borderRadius: "9999px", 
                    border: "2px solid #5768D2", 
                    background: "#014C8F", 
                    color: "#FFFFFF", 
                    fontWeight: 700,
                    boxShadow: "0 0 10px rgba(87, 104, 210, 0.25)"
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
            <button 
              type="button" 
              className="nav-join-community-btn"
              style={{ flex: 1 }}
              onClick={() => { setMobileMenuOpen(false); openPassModal("visitor-pass"); }}
            >
              Join Community
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
