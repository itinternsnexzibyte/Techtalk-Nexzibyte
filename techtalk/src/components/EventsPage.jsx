import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, Clock, MapPin, 
  Users, ExternalLink, ChevronRight,
  Mic, Award, Star, Sparkles,
  Cpu, Lightbulb, Search, ArrowRight
} from "lucide-react";
import { 
  DEDICATED_PAST_EVENTS 
} from "../data/mockData.js";
import { useApp } from "../context/AppContext.jsx";

// Modals
import EventDetailModal from "./EventDetailModal.jsx";
import PastEventHighlightsModal from "./PastEventHighlightsModal.jsx";
import HostEventModal from "./HostEventModal.jsx";

export default function EventsPage() {
  const { showToast } = useApp();

  // Modal States
  const [selectedEventForDetail, setSelectedEventForDetail] = useState(null);
  const [autoFocusRegister, setAutoFocusRegister] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [selectedPastEvent, setSelectedPastEvent] = useState(null);
  const [pastModalOpen, setPastModalOpen] = useState(false);

  const [hostModalOpen, setHostModalOpen] = useState(false);
  const [hostModalType, setHostModalType] = useState("host"); // "host" or "speaker"

  // Open Event Details
  const handleOpenEventDetails = (event, focusRegister = false) => {
    setSelectedEventForDetail(event);
    setAutoFocusRegister(focusRegister);
    setDetailModalOpen(true);
  };

  // Open Past Event Highlights
  const handleOpenPastHighlights = (pastEvt) => {
    setSelectedPastEvent(pastEvt);
    setPastModalOpen(true);
  };

  // Open Host / Speaker Modal
  const handleOpenHostModal = (type) => {
    setHostModalType(type);
    setHostModalOpen(true);
  };

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="events-page-root">
      {/* ══════════════════════════════════════════════════════════════════
          1. DISCOVERY SESSIONS HERO BANNER
          Matching Screenshot 1: Centered, Compact Ambient Gradient, No Image
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-hero-section hero-gradient-events">
        <div className="container">
          <div className="discovery-hero-centered-content">
            <h1 className="discovery-hero-title">
              TechTalk Discovery Sessions
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. DISCOVER, LEARN, AND INNOVATE (3 IMAGE CARDS)
          Reference Screenshot 2
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-cards-section">
        <div className="container">
          <div className="discovery-cards-header">
            <h2 className="discovery-cards-title">
              Discover, learn, and innovate
            </h2>
            <p className="discovery-cards-subtitle">
              Explore the latest technologies through one-hour digital events. These intermediate classes combine demonstrations, customer scenarios, and expert insights to help you understand what's possible.
            </p>
          </div>

          <div className="discovery-cards-grid">
            {/* Card 1: Explore solutions in action */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-solutions-action.jpg"
                  alt="Explore solutions in action"
                  className="discovery-card-img"
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Explore solutions in action
                </h3>
                <p className="discovery-card-text">
                  Discover real-world innovations, customer use cases, and trends shaping the future of business. Uncover new opportunities and what they could mean for your company.
                </p>
              </div>
            </div>

            {/* Card 2: Bring technology to life */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-tech-life.jpg"
                  alt="Bring technology to life"
                  className="discovery-card-img"
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Bring technology to life
                </h3>
                <p className="discovery-card-text">
                  See how organizations are using AI, cloud, data, and security technologies to modernize operations, unlock intelligence, and accelerate innovation.
                </p>
              </div>
            </div>

            {/* Card 3: Turn insight into action */}
            <div className="discovery-card-item">
              <div className="discovery-card-media">
                <img
                  src="/images/events-insight-action.jpg"
                  alt="Turn insight into action"
                  className="discovery-card-img"
                />
              </div>
              <div className="discovery-card-body">
                <h3 className="discovery-card-heading">
                  Turn insight into action
                </h3>
                <p className="discovery-card-text">
                  Leave with practical insights, expert guidance, and the resources to help you deepen your knowledge, explore new opportunities, and advance your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. WHY ATTEND / ACCELERATE TRANSFORMATION
          Reference Screenshot 3
          ══════════════════════════════════════════════════════════════════ */}
      <section className="discovery-why-section">
        <div className="container">
          <div className="discovery-why-header">
            <span className="discovery-overtitle">
              WHY ATTEND
            </span>
            <h2 className="discovery-why-title">
              Accelerate transformation
            </h2>
            <p className="discovery-why-subtitle">
              Designed for business leaders, technical decision-makers, and practitioners. Discovery Sessions deliver role-relevant conversations on topics like AI, business process transformation, trusted data, security, and modernization.
            </p>
          </div>

          <div className="discovery-why-grid">
            {/* Feature 1: Stay ahead of what's next */}
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Sparkles size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Stay ahead of what's next
              </h3>
              <p className="discovery-why-col-desc">
                Learn how emerging AI and cloud innovations can reshape your business—and gain the knowledge to act on them first.
              </p>
            </div>

            {/* Feature 2: Inform your strategic decisions */}
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Cpu size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Inform your strategic decisions
              </h3>
              <p className="discovery-why-col-desc">
                Get practical insights into security, data, and AI strategies to evaluate opportunities, guide your investments, and align with your business priorities.
              </p>
            </div>

            {/* Feature 3: Move from insight to action */}
            <div className="discovery-why-col">
              <div className="discovery-why-icon-wrap">
                <Lightbulb size={24} />
              </div>
              <h3 className="discovery-why-col-title">
                Move from insight to action
              </h3>
              <p className="discovery-why-col-desc">
                Discover proven approaches from industry experts and walk away with clear next steps for your own learning, adoption, and transformation.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          5. PAST NEXZIBYTE EVENTS ARCHIVE
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-past-section" id="past-events-section">
        <div className="container">
          <div className="events-section-header-row">
            <div>
              <div className="events-section-tag">
                <Award size={13} className="text-blue-accent" />
                <span>ARCHIVE &amp; IMPACT DISPATCHES</span>
              </div>
              <h2 className="events-section-heading">Past Events</h2>
              <p className="events-section-subtitle">
                Explore previous NexziByte summits, industry conferences, and developer networking sessions that shaped tech conversations.
              </p>
            </div>
          </div>

          <div className="past-events-three-col-grid">
            {DEDICATED_PAST_EVENTS.map((pastEvt) => (
              <div key={pastEvt.id} className="past-event-archive-card">
                <div className="past-card-img-wrap">
                  <img 
                    src={pastEvt.image} 
                    alt={pastEvt.title} 
                    className="past-card-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/events-tech-stage.jpg";
                    }}
                  />
                  <span className="past-badge-pill">{pastEvt.category}</span>
                </div>

                <div className="past-card-content">
                  <div className="past-card-meta-row">
                    <div className="past-meta-item">
                      <Calendar size={13} className="text-blue-accent" />
                      <span>{pastEvt.date}</span>
                    </div>
                    <div className="past-meta-item">
                      <MapPin size={13} className="text-blue-accent" />
                      <span>{pastEvt.location}</span>
                    </div>
                  </div>

                  <h3 className="past-card-title">{pastEvt.title}</h3>

                  <p className="past-card-desc">{pastEvt.description}</p>

                  <div className="past-card-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm btn-full"
                      onClick={() => handleOpenPastHighlights(pastEvt)}
                    >
                      <span>View Highlights</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. HOST AN EVENT / COLLABORATE SECTION
          ══════════════════════════════════════════════════════════════════ */}
      <section className="events-host-collab-section">
        <div className="container">
          <div className="host-collab-box collab-gradient-events">
            <div className="host-collab-ambient-glow" aria-hidden="true" />

            <div className="host-collab-inner">
              <span className="host-collab-tag">
                PARTNERSHIP &amp; COMMUNITY COLLABORATION
              </span>

              <h2 className="host-collab-heading">
                Want to Host or Collaborate on an Event?
              </h2>

              <p className="host-collab-text">
                Partner with NexziByte TechTalk to organize workshops, tech talks, community meetups and industry-focused learning experiences.
              </p>

              <div className="host-collab-btn-row">
                <button 
                  type="button" 
                  className="btn btn-blue-primary btn-lg"
                  onClick={() => handleOpenHostModal("host")}
                >
                  <Calendar size={18} />
                  <span>Host an Event</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-secondary btn-lg"
                  onClick={() => handleOpenHostModal("speaker")}
                >
                  <Mic size={18} />
                  <span>Become a Speaker</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MODALS
          ══════════════════════════════════════════════════════════════════ */}
      {/* Event Detail Modal with Registration Card */}
      <EventDetailModal 
        event={selectedEventForDetail}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        autoFocusRegister={autoFocusRegister}
      />

      {/* Past Event Highlights Modal */}
      <PastEventHighlightsModal 
        event={selectedPastEvent}
        isOpen={pastModalOpen}
        onClose={() => setPastModalOpen(false)}
      />

      {/* Host / Speaker Modal */}
      <HostEventModal 
        isOpen={hostModalOpen}
        onClose={() => setHostModalOpen(false)}
        defaultType={hostModalType}
      />
    </div>
  );
}
