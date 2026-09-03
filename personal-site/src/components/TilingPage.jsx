// TilingPage.jsx

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#1db954";
const CANVAS_SIZE = 320;

// ground-truth egg layout

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateEggs() {
  const rng = seededRandom(42);
  const clusters = [
    { cx: 90, cy: 90 },
    { cx: 235, cy: 75 },
    { cx: 160, cy: 175 },
    { cx: 65, cy: 240 },
    { cx: 250, cy: 245 },
    { cx: 175, cy: 55 },
  ];
  const eggs = [];
  clusters.forEach((c) => {
    const count = 6 + Math.floor(rng() * 4); // 6-9 eggs per cluster
    for (let i = 0; i < count; i++) {
      const angle = rng() * Math.PI * 2;
      const dist = rng() * 26;
      eggs.push({ x: c.cx + Math.cos(angle) * dist, y: c.cy + Math.sin(angle) * dist });
    }
  });
  return eggs;
}

const EGGS = generateEggs();
const TRUE_TOTAL = EGGS.length;

// detection example
//  - SPLIT: eggs near a tile boundary get counted in both neighboring tiles.
//  - MISS: tiles holding more than a few eggs start under-reporting, since
//    the model can't resolve every individual egg in a crowded window.

function computeStats(tileSize) {
  const SPLIT_MARGIN = 5;
  const DENSITY_CAP = 3;
  const MISS_RATE = 0.65;

  const eggStates = EGGS.map((e) => {
    const tileX = Math.floor(e.x / tileSize);
    const tileY = Math.floor(e.y / tileSize);
    const localX = e.x - tileX * tileSize;
    const localY = e.y - tileY * tileSize;
    const nearBoundary =
      Math.min(localX, tileSize - localX) < SPLIT_MARGIN ||
      Math.min(localY, tileSize - localY) < SPLIT_MARGIN;
    return { ...e, tileKey: `${tileX}-${tileY}`, split: nearBoundary, missed: false };
  });

  const tileGroups = new Map();
  eggStates.forEach((es) => {
    if (!tileGroups.has(es.tileKey)) tileGroups.set(es.tileKey, []);
    tileGroups.get(es.tileKey).push(es);
  });

  let missedCount = 0;
  tileGroups.forEach((group) => {
    if (group.length > DENSITY_CAP) {
      const extra = group.length - DENSITY_CAP;
      const numMissed = Math.round(extra * MISS_RATE);
      for (let i = 0; i < numMissed; i++) {
        group[group.length - 1 - i].missed = true;
        missedCount++;
      }
    }
  });

  const splitCount = eggStates.filter((es) => es.split && !es.missed).length;
  const predictedTotal = TRUE_TOTAL - missedCount + splitCount;

  return { eggStates, missedCount, splitCount, predictedTotal };
}

// visual

