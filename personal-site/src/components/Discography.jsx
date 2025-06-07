import React, { useState } from "react";

const FILTERS = ["Popular releases"]; 
// , "Albums", "Singles and EPs"

const RESUME_URL = "https://drive.google.com/file/d/12f1we87TBJ78daKGBmC6RHoP3fVy-gO6/view?usp=sharing";

function Discography({ albums }) {
  const [filter, setFilter] = useState(FILTERS[0]);

  const handleShowAll = () => {
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        {/* <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>Discography</h2> */}
        {/* <h1>Discography</h1> */}
        <h2 style={{ color: "#fff", fontSize: 28, marginBottom: 16 }}>Discography</h2>
        <button
          onClick={handleShowAll}
          style={{
            background: "none",
            border: "none",
            color: "#b3b3b3",
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          Show all
        </button>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              border: "none",
              background: filter === f ? "#fff" : "#222",
              color: filter === f ? "#000" : "#fff",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer"
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {albums.map(album => (
          <div
            key={album.title}
            style={{
              width: 180,
              cursor: "pointer"
            }}
            onClick={() => window.open(album.githubUrl, "_blank", "noopener,noreferrer")}
            tabIndex={0}
            onKeyPress={e => { if (e.key === "Enter" || e.key === " ") window.open(album.githubUrl, "_blank", "noopener,noreferrer"); }}
            title="View on GitHub"
          >
            <img
              src={album.cover}
              alt={album.title}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 8,
                objectFit: "cover",
                marginBottom: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
              }}
            />
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 16, marginBottom: 2 }}>{album.title}</div>
            <div style={{ color: "#b3b3b3", fontSize: 14 }}>
              {album.year} &middot; {album.type}
            </div>
            {album.latest && (
              <div style={{
                color: "#b3b3b3",
                fontSize: 13,
                marginTop: 2
              }}>Latest Release &middot; Single</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Discography;