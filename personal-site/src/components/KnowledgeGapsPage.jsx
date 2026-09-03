// KnowledgeGapsPage.jsx

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#1db954";
const CANVAS_SIZE = 320;
const CENTER = CANVAS_SIZE / 2;
const N_POINTS = 36;

// fixed point layouts for sim

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generatePoints() {
  const rngTight = seededRandom(11);
  const rngLoose = seededRandom(29);
  const points = [];
  for (let i = 0; i < N_POINTS; i++) {
    const angleT = rngTight() * Math.PI * 2;
    const rT = rngTight() * 20;
    const tight = { x: CENTER + Math.cos(angleT) * rT, y: CENTER + Math.sin(angleT) * rT };

    const angleL = rngLoose() * Math.PI * 2;
    const rL = 22 + rngLoose() * 128;
    const loose = { x: CENTER + Math.cos(angleL) * rL, y: CENTER + Math.sin(angleL) * rL };

    points.push({ tight, loose });
  }
  return points;
}

const POINTS = generatePoints();

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(hexA, hexB, t) {
  const a = [1, 3, 5].map((i) => parseInt(hexA.slice(i, i + 2), 16));
  const b = [1, 3, 5].map((i) => parseInt(hexB.slice(i, i + 2), 16));
  const c = a.map((v, i) => Math.round(lerp(v, b[i], t)));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function meanPairwiseDistance(positions) {
  let total = 0;
  let count = 0;
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      total += Math.hypot(positions[i].x - positions[j].x, positions[i].y - positions[j].y);
      count++;
    }
  }
  return count ? total / count : 0;
}

// main page

const DEFAULT_ENTRY = {
  githubUrl: "https://github.com/sn82978/knowledge-gaps",
  slides: "https://drive.google.com/file/d/1D3c1FjKw2xT9enLUbe2aIODKn0Uec2e9/view?usp=sharing",
};

export default function KnowledgeGapsPage({ entry = DEFAULT_ENTRY }) {
  const navigate = useNavigate();
  const [gapLevel, setGapLevel] = useState(0.3);

  const positions = useMemo(
    () =>
      POINTS.map((p) => ({
        x: lerp(p.tight.x, p.loose.x, gapLevel),
        y: lerp(p.tight.y, p.loose.y, gapLevel),
      })),
    [gapLevel]
  );

  const spread = useMemo(() => meanPairwiseDistance(positions), [positions]);
  const color = lerpColor("#63b3ed", "#e0604a", gapLevel);

  let verdict;
  let verdictColor;
  if (gapLevel < 0.33) {
    verdict = "Tight cluster: the model has likely seen plenty of training data here.";
    verdictColor = "#63b3ed";
  } else if (gapLevel < 0.66) {
    verdict = "Some structure, but it's loosening, a partial or inconsistently-covered topic.";
    verdictColor = "#e0b34a";
  } else {
    verdict = "Loose, scattered: little manifold structure, a likely knowledge gap.";
    verdictColor = "#e0604a";
  }

  const githubUrl = "https://github.com/sn82978/knowledge-gaps";
  const slides = entry?.slides || DEFAULT_ENTRY.slides;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>{`
        .kg-back-link:hover {
          color: #fff !important;
          border-color: ${ACCENT} !important;
        }
        .kg-btn:hover {
          background: ${ACCENT} !important;
          color: #000 !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* header */}
      <div style={{ padding: "32px 32px 0 32px" }}>
        <button
          className="kg-back-link"
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
          RESEARCH · KRONE-MARTINS LAB · W26-PRESENT
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Detecting LLM Knowledge Gaps
        </h1>
      </div>

      {/* simulation panel */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 32px 8px 32px" }}>
        <div
          style={{
            background: "rgba(40, 40, 40, 0.8)",
            borderRadius: 12,
            padding: 28,
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            maxWidth: 420,
          }}
        >
          <svg
            viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{ borderRadius: 8, background: "#141414", display: "block" }}
          >
            {positions.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.4" fill={color} opacity="0.85" />
            ))}
          </svg>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 12, color: "#b3b3b3", display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>Well-covered</span>
              <span>Knowledge gap</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={gapLevel}
              onChange={(e) => setGapLevel(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: ACCENT }}
            />
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
            }}
          >
            <span>Mean pairwise distance (spread):</span>
            <strong style={{ color }}>{spread.toFixed(1)}px</strong>
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 12, color: verdictColor, fontWeight: 600 }}>
            {verdict}
          </p>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginTop: 4, marginBottom: 8 }}>
        drag the slider from well-covered to knowledge gap
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
            I tested the OpenAI and Gemini embedding models against multiple datasets about
            mathematics and physics to identify where each model seems to be lacking training
            data. The core idea: project a batch of related questions into the model's embedding
            space and look at the shape they for, well-understood topics tend to cluster
            tightly, while topics the model hasn't seen much of scatter with no real structure,
            which is what the widget above is standing in for.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
            For the real analysis, I used graphical evaluation with PacMAP to visualize each
            model's manifold, then compared them quantitatively using the Davies-Bouldin index,
            mean silhouette score, and intra-cluster cosine similarity to determine each model's
            proclivity toward a given topic.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8 }}>
            This project is ongoing under Professor Krone-Martins.
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
        {slides && (
          <a
            href={slides}
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
            Poster at UROP 2026
          </a>
        )}
      </div>
    </div>
  );
}