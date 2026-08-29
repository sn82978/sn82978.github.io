// EntryDetailPage.jsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SAMPLE_ENTRIES, BULLET_POINTS, getSlug } from "./AllEntriesPage";

const ACCENT = "#1db954";

const arrowBtnStyle = {
  background: "rgba(0,0,0,0.5)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
  width: 32,
  height: 32,
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: 18,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "all 0.2s ease",
};

// Accepts entry.images as an array of plain path strings, or objects like
// { src, caption } for a per-slide caption. Falls back to a single image
// built from entry.cover / entry.caption if entry.images isn't set.
function ImageCarousel({ images, altBase }) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {total > 1 && (
          <button
            onClick={goPrev}
            aria-label="Previous image"
            style={arrowBtnStyle}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          >
            ‹
          </button>
        )}

        <img
          src={current.src}
          alt={`${altBase}${total > 1 ? ` (${index + 1} of ${total})` : ""}`}
          style={{
            maxWidth: 360,
            maxHeight: 420,
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.15)",
            display: "block",
            background: "#141414",
          }}
        />

        {total > 1 && (
          <button
            onClick={goNext}
            aria-label="Next image"
            style={arrowBtnStyle}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          >
            ›
          </button>
        )}
      </div>

      {current.caption && (
        <p style={{ color: "#888", fontSize: 13, marginTop: 12, textAlign: "center", maxWidth: 420 }}>
          {current.caption}
        </p>
      )}

      {total > 1 && (
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === index ? ACCENT : "rgba(255,255,255,0.25)",
                transition: "background 0.2s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EntryDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const entry = SAMPLE_ENTRIES.find((e) => getSlug(e.title) === slug);
  const entryData = entry ? BULLET_POINTS[entry.title] : null;

  if (!entry) {
    return (
      <div
        style={{
          background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <p style={{ color: "#b3b3b3", fontSize: 18 }}>Couldn't find that entry.</p>
        <button
          onClick={() => navigate("/all-entries")}
          style={{
            background: "transparent",
            border: `1px solid ${ACCENT}`,
            color: ACCENT,
            borderRadius: 20,
            padding: "8px 16px",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Back to All Entries
        </button>
      </div>
    );
  }

  // Leading slash matters here
  const rawImages = entry.images && entry.images.length > 0 ? entry.images : [entry.cover];
  const images = rawImages.map((item, i) => {
    if (typeof item === "string") {
      return { src: `/${item}`, caption: i === 0 ? entry.caption : undefined };
    }
    return { src: `/${item.src}`, caption: item.caption };
  });

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>{`
        .ed-back-link:hover {
          color: #fff !important;
          border-color: ${ACCENT} !important;
        }
        .ed-btn:hover {
          background: ${ACCENT} !important;
          color: #000 !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* header */}
      <div style={{ padding: "32px 32px 0 32px" }}>
        <button
          className="ed-back-link"
          onClick={() => navigate("/all-entries")}
          style={{
            background: "transparent",
            border: "1px solid #333",
            color: "#b3b3b3",
            borderRadius: 20,
            padding: "8px 16px",
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          ← Back to All Entries
        </button>
      </div>

      {/* title */}
      <div style={{ padding: "24px 32px 0 32px", textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 2, color: ACCENT, fontWeight: 700, marginBottom: 8 }}>
          {entry.category?.toUpperCase()} · {entry.type} · {entry.year}
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          {entry.title}
        </h1>
      </div>

      {/* image panel, same slot the interactive widget occupies on the other pages */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 32px 8px 32px" }}>
        <div
          style={{
            background: "rgba(40, 40, 40, 0.8)",
            borderRadius: 12,
            padding: 28,
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 480,
          }}
        >
          <ImageCarousel images={images} altBase={entry.title} />
        </div>
      </div>

      {/* write-up */}
      <div style={{ padding: "16px 32px 48px 32px", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            maxWidth: 760,
            background: "rgba(40, 40, 40, 0.8)",
            borderRadius: 12,
            padding: 32,
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#fff" }}>
            About the project
          </h2>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8 }}>
            {entryData?.description || "No description available."}
          </p>
        </div>
      </div>

      {/* bottom button row, same format as the interactive pages */}
      {entryData?.links && (
        <div style={{ padding: "0 32px 64px 32px", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {entryData.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                background: "rgba(29, 185, 84, 0.1)",
                border: `1px solid ${ACCENT}`,
                borderRadius: 25,
                color: ACCENT,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}