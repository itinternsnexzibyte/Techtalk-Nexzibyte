import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Ticket } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Hero() {
  const navigate = useNavigate();
  const { openPassModal, isLoggedIn } = useApp();

  return (
    <section
      className="hero-discovery-section"
      id="hero"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textAlign: "center"
      }}
    >
      {/* 1. Bespoke 3D Ribbon Keynote Background */}
      <div className="hero-discovery-bg-wrapper" aria-hidden="true">
        <img
          src="/images/techtalk-hero-ribbon.jpg"
          alt="TechTalk 3D Ribbon Keynote Background"
          className="hero-discovery-bg-image"
        />
        <div className="hero-discovery-gradient-mask" />
      </div>

      {/* 2. Hero Content Container (Centered in Middle) */}
      <div
        className="hero-discovery-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: "0 auto",
          width: "100%",
          maxWidth: "1280px"
        }}
      >
        <div
          className="hero-discovery-center-col"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: "0 auto",
            width: "100%",
            maxWidth: "980px"
          }}
        >
          {/* Headline / Matter in the Middle with Increased Letter Size */}
          <h1
            className="hero-discovery-headline"
            style={{
              textAlign: "center",
              margin: "0 auto 2.25rem auto",
              width: "100%",
              display: "block",
              fontSize: "clamp(1.85rem, 3.2vw, 2.85rem)",
              lineHeight: 1.2
            }}
          >
            Where Technology Meets Ideas. People &amp; Possibilities.
          </h1>

          {/* Action Buttons Row: Sign in & Claim Free Pass */}
          <div
            className="hero-discovery-actions-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              margin: "0 auto",
              flexWrap: "wrap",
              width: "100%"
            }}
          >
            <button
              type="button"
              className="hero-discovery-primary-btn"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/events");
                } else {
                  navigate("/login");
                }
              }}
              id="hero-discovery-signin-btn"
            >
              <span>{isLoggedIn ? "Explore Sessions" : "Sign in"}</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="hero-discovery-secondary-btn"
              onClick={() => openPassModal("visitor-pass")}
              id="hero-discovery-pass-btn"
            >
              <Ticket size={16} />
              <span>Claim Free Pass</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
