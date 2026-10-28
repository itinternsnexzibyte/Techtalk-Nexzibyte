import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function SelectPlanEvents() {
  const navigate = useNavigate();

  return (
    <section className="select-plan-section" id="select-plan-events">
      <div className="container">
        {/* Centered Section Header */}
        <div className="select-plan-header">
          <span className="select-plan-overtitle">
            NEXT STEPS
          </span>
          <h2 className="select-plan-title">
            Select and plan your next event experience
          </h2>
        </div>

        {/* Highlight Banner Card with Ambient Pastel Gradient */}
        <div className="select-plan-banner-card">
          <div className="select-plan-banner-body">
            <h3 className="select-plan-banner-heading">
              Find events to fit your needs
            </h3>
            <p className="select-plan-banner-subtitle">
              With events focused on everything from high-level innovations to hands-on workshops, there's something for everyone.
            </p>
            <div className="select-plan-banner-action">
              <button
                type="button"
                onClick={() => navigate("/events")}
                className="select-plan-search-btn"
                aria-label="Search events"
              >
                Search events
              </button>
            </div>
          </div>
        </div>

        {/* 2 Split Cards Below Banner */}
        <div className="select-plan-split-grid">
          {/* Card 1: Accessible Future */}
          <div className="select-plan-split-card">
            <div className="select-plan-split-content">
              <h3 className="select-plan-split-heading">
                Building a more accessible future
              </h3>
              <p className="select-plan-split-desc">
                Explore accessibility guidance, trainings, and products.
              </p>
              <div className="select-plan-split-action">
                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className="fluent-action-link-btn"
                  aria-label="Learn more about building a more accessible future"
                >
                  <span className="fluent-chevron-box">
                    <ChevronRight size={14} strokeWidth={2.6} />
                  </span>
                  <span className="fluent-btn-label">Learn more</span>
                </button>
              </div>
            </div>

            <div className="select-plan-split-media">
              <img
                src="/images/event-accessibility.jpg"
                alt="Building a more accessible future"
                className="select-plan-split-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 2: Code of Conduct */}
          <div className="select-plan-split-card">
            <div className="select-plan-split-content">
              <h3 className="select-plan-split-heading">
                NexziByte Events Code of Conduct
              </h3>
              <p className="select-plan-split-desc">
                To encourage a welcoming and safe environment, we ask all event participants to uphold the principles of the Code of Conduct.
              </p>
              <div className="select-plan-split-action">
                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className="fluent-action-link-btn"
                  aria-label="Learn more about NexziByte Events Code of Conduct"
                >
                  <span className="fluent-chevron-box">
                    <ChevronRight size={14} strokeWidth={2.6} />
                  </span>
                  <span className="fluent-btn-label">Learn more</span>
                </button>
              </div>
            </div>

            <div className="select-plan-split-media">
              <img
                src="/images/event-code-of-conduct.jpg"
                alt="NexziByte Events Code of Conduct"
                className="select-plan-split-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
