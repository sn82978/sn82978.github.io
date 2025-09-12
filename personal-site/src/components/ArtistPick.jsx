// ArtistPick.jsx

import React from "react";

function ArtistPick({ pick }) {
  const handleClick = () => {
    window.open(pick.githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(40, 40, 40, 0.8)",
        borderRadius: 12,
        padding: 32,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden"
      }}
      tabIndex={0}
      onKeyPress={e => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(80, 80, 80, 0.9)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(40, 40, 40, 0.8)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
      }}
      title="View on GitHub"
    >
      {/* Decorative gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(29,185,84,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />
      
      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ position: "relative" }}>
          <img
            src={pick.image}
            alt={pick.title}
            style={{
              width: 120,
              height: 120,
              borderRadius: 12,
              objectFit: "cover",
              marginRight: 32,
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          />
          {/* Featured badge */}
          <div
            style={{
              position: "absolute",
              top: -8,
              right: 24,
              background: "linear-gradient(135deg, #1db954 0%, #1ed760 100%)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              boxShadow: "0 4px 12px rgba(29, 185, 84, 0.4)"
            }}
          >
            Featured
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ 
            color: "#fff", 
            fontWeight: 700, 
            fontSize: 24, 
            marginBottom: 8,
            lineHeight: 1.3
          }}>
            {pick.title}
          </div>
          <div style={{ 
            color: "#1db954", 
            fontSize: 16, 
            marginBottom: 16, 
            fontWeight: 600 
          }}>
            {pick.type}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={pick.postedByAvatar}
              alt={pick.postedBy}
              style={{ 
                width: 32, 
                height: 32, 
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.2)" 
              }}
            />
            <span style={{ 
              color: "#b3b3b3", 
              fontSize: 14,
              fontWeight: 500 
            }}>
              Posted by <span style={{ color: "#fff", fontWeight: 600 }}>{pick.postedBy}</span>
            </span>
          </div>
          
          {/* Action indicator */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 16,
            color: "#1db954",
            fontSize: 14,
            fontWeight: 600
          }}>
            <span style={{ marginRight: 8 }}>View Project</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.44 8.5H2.75a.75.75 0 0 1 0-1.5h8.69L8.22 4.03a.75.75 0 0 1 0-1.06Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPick;