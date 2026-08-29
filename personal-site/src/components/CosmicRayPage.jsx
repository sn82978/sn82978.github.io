// CosmicRayPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#1db954";
const CANVAS_SIZE = 320;
const CENTER = CANVAS_SIZE / 2;
const MAX_RADIUS = CENTER - 6;
const NUM_BINS = 8;

// simulation

function makeParticle(mode) {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: CENTER,
    y: CENTER,
    angle,
    // Streaming particles move fast and (mostly) hold their heading.
    // Diffusive particles move slower and get knocked around every step.
    speed: mode === "streaming" ? 1.6 + Math.random() * 0.3 : 0.55 + Math.random() * 0.25,
  };
}

function stepParticle(p, mode, scatter) {
  if (mode === "diffusion") {
    // heading perturbed every frame in proportion to "scatter"
    p.angle += (Math.random() - 0.5) * scatter * 1.4;
  } else {
    // heading is nearly locked, with only a lil bit of field wander.
    p.angle += (Math.random() - 0.5) * scatter * 0.08;
  }
  p.x += Math.cos(p.angle) * p.speed;
  p.y += Math.sin(p.angle) * p.speed;
  return p;
}

function radialBins(particles) {
  const bins = new Array(NUM_BINS).fill(0);
  for (const p of particles) {
    const r = Math.hypot(p.x - CENTER, p.y - CENTER);
    const idx = Math.min(NUM_BINS - 1, Math.floor((r / MAX_RADIUS) * NUM_BINS));
    bins[idx] += 1;
  }
  const max = Math.max(1, ...bins);
  return bins.map((b) => b / max);
}

// profile chart

function ProfileChart({ bins, mode }) {
  const w = 260;
  const h = 120;
  const barW = w / NUM_BINS;
  const color = mode === "diffusion" ? "#8fc7ff" : "#ffd27a";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
      <line x1="0" y1={h - 1} x2={w} y2={h - 1} stroke="#333" strokeWidth="1" />
      {bins.map((v, i) => {
        const barH = Math.max(2, v * (h - 12));
        return (
          <rect
            key={i}
            x={i * barW + 3}
            y={h - barH - 1}
            width={barW - 6}
            height={barH}
            rx="2"
            fill={color}
            opacity={0.85}
            style={{ transition: "height 0.25s ease, y 0.25s ease" }}
          />
        );
      })}
      <text x="0" y={h + 14} fontSize="10" fill="#777">
        source
      </text>
      <text x={w - 46} y={h + 14} fontSize="10" fill="#777">
        far away
      </text>
    </svg>
  );
}

// main page

