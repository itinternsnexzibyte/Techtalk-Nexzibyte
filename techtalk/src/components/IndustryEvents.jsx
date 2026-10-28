import React from "react";
import { useNavigate } from "react-router-dom";

export default function IndustryEvents() {
  const navigate = useNavigate();

  return (
    <section className="industry-events-section" id="industry-events">
      <div className="container">
        {/* Centered Section Header matching Reference Screenshot */}
        <div className="industry-events-header">
          <span className="industry-events-overtitle">
            INDUSTRY EVENTS
          </span>
          <h2 className="industry-events-title">
            Come meet us
          </h2>
        </div>

        {/* Large Rounded Showcase Card matching Reference Screenshot */}
        <div className="industry-events-card">
          <div className="industry-events-card-content">
            <h3 className="industry-events-card-heading">
              Join us at an upcoming industry event
            </h3>
            <p className="industry-events-card-desc">
              Discover how NexziByte TechTalk participates in premier global technology summits, developer conferences, and innovation symposiums. Plan to connect with our leadership and engineering teams on the expo floor.
            </p>
            <div className="industry-events-card-action">
              <button
                type="button"
                onClick={() => navigate("/events")}
                className="industry-events-learn-btn"
                aria-label="Learn more about upcoming industry events"
              >
                Learn more
              </button>
            </div>
          </div>

          <div className="industry-events-card-media">
            <img
              src="/images/industry-events-expo.jpg"
              alt="Join us at an upcoming industry event"
              className="industry-events-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
