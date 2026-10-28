import React from "react";
import { Link } from "react-router-dom";
import { 
  Globe, Mail, MapPin, Building, Rocket, Cpu, 
  CheckCircle2, ArrowRight, Calendar, HeartHandshake, 
  Award, Ticket, Users, Sparkles, ShieldCheck
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { NexziByteLogo } from "./NexziByteLogo.jsx";

export default function AboutUsPage() {
  const { openPassModal } = useApp();

  const scrollToOverview = () => {
    const el = document.getElementById("company-overview-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="about-page-luxury" style={{ color: "#000000", minHeight: "100vh" }}>
      {/* ══════════════════════════════════════════════════════════════════
          1. ABOUT HERO BANNER
          Tailored Hero: Centered, Compact Ambient Pastel Gradient
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-hero-section hero-gradient-about">
        <div className="container">
          <div className="discovery-hero-centered-content">
            <h1 className="discovery-hero-title">
              Empowering Tech Innovation &amp; Careers
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. INNOVATION, COMMUNITY, AND EXCELLENCE (3 VISUAL CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-cards-section">
        <div className="container">
          <div className="discovery-cards-header">
            <h2 className="discovery-cards-title">
              Innovation, community, and excellence
            </h2>
            <p className="discovery-cards-subtitle">
              Driving technical transformation through education, executive conferences, and real-world software.
            </p>
          </div>

          <div className="discovery-cards-grid">
            {/* Card 1 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-tech-life.jpg"
                  alt="Technical Excellence"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/renewable-energy.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Technical Excellence
                </h3>
                <p className="discovery-card-text">
                  Delivering modern curriculum and industry-standard architecture frameworks.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/event-delegates-networking-landscape.jpg"
                  alt="Vibrant Ecosystem"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-team-collab.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Vibrant Ecosystem
                </h3>
                <p className="discovery-card-text">
                  Bringing together 10,000+ professionals, innovators, and students across India.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/summit-gcc-announcement.jpg"
                  alt="Real-World Impact"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-tech-meetup.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Real-World Impact
                </h3>
                <p className="discovery-card-text">
                  Accelerating careers through verified internships, summits, and client partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. OUR CORE PILLARS (3 COLUMNS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-why-section">
        <div className="container">
          <div className="discovery-why-header">
            <span className="discovery-overtitle">
              OUR CORE PILLARS
            </span>
            <h2 className="discovery-why-title">
              Built on trust and practical engineering
            </h2>
            <p className="discovery-why-subtitle">
              Guiding principles that define everything we design and build.
            </p>
          </div>

          <div className="discovery-why-grid">
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Cpu size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Production First
              </h3>
              <p className="discovery-why-col-desc">
                We prioritize hands-on production engineering over dry academic theory.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Users size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Inclusive Community
              </h3>
              <p className="discovery-why-col-desc">
                Democratizing access to high-signal technical education and venture networks.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Award size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Verified Credentials
              </h3>
              <p className="discovery-why-col-desc">
                Every certification, pass, and milestone is digitally verified and trusted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. CORPORATE IDENTITY & LEADERSHIP
          ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding" id="company-overview-section" style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div className="events-section-header-row" style={{ marginBottom: "32px" }}>
            <div>
              <div className="events-section-tag">
                <Building size={13} className="text-blue-accent" />
                <span>CORPORATE GOVERNANCE &amp; IDENTITY</span>
              </div>
              <h2 className="events-section-heading" style={{ color: "#000000" }}>
                NexziByte Solutions Private Limited
              </h2>
              <p className="events-section-subtitle" style={{ color: "#000000" }}>
                Incorporated technology solutions company registered in Hyderabad, Telangana.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {/* Card 1: Registered Office & Details */}
            <div className="event-card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <Building size={20} style={{ color: "#2563EB" }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#000000", margin: 0 }}>Registered Office</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem", color: "#000000", lineHeight: 1.6 }}>
                <div>
                  <strong style={{ display: "block", color: "#000000", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Corporate Address</strong>
                  <span>H. No. 19-125/A, Kodandaram Nagar, Saroornagar, K.V. Rangareddy, Hyderabad, Telangana 500060, India</span>
                </div>
                <div>
                  <strong style={{ display: "block", color: "#000000", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Industry Classification</strong>
                  <span>IT Services &amp; Consulting &bull; AI Platforms &amp; Digital Engineering</span>
                </div>
                <div>
                  <strong style={{ display: "block", color: "#000000", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Directors</strong>
                  <span>Durga Prasad Nagunoori &bull; Narasaiah Nagunoori</span>
                </div>
              </div>
            </div>

            {/* Card 2: Digital Ecosystem & Contact */}
            <div className="event-card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <Globe size={20} style={{ color: "#2563EB" }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#000000", margin: 0 }}>Digital Channels</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.9rem", color: "#000000", lineHeight: 1.6 }}>
                <div>
                  <strong style={{ display: "block", color: "#000000", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Official Website</strong>
                  <a href="https://www.nexzibyte.com" target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", fontWeight: 600 }}>
                    www.nexzibyte.com
                  </a>
                </div>
                <div>
                  <strong style={{ display: "block", color: "#000000", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Inquiries &amp; Support</strong>
                  <a href="mailto:connect@nexzibyte.com" style={{ color: "#2563EB", fontWeight: 600 }}>
                    connect@nexzibyte.com
                  </a>
                </div>
                <div>
                  <strong style={{ display: "block", color: "#000000", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ecosystem Network</strong>
                  <span>TechTalk &bull; PyEnk &bull; Stafi Enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. GET INVOLVED / CONNECT CTA
          Pastel Ambient Gradient Card + Pure Black Letters
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-host-collab-section">
        <div className="container">
          <div className="host-collab-box collab-gradient-about">
            <div className="host-collab-inner">
              <span className="host-collab-tag">
                GET INVOLVED
              </span>

              <h2 className="host-collab-heading">
                Join the NexziByte Innovation Movement
              </h2>

              <p className="host-collab-text">
                Whether you're an engineer looking to grow, a founder seeking capital, or a company seeking partners, we'd love to connect.
              </p>

              <div className="host-collab-btn-row">
                <Link to="/events" className="btn btn-blue-primary btn-lg">
                  <Calendar size={18} />
                  <span>Explore Upcoming Events</span>
                </Link>

                <Link to="/contact" className="btn btn-secondary btn-lg">
                  <Mail size={18} />
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
