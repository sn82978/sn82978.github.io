import React from "react";

const aboutImage = "headshot.jpg";

export default function AboutModal({ open, onClose, aboutText }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.90)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#111",
          borderRadius: 12,
          overflow: "hidden",
          width: 600,
          maxWidth: "90vw",
          boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
          position: "relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div style={{
          background: "#23160e",
          color: "#b3b3b3",
          padding: "16px 24px",
          fontSize: 24,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{ marginRight: 12 }}>
            <span style={{
              display: "inline-block",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#4caf50",
              marginRight: 8,
              verticalAlign: "middle",
            }} />
          </span>
          <span style={{ color: "#b3b3b3" }}>Your Name</span>
          <button
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 24,
              cursor: "pointer",
            }}
            onClick={onClose}
            aria-label="Close"
          >×</button>
        </div>
        {/* Main image */}
        <img
          src={aboutImage}
          alt="About"
          style={{
            width: "100%",
            height: 320,
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Info card */}
        <div style={{
          background: "#181818",
          color: "#fff",
          padding: "32px 24px 24px 24px",
          position: "relative",
        }}>
          {/* Floating badge */}
          <div style={{
            position: "absolute",
            left: 24,
            top: -32,
            background: "#2196f3",
            color: "#fff",
            borderRadius: "50%",
            width: 64,
            height: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 20,
            border: "4px solid #181818",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}>
            <span style={{ fontSize: 18 }}>#27</span>
            <span style={{ fontSize: 12, fontWeight: 400 }}>in the world</span>
          </div>
          <div style={{ marginLeft: 88 }}>
          <div style={{ fontSize: 16, lineHeight: 1.75 }}>
  {typeof aboutText === "string" ? <p>{aboutText}</p> : aboutText}
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
