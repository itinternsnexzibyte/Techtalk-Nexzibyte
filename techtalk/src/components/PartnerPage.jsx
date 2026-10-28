import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, Users, Mic, Award, CheckCircle2, 
  ArrowRight, Mail, Phone, MapPin, Sparkles, 
  ShieldCheck, Send, Check, Rocket, Globe, 
  Briefcase, Star, ChevronRight, HelpCircle
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { api } from "../services/api.js";

// Partnership Tracks Data with Reduced Matter
const PARTNERSHIP_TRACKS = [
  {
    id: "summit-sponsor",
    tag: "HIGH VISIBILITY",
    tagColor: "#2563EB",
    title: "Summit Title & Lead Sponsor",
    desc: "Position your brand at the center of South India's largest technology summits with premium demo zones and keynote speaking slots.",
    stats: "400+ Enterprise Delegates",
    benefits: [
      "Keynote speaking slot & opening remarks",
      "Prime exhibition / demo booth in developer zone",
      "Brand logo on all attendee digital passes"
    ]
  },
  {
    id: "hiring-talent",
    tag: "TALENT ACQUISITION",
    tagColor: "#059669",
    title: "Enterprise Hiring & Talent Partner",
    desc: "Direct access to NexziByte's verified developer ecosystem. Hire pre-vetted full-stack architects and AI/ML engineers.",
    stats: "140+ Partner Enterprises",
    benefits: [
      "Custom candidate screening drives & hackathons",
      "Direct pipeline to verified engineer database",
      "Dedicated spot-interview cabins at summits"
    ]
  },
  {
    id: "speaking-leadership",
    tag: "THOUGHT LEADERSHIP",
    tagColor: "#6C2BD9",
    title: "Keynote & Expert Speaking Engagements",
    desc: "Share your engineering breakthroughs and system architectures with hungry tech professionals and aspiring founders.",
    stats: "50+ Industry Speakers",
    benefits: [
      "Solo technical session or fireside panel",
      "Recorded video masterclass distributed globally",
      "Permanent featured author profile on platform"
    ]
  },
  {
    id: "corporate-mou",
    tag: "STRATEGIC ALLIANCE",
    tagColor: "#D97706",
    title: "Corporate MoU & Ecosystem Co-Host",
    desc: "Forge long-term institutional agreements to co-create tech incubation programs, GCC capability hubs, and regional roundtables.",
    stats: "13+ Strategic Partners",
    benefits: [
      "Joint press release and government visibility",
      "Cross-platform branding across NexziByte network",
      "Quarterly closed-door CIO/CTO roundtable invites"
    ]
  }
];

