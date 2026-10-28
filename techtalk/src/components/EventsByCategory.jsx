import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";

export default function EventsByCategory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Audience");
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const categoriesData = {
    Audience: [
      {
        id: "decision-makers",
        title: "Decision-makers",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
        fallbackImage: "/images/event-delegates-networking.jpg",
        link: "/events?audience=decision-makers"
      },
      {
        id: "developers",
        title: "Developers",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
        fallbackImage: "/images/events-workshop.jpg",
        link: "/events?audience=developers"
      },
      {
        id: "executives",
        title: "Executives",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80",
        fallbackImage: "/images/event-vertofi-partnership.jpg",
        link: "/events?audience=executives"
      },
      {
        id: "it-professionals",
        title: "IT professionals",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
        fallbackImage: "/images/events-tech-stage.jpg",
        link: "/events?audience=it-professionals"
      },
      {
        id: "partners",
        title: "Partners",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
        fallbackImage: "/images/event-global-partners.png",
        link: "/events?audience=partners"
      },
      {
        id: "students-education",
        title: "Students and education",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
        fallbackImage: "/images/courses-students-collab.jpg",
        link: "/events?audience=students"
      },
      {
        id: "other-professionals",
        title: "Other professionals",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
        fallbackImage: "/images/events-team-collab.jpg",
        link: "/events?audience=professionals"
      }
    ],
    Topic: [
      {
        id: "ai-genai",
        title: "Artificial Intelligence",
        image: "/images/generative-ai.jpg",
        fallbackImage: "/images/generative-ai.jpg",
        link: "/events?topic=ai"
      },
      {
        id: "cloud-devops",
        title: "Cloud & DevOps",
        image: "/images/docker-containerization.jpg",
        fallbackImage: "/images/docker-containerization.jpg",
        link: "/events?topic=cloud"
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity",
        image: "/images/digital-engineering.jpg",
        fallbackImage: "/images/digital-engineering.jpg",
        link: "/events?topic=cybersecurity"
      },
      {
        id: "fullstack-web",
        title: "Web Development",
        image: "/images/backend-distributed-systems.jpg",
        fallbackImage: "/images/backend-distributed-systems.jpg",
        link: "/events?topic=web"
      }
    ],
    Product: [
      {
        id: "cloud-platform",
        title: "Cloud Platform",
        image: "/images/systems-engineering.jpg",
        fallbackImage: "/images/systems-engineering.jpg",
        link: "/events?product=cloud-platform"
      },
      {
        id: "enterprise-ai",
        title: "Enterprise AI Tools",
        image: "/images/machine-learning-python.jpg",
        fallbackImage: "/images/machine-learning-python.jpg",
        link: "/events?product=enterprise-ai"
      },
      {
        id: "developer-workspace",
        title: "Developer Tools",
        image: "/images/courses-coding-lab.jpg",
        fallbackImage: "/images/courses-coding-lab.jpg",
        link: "/events?product=developer-tools"
      },
      {
        id: "community-ecosystem",
        title: "Security Solutions",
        image: "/images/events-team-collab.jpg",
        fallbackImage: "/images/events-team-collab.jpg",
        link: "/events?product=security"
      }
    ]
  };

  const currentCards = categoriesData[activeTab] || categoriesData.Audience;

  return (
    <section className="events-by-category-section" id="events-by-category">
      <div className="container">
        {/* Header matching reference screenshot */}
        <div className="events-by-category-header">
          <span className="events-by-category-overtitle">
            EVENTS BY CATEGORY
          </span>
          <h2 className="events-by-category-title">
            Pursue your interests
          </h2>

          {/* Segmented Tab Filter: Audience | Topic | Product */}
          <div className="events-by-category-tabs" role="tablist" aria-label="Event category tabs">
            {["Audience", "Topic", "Product"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`events-category-tab ${isActive ? "events-category-tab-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Cards Grid matching reference screenshot */}
        <div className="events-category-cards-wrap">
          <div className="events-category-cards-scroll" ref={scrollRef}>
            {currentCards.map((item) => (
              <div
                key={item.id}
                className="events-category-card"
                onClick={() => navigate(item.link)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(item.link);
                  }
                }}
              >
                {/* Card Image */}
                <div className="events-category-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="events-category-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = item.fallbackImage;
                    }}
                  />
                </div>

                {/* Card Body */}
                <div className="events-category-card-content">
                  <h3 className="events-category-card-title">
                    {item.title}
                  </h3>

                  {/* Explore related events action */}
                  <div className="events-category-card-action">
                    <span className="events-category-arrow-box" aria-hidden="true">
                      <ChevronRight size={16} strokeWidth={2.8} />
                    </span>
                    <span className="events-category-action-text">
                      Explore related events
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows matching bottom-left of Picture 2 */}
          <div className="events-category-carousel-controls">
            <button
              type="button"
              className="events-category-nav-circle"
              onClick={scrollLeft}
              aria-label="Previous events"
              title="Previous"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="events-category-nav-circle"
              onClick={scrollRight}
              aria-label="Next events"
              title="Next"
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
