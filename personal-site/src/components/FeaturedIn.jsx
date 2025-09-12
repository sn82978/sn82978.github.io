import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FILTERS = ['']; 
// , "Albums", "Singles and EPs"

const RESUME_URL = "https://drive.google.com/file/d/12f1we87TBJ78daKGBmC6RHoP3fVy-gO6/view?usp=sharing";

function FtIn({ albums }) {
  const navigate = useNavigate();

  const handleShowAll = () => {
    navigate("/all-entries");
  };

  const [filter, setFilter] = useState(FILTERS[0]);

  return (
    <section style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Featuring Shreya Nakum</h2>
        <button
          onClick={handleShowAll}
          style={{
            background: "none",
            border: "none",
            color: "#b3b3b3",
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            transition: "color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#b3b3b3";
          }}
        >
          Show all
        </button>
      </div>
      
      {/* Hide filters section if empty */}
      {FILTERS[0] && (
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
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (filter !== f) {
                  e.target.style.background = "rgba(80, 80, 80, 0.9)";
                  e.target.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== f) {
                  e.target.style.background = "#222";
                  e.target.style.color = "#fff";
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      
      {/* Scrollable container */}
      <div 
        style={{ 
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div 
          style={{ 
            display: "flex", 
            gap: 32,
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: "16px"
          }}
        >
          {albums.map(album => (
            <div
              key={album.title}
              style={{
                width: 180,
                cursor: "pointer",
                flexShrink: 0,
                transition: "transform 0.2s ease, opacity 0.2s ease"
              }}
              onClick={() => window.open(album.githubUrl, "_blank", "noopener,noreferrer")}
              tabIndex={0}
              onKeyPress={e => { if (e.key === "Enter" || e.key === " ") window.open(album.githubUrl, "_blank", "noopener,noreferrer"); }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "1";
              }}
              title="View on GitHub"
            >
              <div style={{ position: "relative" }}>
                <img
                  src={album.cover}
                  alt={album.title}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    borderRadius: 8,
                    objectFit: "cover",
                    marginBottom: 12,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                    transition: "box-shadow 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)";
                  }}
                />
                {/* Featured badge */}
                {/* <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "linear-gradient(135deg, #1db954 0%, #1ed760 100%)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: 8,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    boxShadow: "0 2px 8px rgba(29, 185, 84, 0.4)"
                  }}
                >
                  Featured
                </div> */}
              </div>
              
              <div style={{ 
                color: "#fff", 
                fontWeight: 600, 
                fontSize: 16, 
                marginBottom: 2,
                lineHeight: 1.3
              }}>
                {album.title}
              </div>
              <div style={{ color: "#b3b3b3", fontSize: 14 }}>
                {album.year} &middot; {album.type}
              </div>
              {album.latest && (
                <div style={{
                  color: "#1db954",
                  fontSize: 13,
                  marginTop: 4,
                  fontWeight: 600
                }}>Latest Release &middot; Featured</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* scrollbar styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          height: 8px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  );
}

export default FtIn;