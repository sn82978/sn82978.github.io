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
        background: "#222",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        cursor: "pointer"
      }}
      tabIndex={0}
      onKeyPress={e => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      title="View on GitHub"
    >
      <img
        src={pick.image}
        alt={pick.title}
        style={{
          width: 96,
          height: 96,
          borderRadius: 8,
          objectFit: "cover",
          marginRight: 24
        }}
      />
      <div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{pick.title}</div>
        <div style={{ color: "#b3b3b3", fontSize: 15, marginBottom: 8 }}>{pick.type}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src={pick.postedByAvatar}
            alt={pick.postedBy}
            style={{ width: 24, height: 24, borderRadius: "50%" }}
          />
          <span style={{ color: "#b3b3b3", fontSize: 14 }}>Posted by {pick.postedBy}</span>
        </div>
      </div>
    </div>
  );
}

export default ArtistPick;
