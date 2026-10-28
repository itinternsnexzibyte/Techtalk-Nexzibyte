import React from "react";

/**
 * Official NEXZIBYTE SOLUTIONS PVT LTD Brand Logo
 * Directly renders the exact official graphic uploaded by the user with high-resolution Retina clarity.
 * 
 * Supports:
 * - theme="light" | "dark" | "auto"
 * - Optional showTechTalk badge for TechTalk platform sections
 */
export function NexziByteLogo({ 
  height = 42, 
  theme = "auto", // "light" | "dark" | "auto"
  showTechTalk = false,
  showSubtitle = true,
  className = "" 
}) {
  const isDark = theme === "dark";

  // Official logo matching https://www.nexzibyte.com/
  const logoSrc = "/images/nexzibyte_exact_logo_as_is.png";

  return (
    <div 
      className={`nexzibyte-brand-container ${theme} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        height: `${height}px`,
        verticalAlign: "middle",
        userSelect: "none",
        background: "transparent"
      }}
      aria-label="NexziByte"
    >
      {/* Official NexziByte Wordmark Logo with purple X */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: isDark ? "#FFFFFF" : "transparent",
          padding: isDark ? "4px 10px" : "0",
          borderRadius: isDark ? "8px" : "0",
          boxShadow: isDark ? "0 2px 10px rgba(0, 0, 0, 0.25)" : "none",
          transition: "all 0.2s ease"
        }}
      >
        <img 
          src={logoSrc} 
          alt="NexziByte" 
          style={{
            height: isDark ? `${height * 0.76}px` : `${height}px`,
            width: "auto",
            display: "block",
            objectFit: "contain"
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Optional TechTalk Graphic Logo */}
      {showTechTalk && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginLeft: "4px"
        }}>
          <span style={{ height: `${height * 0.55}px`, width: "1px", background: isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.15)", display: "inline-block" }} />
          <img 
            src={isDark ? "/images/techtalk-logo-dark.png" : "/images/techtalk-logo-transparent.png"} 
            alt="TechTalk" 
            style={{
              height: `${height * 0.7}px`,
              width: "auto",
              display: "block",
              objectFit: "contain"
            }}
          />
        </div>
      )}
    </div>
  );
}

export default NexziByteLogo;