export default function PartnerPage() {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    partnershipType: "Summit Title & Lead Sponsor",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const code = `NZB-PRT-${Math.floor(1000 + Math.random() * 9000)}`;
    setInquiryCode(code);

    try {
      await api.submitContactMessage({
        name: fullName || "Corporate Partner",
        email: formData.email.trim(),
        phone: formData.phone || "",
        organization: formData.company || "",
        form_type: "partnership",
        subject: `Partnership Inquiry: ${formData.partnershipType}`,
        message: `Company: ${formData.company || "N/A"}\nPartnership Tier: ${formData.partnershipType}\nReference Code: ${code}\nMessage: ${formData.message || "N/A"}`
      });
    } catch (err) {
      console.warn("Partner inquiry submission notice:", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    showToast("Thank you! Your partnership inquiry has been received. We will contact you within 24 hours.");
  };

  const scrollToInquiry = () => {
    const el = document.getElementById("partnership-inquiry-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="partner-page-root">
      {/* ══════════════════════════════════════════════════════════════════
          1. PARTNER HERO BANNER
          Tailored Hero: Centered, Compact Ambient Pastel Gradient
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-hero-section hero-gradient-partner">
        <div className="container">
          <div className="discovery-hero-centered-content">
            <h1 className="discovery-hero-title">
              Enterprise Partnerships &amp; Ecosystem Co-Hosting
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. AMPLIFY YOUR REACH, SPONSOR INNOVATION (3 VISUAL CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-cards-section">
        <div className="container">
          <div className="discovery-cards-header">
            <h2 className="discovery-cards-title">
              Amplify your reach, sponsor innovation
            </h2>
            <p className="discovery-cards-subtitle">
              Strategic partnership channels designed for tech enterprises, fast-scaling startups, and GCCs.
            </p>
          </div>

          <div className="discovery-cards-grid">
            {/* Card 1 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-tech-stage.jpg"
                  alt="Summit Sponsorship & Demo Booths"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/renewable-energy.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Summit Sponsorship &amp; Booths
                </h3>
                <p className="discovery-card-text">
                  Showcase products to hundreds of enterprise delegates, founders, and technical decision-makers.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/event-delegates-networking-landscape.jpg"
                  alt="Talent Acquisition & Hiring Drives"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/events-team-collab.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Talent Acquisition Drives
                </h3>
                <p className="discovery-card-text">
                  Direct access to pre-screened full-stack developers, AI engineers, and specialized tech interns.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/summit-mou.jpg"
                  alt="Strategic MoUs & GCC Co-Hosting"
                  className="discovery-card-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/summit-gcc-announcement.jpg";
                  }}
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Strategic MoUs &amp; Co-Hosting
                </h3>
                <p className="discovery-card-text">
                  Collaborate on long-term capability centers, incubation cohorts, and regional tech mixers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. WHY PARTNER WITH US (3 COLUMNS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-why-section">
        <div className="container">
          <div className="discovery-why-header">
            <span className="discovery-overtitle">
              WHY PARTNER WITH TECHTALK
            </span>
            <h2 className="discovery-why-title">
              High-conversion enterprise engagement
            </h2>
            <p className="discovery-why-subtitle">
              Designed to maximize your brand equity, engineering recruitment, and business development.
            </p>
          </div>

          <div className="discovery-why-grid">
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Globe size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Unrivaled Reach
              </h3>
              <p className="discovery-why-col-desc">
                Connect with 10,000+ engineers, architects, founders, and students across tech hubs.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Users size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                High-Conversion Hiring
              </h3>
              <p className="discovery-why-col-desc">
                Fill open technical roles in weeks through curated hackathons and demo sessions.
              </p>
            </div>

            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Award size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Ecosystem Authority
              </h3>
              <p className="discovery-why-col-desc">
                Position your company as a modern tech leader alongside respected industry brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. PARTNERSHIP TRACKS SHOWCASE
          ══════════════════════════════════════════════════════════════════ */}
      <section className="partner-tracks-section" style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div className="events-section-header-row" style={{ marginBottom: "32px" }}>
            <div>
              <div className="events-section-tag">
                <Briefcase size={13} className="text-blue-accent" />
                <span>PARTNERSHIP TIERS &amp; CHANNELS</span>
              </div>
              <h2 className="events-section-heading" style={{ color: "#000000" }}>
                Select a Collaboration Track
              </h2>
              <p className="events-section-subtitle" style={{ color: "#000000" }}>
                Tailored opportunities for sponsors, hiring partners, keynote speakers, and corporate alliances.
              </p>
            </div>
          </div>

          <div className="partner-tracks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {PARTNERSHIP_TRACKS.map((track) => (
              <div key={track.id} className="partner-track-card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: track.tagColor, background: `${track.tagColor}15`, padding: "4px 10px", borderRadius: "9999px" }}>
                    {track.tag}
                  </span>
                  <span style={{ fontSize: "0.8125rem", color: "#000000", fontWeight: 600 }}>
                    {track.stats}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#000000", margin: "0 0 8px 0" }}>
                  {track.title}
                </h3>

                <p style={{ fontSize: "0.9rem", color: "#000000", lineHeight: 1.55, margin: "0 0 16px 0" }}>
                  {track.desc}
                </p>

                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {track.benefits.map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#000000" }}>
                      <CheckCircle2 size={14} style={{ color: "#16A34A", flexShrink: 0 }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: "auto", width: "100%", justifyContent: "center" }}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, partnershipType: track.title }));
                    scrollToInquiry();
                  }}
                >
                  <span>Select Track</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. DIRECT PARTNERSHIP INQUIRY BOX
          Pastel Ambient Gradient Card + Pure Black Letters
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-host-collab-section" id="partnership-inquiry-section">
        <div className="container">
          <div className="host-collab-box collab-gradient-partner" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div className="host-collab-inner" style={{ maxWidth: "760px" }}>
              <span className="host-collab-tag">
                PARTNERSHIP APPLICATION
              </span>

              <h2 className="host-collab-heading">
                Connect With Our Corporate Partnerships Team
              </h2>

              <p className="host-collab-text">
                Tell us about your organization's goals or sponsorship requirements. We will design a custom proposal within 24 hours.
              </p>

              {submitted ? (
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
                  <CheckCircle2 size={42} style={{ color: "#16A34A", margin: "0 auto 12px" }} />
                  <h3 style={{ color: "#000000", fontWeight: 700, margin: "0 0 8px 0" }}>Inquiry Dispatched Successfully!</h3>
                  <p style={{ color: "#000000", fontSize: "0.92rem", margin: "0 0 16px 0" }}>Reference Code: <strong>{inquiryCode}</strong></p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ textAlign: "left", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "28px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "#000000", marginBottom: "6px" }}>First Name *</label>
                      <input
                        type="text"
                        required
                        className="events-search-input"
                        placeholder="e.g. Rahul"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        style={{ border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px 14px", width: "100%", color: "#000000" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "#000000", marginBottom: "6px" }}>Last Name *</label>
                      <input
                        type="text"
                        required
                        className="events-search-input"
                        placeholder="e.g. Sharma"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        style={{ border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px 14px", width: "100%", color: "#000000" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "#000000", marginBottom: "6px" }}>Work Email *</label>
                      <input
                        type="email"
                        required
                        className="events-search-input"
                        placeholder="rahul@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px 14px", width: "100%", color: "#000000" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "#000000", marginBottom: "6px" }}>Company / Organization *</label>
                      <input
                        type="text"
                        required
                        className="events-search-input"
                        placeholder="e.g. Google Cloud, Infosys"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px 14px", width: "100%", color: "#000000" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "#000000", marginBottom: "6px" }}>Partnership Track *</label>
                    <select
                      className="events-search-input"
                      value={formData.partnershipType}
                      onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                      style={{ border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px 14px", width: "100%", color: "#000000", background: "#FFFFFF" }}
                    >
                      <option value="Summit Title & Lead Sponsor">Summit Title &amp; Lead Sponsor</option>
                      <option value="Enterprise Hiring & Talent Partner">Enterprise Hiring &amp; Talent Partner</option>
                      <option value="Keynote & Expert Speaking Engagements">Keynote &amp; Expert Speaking Engagements</option>
                      <option value="Corporate MoU & Ecosystem Co-Host">Corporate MoU &amp; Ecosystem Co-Host</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-blue-primary btn-lg"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? "Dispatching..." : "Submit Partnership Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
