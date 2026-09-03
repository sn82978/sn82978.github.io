// DriftPage.jsx

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#1db954";
const CHART_W = 320;
const CHART_H = 200;
const NUM_LINES = 8;
const GENERATIONS = 60;

// simulation 

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function simulateTrajectories(mode, popSize, seed) {
  const rng = seededRandom(seed);
  // smaller populations drift more, noise scales roughly with 1/sqrt(N).
  const noiseScale = Math.min(0.35, Math.max(0.015, 1 / Math.sqrt(popSize)));
  const trend = mode === "selection" ? 0.011 : 0;

  const lines = [];
  for (let i = 0; i < NUM_LINES; i++) {
    let freq = 0.5;
    const path = [freq];
    for (let g = 1; g <= GENERATIONS; g++) {
      const noise = (rng() - 0.5) * 2 * noiseScale;
      freq = Math.min(1, Math.max(0, freq + noise + trend));
      path.push(freq);
    }
    lines.push(path);
  }
  return { lines, noiseScale };
}

function pathToPoints(path) {
  return path
    .map((freq, g) => {
      const x = (g / GENERATIONS) * CHART_W;
      const y = CHART_H - freq * CHART_H;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

// chart 

function TrajectoryChart({ lines, mode }) {
  const lineColor = mode === "selection" ? "#68d391" : "#63b3ed";
  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} width={CHART_W} height={CHART_H} style={{ borderRadius: 8, background: "#141414", display: "block" }}>
      {/* fixation guides */}
      <line x1="0" y1="1" x2={CHART_W} y2="1" stroke="#333" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="0" y1={CHART_H / 2} x2={CHART_W} y2={CHART_H / 2} stroke="#333" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="0" y1={CHART_H - 1} x2={CHART_W} y2={CHART_H - 1} stroke="#333" strokeWidth="1" strokeDasharray="3,3" />
      {lines.map((path, i) => (
        <polyline
          key={i}
          points={pathToPoints(path)}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.6"
          strokeOpacity={0.7}
        />
      ))}
    </svg>
  );
}

// main page

const DEFAULT_ENTRY = {
  githubUrl: "https://github.com/rose-mueller-labs/snp-data",
  slides: "https://docs.google.com/presentation/d/1aWlFPqgMO3BhaZnXAVgsTnJD6uUTx6W7gs6-XFdm-R8/edit?usp=sharing",
  poster: "https://drive.google.com/file/d/1jpDVq2Ie3iVeWhEsMzWQTm08o821e0iy/view?usp=sharing",
};

export default function DriftPage({ entry = DEFAULT_ENTRY }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("drift");
  const [popSize, setPopSize] = useState(150);
  const [seed, setSeed] = useState(1);

  const { lines, noiseScale } = useMemo(() => simulateTrajectories(mode, popSize, seed), [mode, popSize, seed]);

  let caption;
  if (popSize < 200) {
    caption =
      mode === "selection"
        ? "At this population size, drift's noise is loud enough to nearly bury the selective trend, several replicates look just like pure drift by eye, even though every one of them has the same real push."
        : "With a small population, drift alone produces wandering, divergent trajectories, some replicates fix near 0, others near 1, purely by chance.";
  } else if (popSize > 1200) {
    caption =
      mode === "selection"
        ? "With a large population, drift's noise shrinks and the selective trend becomes obvious, nearly every replicate trends the same direction."
        : "Even with a large population, pure drift has no consistent direction, the lines stay flat and noisy rather than trending anywhere.";
  } else {
    caption =
      mode === "selection"
        ? "The trend is visible here, but individual replicates still wobble, this middle ground is where a single trajectory becomes genuinely ambiguous, and where a statistical test earns its keep."
        : "Pure drift at a moderate population size, no consistent direction, just each replicate wandering on its own.";
  }

  const githubUrl = "https://github.com/rose-mueller-labs/snp-data";
  const slides = entry?.slides || DEFAULT_ENTRY.slides;
  const poster = entry?.poster || DEFAULT_ENTRY.poster;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>{`
        .dr-back-link:hover {
          color: #fff !important;
          border-color: ${ACCENT} !important;
        }
        .dr-btn:hover {
          background: ${ACCENT} !important;
          color: #000 !important;
          transform: translateY(-2px);
        }
        .dr-mode-btn {
          transition: all 0.2s ease;
        }
      `}</style>

      {/* header / breadcrumb */}
      <div style={{ padding: "32px 32px 0 32px" }}>
        <button
          className="dr-back-link"
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
          RESEARCH · ROSE & MUELLER LABS · W25-S25
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Statistical Analysis and Machine Learning to Detect Drift v. Anti-Drift
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
          <TrajectoryChart lines={lines} mode={mode} />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666", marginTop: 4 }}>
            <span>generation 0</span>
            <span>generation {GENERATIONS}</span>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {[
              { key: "drift", label: "Pure Drift" },
              { key: "selection", label: "Selection (Anti-Drift)" },
            ].map((m) => (
              <button
                key={m.key}
                className="dr-mode-btn"
                onClick={() => setMode(m.key)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: 20,
                  border: `1px solid ${mode === m.key ? ACCENT : "#333"}`,
                  background: mode === m.key ? "rgba(29,185,84,0.15)" : "transparent",
                  color: mode === m.key ? ACCENT : "#b3b3b3",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={{ fontSize: 12, color: "#b3b3b3", display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>Population size (N)</span>
              <span style={{ color: ACCENT, fontWeight: 700 }}>{popSize}</span>
            </label>
            <input
              type="range"
              min="20"
              max="3000"
              step="10"
              value={popSize}
              onChange={(e) => setPopSize(parseInt(e.target.value, 10))}
              style={{ width: "100%", accentColor: ACCENT }}
            />
          </div>

          <button
            onClick={() => setSeed((s) => s + 1)}
            className="dr-btn"
            style={{
              marginTop: 14,
              width: "100%",
              padding: "8px 12px",
              borderRadius: 20,
              border: `1px solid ${ACCENT}`,
              background: "rgba(29,185,84,0.1)",
              color: ACCENT,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Re-roll replicates
          </button>

          <p style={{ fontSize: 13, color: "#b3b3b3", lineHeight: 1.6, marginTop: 12 }}>{caption}</p>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginTop: 4, marginBottom: 8 }}>
        toggle drift vs. selection and drag the population size
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
            At the Rose Lab, I studied whether drift or selection drives evolution by analyzing
            SNPs across generations of fruit flies. Both processes move an allele's frequency
            around, but for very different reasons, drift is just noise, while selection is a
            consistent push in one direction. Told apart on a single trajectory, they can look
            identical, which is exactly what the widget above lets you explore.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
            To actually separate the two, I trained 220 Random Forest models to refine the
            p-value threshold down to 0.000218 and applied UMAP for unsupervised analysis to
            explore relationships between SNP frequency changes and evolutionary trajectories.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8 }}>
            The project was funded by Calit2, and I presented it as slides at the Calit2 2025
            oral presentation and as a poster at UCI's UROP 2025.
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
            className="dr-btn"
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
            className="dr-btn"
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
            Slides at Calit2 2025
          </a>
        )}
        {poster && (
          <a
            href={poster}
            target="_blank"
            rel="noopener noreferrer"
            className="dr-btn"
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
            Poster at UROP 2025
          </a>
        )}
      </div>
    </div>
  );
}