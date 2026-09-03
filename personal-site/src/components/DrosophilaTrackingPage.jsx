// DrosophilaTrackingPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#1db954";
const CANVAS_SIZE = 320;
const MARGIN = 16;
const NUM_FLIES = 6;
const SWAP_DIST = 16;

const COLORS = ["#ff6b81", "#4fd1c5", "#f6ad55", "#9f7aea", "#68d391", "#63b3ed"];

// simulation

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeFlies() {
  const rng = seededRandom(7);
  return Array.from({ length: NUM_FLIES }, (_, i) => ({
    id: i, // physical identity never changes
    assignedId: i, // what the tracker currently reports = can get swapped
    x: MARGIN + rng() * (CANVAS_SIZE - MARGIN * 2),
    y: MARGIN + rng() * (CANVAS_SIZE - MARGIN * 2),
    vx: (rng() - 0.5) * 1.2,
    vy: (rng() - 0.5) * 1.2,
  }));
}

function stepFly(f) {
  if (Math.random() < 0.03) {
    f.vx += (Math.random() - 0.5) * 0.5;
    f.vy += (Math.random() - 0.5) * 0.5;
  }
  const speed = Math.hypot(f.vx, f.vy);
  const maxSpeed = 1.3;
  if (speed > maxSpeed) {
    f.vx = (f.vx / speed) * maxSpeed;
    f.vy = (f.vy / speed) * maxSpeed;
  }
  f.x += f.vx;
  f.y += f.vy;
  if (f.x < MARGIN || f.x > CANVAS_SIZE - MARGIN) f.vx *= -1;
  if (f.y < MARGIN || f.y > CANVAS_SIZE - MARGIN) f.vy *= -1;
  f.x = Math.min(Math.max(f.x, MARGIN), CANVAS_SIZE - MARGIN);
  f.y = Math.min(Math.max(f.y, MARGIN), CANVAS_SIZE - MARGIN);
  return f;
}

// main page

const DEFAULT_ENTRY = {
  githubUrl: "https://github.com/rose-mueller-labs/Cameras-Calit2IRT",
  videosUrl: "https://docs.google.com/presentation/d/1QjsyHKZjVPHiWhzua0DCi15NPnj5fuV5qk1L4ciKJZk/edit?usp=sharing",
};

export default function DrosophilaTrackingPage({ entry = DEFAULT_ENTRY }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("naive");
  const [swapCount, setSwapCount] = useState(0);

  const canvasRef = useRef(null);
  const fliesRef = useRef(makeFlies());
  const modeRef = useRef(mode);
  const swapCountRef = useRef(0);
  const frameRef = useRef(null);
  const lastStatUpdateRef = useRef(0);

  useEffect(() => {
    modeRef.current = mode;
    // fresh run on every mode switch so the comparison is apples-to-apples
    fliesRef.current = makeFlies();
    swapCountRef.current = 0;
    setSwapCount(0);
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loop = (time) => {
      const flies = fliesRef.current.map(stepFly);

      // identity-swap check: only fires in 'dumb' mode, only when two flies
      // are close enough that a position-only tracker could confuse them.
      if (modeRef.current === "naive") {
        for (let i = 0; i < flies.length; i++) {
          for (let j = i + 1; j < flies.length; j++) {
            const d = Math.hypot(flies[i].x - flies[j].x, flies[i].y - flies[j].y);
            if (d < SWAP_DIST && Math.random() < 0.05) {
              const tmp = flies[i].assignedId;
              flies[i].assignedId = flies[j].assignedId;
              flies[j].assignedId = tmp;
              swapCountRef.current += 1;
            }
          }
        }
      }
      fliesRef.current = flies;

      // trail effect --> fix this cuz it's hurting my eyes sometimes
      ctx.fillStyle = "rgba(20, 20, 20, 0.28)";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // arena boundary
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.strokeRect(MARGIN, MARGIN, CANVAS_SIZE - MARGIN * 2, CANVAS_SIZE - MARGIN * 2);

      // flies, oriented to their heading, colored by current (possibly wrong) assigned ID
      flies.forEach((f) => {
        const heading = Math.atan2(f.vy, f.vx);
        const color = COLORS[f.assignedId % COLORS.length];

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(heading);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 3.2, 0, 0, Math.PI * 2);
        ctx.fill();
        // a small "nose" to make heading legible
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(2, -2.4);
        ctx.lineTo(2, 2.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = color;
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`#${f.assignedId}`, f.x, f.y - 12);
      });

      if (time - lastStatUpdateRef.current > 150) {
        lastStatUpdateRef.current = time;
        setSwapCount(swapCountRef.current);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const githubUrl = "https://github.com/rose-mueller-labs/Cameras-Calit2IRT";
  const videosUrl = entry?.videosUrl || DEFAULT_ENTRY.videosUrl;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>{`
        .dt-back-link:hover {
          color: #fff !important;
          border-color: ${ACCENT} !important;
        }
        .dt-btn:hover {
          background: ${ACCENT} !important;
          color: #000 !important;
          transform: translateY(-2px);
        }
        .dt-mode-btn {
          transition: all 0.2s ease;
        }
      `}</style>

      {/* header */}
      <div style={{ padding: "32px 32px 0 32px" }}>
        <button
          className="dt-back-link"
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
          RESEARCH · ROSE & MUELLER LABS · F26-PRESENT
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Drosophila Neuroassay Tracking
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
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{ borderRadius: 8, background: "#141414", display: "block" }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {[
              { key: "naive", label: "Naive Tracking" },
              { key: "pose", label: "Pose-Aware Tracking" },
            ].map((m) => (
              <button
                key={m.key}
                className="dt-mode-btn"
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
            <span>Identity swaps this run:</span>
            <strong style={{ color: swapCount === 0 ? ACCENT : "#e0604a" }}>{swapCount}</strong>
          </div>

          <p style={{ fontSize: 13, color: "#b3b3b3", lineHeight: 1.6, marginTop: 12 }}>
            {mode === "naive"
              ? "Naive tracking only looks at position frame to frame, so when two flies' paths cross, it can latch onto the wrong one on the far side, the IDs (and colors) above will occasionally jump between flies."
              : "Pose-aware tracking also uses each fly's heading, so even when two paths cross, it can tell who's who by which direction they're facing, IDs should stay locked to the same fly the whole run."}
          </p>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginTop: 4, marginBottom: 8 }}>
        toggle the tracking mode and watch the ID swaps
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
            At Rose & Mueller Labs, I'm developing a multi-camera tracking algorithm for dense
            biological assays, arenas with several fruit flies moving around at once, which
            researchers rely on to study behavior and neural activity without having to track
            each fly by hand.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
            The core of it is 2D pose estimation combined with identity propagation across
            frames, so the system keeps every fly's identity attached to the right individual
            over time. The hard part is exactly what the widget above demonstrates: dense
            assays mean flies constantly cross paths, and a tracker that only looks at position
            gets confused right at the moment it matters most.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8 }}>
            This project is ongoing. If you want to see it running on real footage rather than
            a simulation, the detection videos below are a good place to start! For more recent videos,
            please reach out to me.
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
            className="dt-btn"
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
        {videosUrl && (
          <a
            href={videosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dt-btn"
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
            CalitIRT 2026 Presentation
          </a>
        )}
      </div>
    </div>
  );
}