function TilingField({ tileSize }) {
  const { eggStates, missedCount, splitCount, predictedTotal } = useMemo(
    () => computeStats(tileSize),
    [tileSize]
  );
  const error = predictedTotal - TRUE_TOTAL;
  const errorColor = Math.abs(error) <= 2 ? ACCENT : Math.abs(error) <= 5 ? "#e0b34a" : "#e0604a";

  const gridLines = [];
  for (let x = tileSize; x < CANVAS_SIZE; x += tileSize) gridLines.push({ axis: "v", pos: x });
  for (let y = tileSize; y < CANVAS_SIZE; y += tileSize) gridLines.push({ axis: "h", pos: y });

  let caption;
  if (tileSize < 50) {
    caption =
      "Tiles this small slice eggs in half wherever a boundary lands on top of one, the model risks counting the same egg twice, once from each side.";
  } else if (tileSize > 110) {
    caption =
      "Tiles this large cram whole clusters into a single detection window, once too many eggs overlap in one tile, some start getting missed entirely.";
  } else {
    caption =
      "This is close to the 75 by 75 pixel tiles the real model used, small enough to keep clusters resolvable, large enough to avoid slicing eggs at every boundary.";
  }

  return (
    <div>
      <svg viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`} width={CANVAS_SIZE} height={CANVAS_SIZE} style={{ borderRadius: 8, background: "#141414", display: "block" }}>
        {/* tile grid */}
        {gridLines.map((l, i) =>
          l.axis === "v" ? (
            <line key={i} x1={l.pos} y1={0} x2={l.pos} y2={CANVAS_SIZE} stroke={ACCENT} strokeOpacity="0.25" strokeWidth="1" />
          ) : (
            <line key={i} x1={0} y1={l.pos} x2={CANVAS_SIZE} y2={l.pos} stroke={ACCENT} strokeOpacity="0.25" strokeWidth="1" />
          )
        )}

        {/* eggs */}
        {eggStates.map((e, i) => {
          const fill = e.missed ? "#555" : e.split ? "#ffb454" : "#f5e6c8";
          const opacity = e.missed ? 0.35 : 1;
          return (
            <ellipse
              key={i}
              cx={e.x}
              cy={e.y}
              rx="4.4"
              ry="5.6"
              fill={fill}
              opacity={opacity}
              stroke={e.split ? "#ffb454" : "none"}
              strokeWidth={e.split ? 1.5 : 0}
              strokeOpacity="0.5"
            />
          );
        })}
      </svg>

      <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12, color: "#b3b3b3" }}>
        <span><span style={{ color: "#f5e6c8" }}>●</span> counted once</span>
        <span><span style={{ color: "#ffb454" }}>●</span> split across tiles</span>
        <span><span style={{ color: "#555" }}>●</span> missed in a crowded tile</span>
      </div>

      <div
        style={{
          marginTop: 16,
          padding: "12px 16px",
          background: "rgba(0,0,0,0.35)",
          borderRadius: 8,
          fontSize: 13,
          color: "#e1e1e1",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span>True count: <strong>{TRUE_TOTAL}</strong></span>
        <span>Model's count: <strong>{predictedTotal}</strong></span>
        <span style={{ color: errorColor, fontWeight: 700 }}>
          {error === 0 ? "exact" : error > 0 ? `+${error} overcounted` : `${error} undercounted`}
        </span>
      </div>

      <p style={{ fontSize: 13, color: "#b3b3b3", lineHeight: 1.6, marginTop: 12 }}>{caption}</p>
    </div>
  );
}

// main page

const DEFAULT_ENTRY = {
  githubUrl: "https://github.com/sn82978/CNN-Classifier",
  poster: "https://docs.google.com/presentation/d/13DfBvY5jmcxOBj66vHIGAnzmF_dFZJ8cv5BceoQNjbY/edit?usp=sharing",
};

export default function TilingPage({ entry = DEFAULT_ENTRY }) {
  const navigate = useNavigate();
  const [tileSize, setTileSize] = useState(75);

  const githubUrl = "https://github.com/rose-mueller-labs/Fecundity-Classifier";
  const slidesUrl = entry?.poster || DEFAULT_ENTRY.poster;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>{`
        .tl-back-link:hover {
          color: #fff !important;
          border-color: ${ACCENT} !important;
        }
        .tl-btn:hover {
          background: ${ACCENT} !important;
          color: #000 !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* header / breadcrumb */}
      <div style={{ padding: "32px 32px 0 32px" }}>
        <button
          className="tl-back-link"
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
          Back to All Entries
        </button>
      </div>

      {/* title */}
      <div style={{ padding: "24px 32px 0 32px", textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 2, color: ACCENT, fontWeight: 700, marginBottom: 8 }}>
          RESEARCH · ROSE & MUELLER LABS · F24–S26
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Tiling: Computer Vision to Detect Fruit Fly Eggs
        </h1>
      </div>

      {/* video panel */}
            {/* video panel */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 32px 8px 32px" }}>
        <div
          style={{
            background: "rgba(40, 40, 40, 0.8)",
            borderRadius: 12,
            padding: 28,
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            maxWidth: 800, // was 420
            width: "100%",
          }}
        >
          <video
            controls
            style={{ width: "100%", height: "auto", borderRadius: 8, display: "block" }}
          >
            <source src="/513_fecundity_compressed.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginTop: 4, marginBottom: 8 }}>
        UROP 2025 presentation
      </p>

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
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
            This is an ongoing project applying machine learning to count fruit fly eggs in
            grid-like images , the kind of small, densely packed objects that most detectors
            struggle with. My approach was a recursive tiling technique that splits each image
            into 75 by 75 pixel tiles for more accurate small-object detection.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
            The model predicts egg counts at the tile level, reconstructs those into per-cap
            counts, and then sums across the grid. The widget above is a simplified version of
            exactly that tradeoff , try dragging the tile size away from 75px and watch the
            error mode flip from double-counting to missed eggs.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8 }}>
            This work won #1 at the UROP 2025 in the Group Research section and was funded by
            UCI UROP.
          </p>
        </div>
      </div>

       {/* bottom button row */}
      <div style={{ padding: "0 32px 64px 32px", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kg-btn"
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
            View Source
          </a>
        )}
        {slidesUrl && (
          <a
            href={slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kg-btn"
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
            View Slides from Presentation (won, UROP 2025)
          </a>
        )}
      </div>
    </div>
  );
}