export default function CosmicRayPage({ entry }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("diffusion");
  const [scatter, setScatter] = useState(0.6);
  const [bins, setBins] = useState(new Array(NUM_BINS).fill(0));

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const modeRef = useRef(mode);
  const scatterRef = useRef(scatter);
  const spawnAccumRef = useRef(0);
  const frameRef = useRef(null);
  const lastBinUpdateRef = useRef(0);

  useEffect(() => {
    modeRef.current = mode;
    // switching modes starts the population fresh so the profile isn't a blend.
    particlesRef.current = [];
  }, [mode]);

  useEffect(() => {
    scatterRef.current = scatter;
  }, [scatter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = time - lastTime;
      lastTime = time;

      // spawn new particles at a steady rate.
      spawnAccumRef.current += dt;
      const spawnInterval = 70;
      while (spawnAccumRef.current > spawnInterval) {
        spawnAccumRef.current -= spawnInterval;
        if (particlesRef.current.length < 260) {
          particlesRef.current.push(makeParticle(modeRef.current));
        }
      }

      // advance and slow particles.
      particlesRef.current = particlesRef.current
        .map((p) => stepParticle(p, modeRef.current, scatterRef.current))
        .filter((p) => Math.hypot(p.x - CENTER, p.y - CENTER) < MAX_RADIUS + 10);

      // trail effect.
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // faint boundary circle
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, MAX_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      // source (center)
      const pulse = 4 + Math.sin(time / 300) * 1.2;
      ctx.fillStyle = "#fff6df";
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, pulse, 0, Math.PI * 2);
      ctx.fill();

      // particles
      const color = modeRef.current === "diffusion" ? "#8fc7ff" : "#ffd27a";
      ctx.fillStyle = color;
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // update the density-profile chart a few times a second, not every frame.
      if (time - lastBinUpdateRef.current > 200) {
        lastBinUpdateRef.current = time;
        setBins(radialBins(particlesRef.current));
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const paper = entry?.paper;
  const poster = entry?.poster;
  const githubUrl = entry?.githubUrl;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>{`
        .cr-back-link:hover {
          color: #fff !important;
          border-color: ${ACCENT} !important;
        }
        .cr-btn:hover {
          background: ${ACCENT} !important;
          color: #000 !important;
          transform: translateY(-2px);
        }
        .cr-mode-btn {
          transition: all 0.2s ease;
        }
      `}</style>

      {/* header */}
      <div style={{ padding: "32px 32px 0 32px" }}>
        <button
          className="cr-back-link"
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
          RESEARCH · CALTECH · W21-S23
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Constraining Cosmic-Ray Transport with Observational Data
        </h1>
      </div>

      {/* simulation panel */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 32px 8px 32px" }}>
        <div
          style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
            background: "rgba(40, 40, 40, 0.8)",
            borderRadius: 12,
            padding: 28,
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* canvas and controls */}
          <div>
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              style={{ borderRadius: 8, background: "#000", display: "block" }}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {["diffusion", "streaming"].map((m) => (
                <button
                  key={m}
                  className="cr-mode-btn"
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: 20,
                    border: `1px solid ${mode === m ? ACCENT : "#333"}`,
                    background: mode === m ? "rgba(29,185,84,0.15)" : "transparent",
                    color: mode === m ? ACCENT : "#b3b3b3",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: 12, color: "#b3b3b3", display: "block", marginBottom: 6 }}>
                Scattering strength {mode === "streaming" ? "(field-line wander)" : "(turbulence)"}
              </label>
              <input
                type="range"
                min="0.05"
                max="1.4"
                step="0.05"
                value={scatter}
                onChange={(e) => setScatter(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: ACCENT }}
              />
            </div>
          </div>

          {/* live radial profile */}
          <div style={{ width: 260 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              Radial density profile
            </div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>
              particle count vs. distance from source
            </div>
            <ProfileChart bins={bins} mode={mode} />
            <p style={{ fontSize: 13, color: "#b3b3b3", lineHeight: 1.6, marginTop: 12 }}>
              {mode === "diffusion"
                ? "Diffusion piles cosmic rays up near the source and lets the population thin out gradually with distance, the classic signature of scattering off magnetic turbulence."
                : "Streaming carries cosmic rays outward almost ballistically, so the profile stays flatter and reaches farther, faster, the classic signature of transport along ordered field lines."}
            </p>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginTop: 4, marginBottom: 8 }}>
        toggle the transport mode and drag the slider
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
          {/* finished write-up*/}
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8 }}>
            Working on this project with Caltech's TAPIR group provided me with my introduction to the world of research! I used libraries like pandas and numpy to do data analysis on large datasets. On this project, I focused on creating Figure 2, which shows the lower limit of the effective cosmic ray transport rate as a function of impact parameter in the galaxies from the COS-Halos survey (Butsky et al., 2023). To develop this plot, I learned to use astropy, sympy, and scipy.
          </p>
        </div>
      </div>

      {/* bottom button row is same format as all-entries */}
      <div style={{ padding: "0 32px 64px 32px", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cr-btn"
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
        {paper && (
          <a
            href={paper}
            target="_blank"
            rel="noopener noreferrer"
            className="cr-btn"
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
            Read the Paper
          </a>
        )}
        {poster && (
          <a
            href={poster}
            target="_blank"
            rel="noopener noreferrer"
            className="cr-btn"
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
            View Poster
          </a>
        )}
      </div>
    </div>
  );
}