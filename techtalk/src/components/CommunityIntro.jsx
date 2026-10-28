import React from "react";

export default function CommunityIntro() {
  return (
    <section 
      className="section-padding community-intro-mesh-section" 
      id="community-intro" 
      style={{ 
        backgroundColor: "#F6F1EE", 
        background: "#F6F1EE", 
        position: "relative", 
        zIndex: 10 
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="community-intro-grid">
          {/* LEFT: Large Technology / Community Photograph */}
          <div className="community-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
              alt="NexziByte TechTalk Builders Community"
              className="community-photo"
              loading="lazy"
            />
          </div>

          {/* RIGHT: Editorial Content (MORE THAN AN EVENT badge removed, letters black only) */}
          <div className="community-content-column">
            <h2 className="section-heading" style={{ color: "#000000", marginTop: 0 }}>
              A community built for people who create what comes next.
            </h2>

            <p className="section-subtitle" style={{ marginBottom: "0", fontSize: "1.1rem", lineHeight: "1.7" }}>
              NexziByte TechTalk brings together developers, students, founders, entrepreneurs, 
              technology professionals and innovators through technical content, events, summits 
              and meaningful networking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
