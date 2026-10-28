import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const SKILL_ITEMS = [
  {
    id: "learn",
    title: "NexziByte Learn",
    desc: "Develop practical skills through interactive modules or learn from an instructor.",
    image: "/images/skill-learn-modules.jpg",
    btnText: "Learn more",
    link: "/courses"
  },
  {
    id: "community-hub",
    title: "NexziByte Community Hub",
    desc: "Connect with your peers, find answers to your questions, and build new relationships.",
    image: "/images/skill-community-hub.jpg",
    btnText: "Learn more",
    link: "/community"
  },
  {
    id: "reactor",
    title: "NexziByte Reactor",
    desc: "Explore hands-on learning and expert-led training events from around the globe. Dive into AI, coding, and the latest technology trends.",
    image: "/images/skill-reactor-lab.jpg",
    btnText: "Discover more",
    link: "/events"
  }
];

export default function DevelopSkills() {
  const navigate = useNavigate();

  return (
    <section className="develop-skills-section" id="develop-skills">
      <div className="container">
        {/* Centered Section Header */}
        <div className="develop-skills-header">
          <span className="develop-skills-overtitle">
            ADDITIONAL LEARNING
          </span>
          <h2 className="develop-skills-title">
            Develop new skills
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="develop-skills-grid">
          {SKILL_ITEMS.map((item) => (
            <div key={item.id} className="develop-skill-card">
              <div className="develop-skill-media">
                <img
                  src={item.image}
                  alt={item.title}
                  className="develop-skill-img"
                  loading="lazy"
                />
              </div>

              <div className="develop-skill-content">
                <h3 className="develop-skill-name">{item.title}</h3>
                <p className="develop-skill-desc">{item.desc}</p>

                <div className="develop-skill-action">
                  <button
                    type="button"
                    onClick={() => navigate(item.link)}
                    className="fluent-action-link-btn"
                    aria-label={`${item.btnText} about ${item.title}`}
                  >
                    <span className="fluent-chevron-box">
                      <ChevronRight size={14} strokeWidth={2.6} />
                    </span>
                    <span className="fluent-btn-label">{item.btnText}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
