import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedContentCTA({
  id = "featured-content-cta",
  heading = "TechTalk Discovery Sessions",
  subtitle = "See what's possible with modern technologies through TechTalk Discovery Sessions — an always-on series of digital events featuring live demos, expert perspectives, and practical insights to help you achieve more with NexziByte.",
  buttonText = "Explore all events",
  buttonLink = "/events",
  className = ""
}) {
  const navigate = useNavigate();

  return (
    <section
      className={`featured-content-cta-section featured-content-cta-block ${className}`.trim()}
      id={id}
    >
      <div className="featured-content-block-inner">
        <div className="featured-content-body">
          {/* Heading */}
          <h2 className="featured-content-heading">
            {heading}
          </h2>

          {/* Subtitle */}
          <p className="featured-content-subtitle">
            {subtitle}
          </p>

          {/* Action CTA Button */}
          <div className="featured-content-action-wrap">
            <button
              type="button"
              onClick={() => navigate(buttonLink)}
              className="featured-cta-pic1-btn"
              aria-label={buttonText}
            >
              <span>{buttonText}</span>
              <ArrowRight size={17} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
