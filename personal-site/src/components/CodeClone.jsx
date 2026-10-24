// CodeClone.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#1db954";
const BLUE = "#8fc7ff";
const AMBER = "#ffd27a";

// data (all values taken from my paper)

const MODELS = [
  {
    id: "llama",
    name: "Llama3-8B",
    kind: "General-purpose",
    precision: 0.6333,
    recall: 0.1617,
    f1: 0.2567,
    accuracy: 0.5417,
    cm: { tn: 4532, fp: 468, fn: 4180, tp: 820 },
    note: "Calls almost everything a non-clone. About 84% of true clones are missed in this run.",
  },
  {
    id: "devstral",
    name: "Devstral-24B",
    kind: "Code-specific",
    precision: 0.65,
    recall: 0.5183,
    f1: 0.5767,
    accuracy: 0.6267,
    cm: { tn: 3679, fp: 1321, fn: 2414, tp: 2586 },
    note: "A big step up from Llama, but still misses roughly half of the true clones.",
  },
  {
    id: "codestral",
    name: "Codestral-22B",
    kind: "Code-specific",
    precision: 0.74,
    recall: 0.6,
    f1: 0.64,
    accuracy: 0.655,
    cm: { tn: 3204, fp: 1796, fn: 1149, tp: 3851 },
    note: "Best overall balance, so it was used for the repository analysis. It still produces false negatives.",
  },
  {
    id: "jina",
    name: "Jina Embeddings",
    kind: "Embedding baseline",
    precision: 0.54,
    recall: 0.6,
    f1: 0.57,
    accuracy: 0.54,
    cm: null,
    note: "Plain cosine similarity with no LLM. Codestral and Devstral both beat it significantly.",
  },
];

// Table 6, clone type counts across the 22 primary/fork pairs.
const TYPES = [
  {
    id: "Type-1",
    label: "Type-1",
    desc: "Exact copy",
    observed: 64993,
    residual: 135.15,
    color: "#1db954",
  },
  {
    id: "Type-2",
    label: "Type-2",
    desc: "Renamed variables, comments, layout",
    observed: 10572,
    residual: -142.27,
    color: BLUE,
  },
  {
    id: "Type-3",
    label: "Type-3",
    desc: "Lines added or removed",
    observed: 50041,
    residual: 58.93,
    color: AMBER,
  },
  {
    id: "Type-4",
    label: "Type-4",
    desc: "Same behavior, different code",
    observed: 28316,
    residual: -51.82,
    color: "#e58fff",
  },
];
const EXPECTED = 38480.5;
const MAX_COUNT = 70000;

const fmt = (n) => n.toLocaleString("en-US");
const pct = (v) => `${Math.round(v * 100)}%`;

// confusion matrix

function ConfusionMatrix({ cm }) {
  const cells = [
    { key: "tn", label: "True non-clone", value: cm.tn, row: 0, col: 0, good: true },
    { key: "fp", label: "False alarm", value: cm.fp, row: 0, col: 1, good: false },
    { key: "fn", label: "Missed clone", value: cm.fn, row: 1, col: 0, good: false },
    { key: "tp", label: "True clone", value: cm.tp, row: 1, col: 1, good: true },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: 4, alignItems: "stretch" }}>
        <div />
        <div style={axisLabel}>said non-clone</div>
        <div style={axisLabel}>said clone</div>

        {[0, 1].map((row) => (
          <React.Fragment key={row}>
            <div
              style={{
                ...axisLabel,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                alignSelf: "center",
              }}
            >
              {row === 0 ? "is non-clone" : "is clone"}
            </div>
            {cells
              .filter((c) => c.row === row)
              .map((c) => {
                const intensity = 0.15 + (c.value / 5000) * 0.75;
                const base = c.good ? "29,185,84" : "255,120,100";
                return (
                  <div
                    key={c.key}
                    style={{
                      background: `rgba(${base},${Math.min(intensity, 0.9)})`,
                      borderRadius: 6,
                      padding: "14px 6px",
                      textAlign: "center",
                      transition: "background 0.3s ease",
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{fmt(c.value)}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{c.label}</div>
                  </div>
                );
              })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const axisLabel = {
  fontSize: 11,
  color: "#888",
  textAlign: "center",
  padding: "2px 0",
};

// metric bars

function MetricBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "#b3b3b3" }}>{label}</span>
        <span style={{ color: "#fff", fontWeight: 700 }}>{value.toFixed(2)}</span>
      </div>
      <div style={{ height: 8, background: "#2a2a2a", borderRadius: 4, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${value * 100}%`,
            background: color,
            borderRadius: 4,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

// RQ1 panel: how well do LLMs find clones

function DetectionPanel() {
  const [modelId, setModelId] = useState("codestral");
  const m = MODELS.find((x) => x.id === modelId);

  return (
    <>
      <div style={{ width: 300 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
          Clone detection on CodeNet
        </div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>
          10,000 C++ pairs, half Type-4 clones, half non-clones
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {MODELS.map((x) => (
            <button
              key={x.id}
              className="cc-mode-btn"
              onClick={() => setModelId(x.id)}
              style={pillStyle(modelId === x.id)}
            >
              {x.name}
            </button>
          ))}
        </div>

        {m.cm ? (
          <ConfusionMatrix cm={m.cm} />
        ) : (
          <div
            style={{
              border: "1px dashed #444",
              borderRadius: 8,
              padding: 20,
              fontSize: 12,
              color: "#888",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            N/A
          </div>
        )}
        {m.cm && (
          <div style={{ fontSize: 11, color: "#666", marginTop: 8 }}>Confusion matrix from the first iteration.</div>
        )}
      </div>

      <div style={{ width: 280 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{m.name}</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>
          {m.kind} · averaged clone-class scores
        </div>
        <MetricBar label="Precision" value={m.precision} color={BLUE} />
        <MetricBar label="Recall" value={m.recall} color={AMBER} />
        <MetricBar label="F1 score" value={m.f1} color="#e58fff" />
        <MetricBar label="Accuracy" value={m.accuracy} color={ACCENT} />
        <p style={{ fontSize: 13, color: "#b3b3b3", lineHeight: 1.6, marginTop: 14 }}>{m.note}</p>
      </div>
    </>
  );
}

// RQ2 panel: which clone types show up in forks

function DistributionPanel() {
  const [view, setView] = useState("observed");
  const [selected, setSelected] = useState("Type-1");
  const sel = TYPES.find((t) => t.id === selected);
  const chartH = 200;
  const expectedY = (EXPECTED / MAX_COUNT) * chartH;
  const diff = (sel.observed - EXPECTED) / EXPECTED;

  return (
    <>
      <div style={{ width: 320 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
          Clone types in 22 microservice forks
        </div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>
          Codestral-22B, few-shot continuous prompt
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            ["observed", "Observed"],
            ["vs-uniform", "Vs. uniform"],
          ].map(([id, label]) => (
            <button key={id} className="cc-mode-btn" onClick={() => setView(id)} style={{ ...pillStyle(view === id), flex: 1 }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", height: chartH + 28 }}>
          {/* expected line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 28 + expectedY,
              borderTop: "1px dashed #777",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 28 + expectedY + 3,
              fontSize: 10,
              color: "#888",
            }}
          >
            if all types were equal ({fmt(Math.round(EXPECTED))})
          </div>

          <div style={{ display: "flex", gap: 10, height: chartH + 28, alignItems: "flex-end" }}>
            {TYPES.map((t) => {
              const h = (t.observed / MAX_COUNT) * chartH;
              const isSel = selected === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  aria-label={`${t.label}: ${fmt(t.observed)} clones`}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <div style={{ fontSize: 11, color: "#fff", marginBottom: 4, fontWeight: 700 }}>
                    {view === "observed"
                      ? fmt(t.observed)
                      : `${t.observed >= EXPECTED ? "+" : ""}${Math.round(((t.observed - EXPECTED) / EXPECTED) * 100)}%`}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: Math.max(3, h),
                      background: t.color,
                      opacity: isSel ? 1 : 0.45,
                      borderRadius: "4px 4px 0 0",
                      transition: "height 0.4s ease, opacity 0.2s ease",
                      outline: isSel ? "2px solid rgba(255,255,255,0.5)" : "none",
                    }}
                  />
                  <div style={{ fontSize: 11, color: isSel ? "#fff" : "#888", marginTop: 6, height: 16 }}>
                    {t.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ width: 260 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: sel.color, marginBottom: 4 }}>{sel.label}</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>{sel.desc}</div>

        <div style={statRow}>
          <span style={{ color: "#b3b3b3" }}>Detected</span>
          <b>{fmt(sel.observed)}</b>
        </div>
        <div style={statRow}>
          <span style={{ color: "#b3b3b3" }}>Vs. uniform</span>
          <b>
            {diff >= 0 ? "+" : ""}
            {Math.round(diff * 100)}%
          </b>
        </div>
        <div style={statRow}>
          <span style={{ color: "#b3b3b3" }}>Pearson residual</span>
          <b>
            {sel.residual > 0 ? "+" : ""}
            {sel.residual.toFixed(2)}
          </b>
        </div>

        <p style={{ fontSize: 13, color: "#b3b3b3", lineHeight: 1.6, marginTop: 14 }}>
          Type-1 and Type-3 clones show up more than chance would predict, while Type-2 and Type-4 show up less. The
          chi-square test strongly rejects a uniform split (χ² = 44,666, df = 3, Cramér's V = 0.311).
        </p>
      </div>
    </>
  );
}

const statRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13,
  color: "#fff",
  padding: "8px 0",
  borderBottom: "1px solid #2a2a2a",
};

function pillStyle(active) {
  return {
    padding: "8px 12px",
    borderRadius: 20,
    border: `1px solid ${active ? ACCENT : "#333"}`,
    background: active ? "rgba(29,185,84,0.15)" : "transparent",
    color: active ? ACCENT : "#b3b3b3",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  };
}

// main page

export default function CodeClonePage({ entry }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("detection");

  const paper = "https://www.researchgate.net/publication/414857677_An_LLM-based_Technique_for_Detection_of_Code_Clones_Across_Open_Source_Microservice_Repository_Forks";
  const githubUrl = "https://github.com/Camithilwen/Code-CloningAnalysis";

  const linkStyle = {
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
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <style>{`
        .cc-back-link:hover {
          color: #fff !important;
          border-color: ${ACCENT} !important;
        }
        .cc-btn:hover {
          background: ${ACCENT} !important;
          color: #000 !important;
          transform: translateY(-2px);
        }
        .cc-mode-btn {
          transition: all 0.2s ease;
        }
        .cc-mode-btn:hover {
          border-color: ${ACCENT} !important;
        }
      `}</style>

      {/* header */}
      <div style={{ padding: "32px 32px 0 32px" }}>
        <button
          className="cc-back-link"
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
          RESEARCH · NSF IRES · 2025
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: "0 auto", lineHeight: 1.2, maxWidth: 900 }}>
          Detecting Code Clones Across Microservice Forks with LLMs
        </h1>
      </div>

      {/* explorer panel */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 32px 8px 32px" }}>
        <div
          style={{
            background: "rgba(40, 40, 40, 0.8)",
            borderRadius: 12,
            padding: 28,
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              ["detection", "Can LLMs find clones?"],
              ["distribution", "Which clones show up in forks?"],
            ].map(([id, label]) => (
              <button key={id} className="cc-mode-btn" onClick={() => setTab(id)} style={pillStyle(tab === id)}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}>
            {tab === "detection" ? <DetectionPanel /> : <DistributionPanel />}
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#666", fontSize: 13, marginTop: 4, marginBottom: 8 }}>
        pick a model, or tap a bar, to explore the results
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
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#fff" }}>About the project</h2>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
            When an open-source microservice project gets forked, it is hard to tell how much of the original code
            survives and how much has been rewritten. Traditional clone detectors catch exact and near-exact copies, but
            miss code that was refactored to do the same thing in a different way (Type-4 clones). This project, part of
            an NSF IRES collaboration, uses LLMs and retrieval-augmented generation to compare code by meaning rather
            than by text.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8 }}>
            We first tested three LLMs and four prompting strategies on IBM's CodeNet dataset. Codestral-22B with a
            few-shot prompt that returns a confidence score for each clone type worked best, reaching 0.74 precision but
            only 0.60 recall. We then embedded 22 primary and fork repository pairs, matched similar code chunks with
            cosine similarity, and asked Codestral to classify each pair. Type-1 and Type-3 clones were the most common,
            and a human check on three projects broadly agreed.
          </p>
          <p style={{ color: "#b3b3b3", fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
            The main takeaway is a cautious one: code-specific LLMs clearly beat general-purpose models and an embedding
            baseline, but their false negative rate is too high for fully automated clone detection. For now they work
            best as a tool that supports established methods rather than replacing them.
          </p>
        </div>
      </div>

      {/* bottom button row is same format as all-entries */}
      <div style={{ padding: "0 32px 64px 32px", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="cc-btn" style={linkStyle}>
            GitHub Repository
          </a>
        )}
        {paper && (
          <a href={paper} target="_blank" rel="noopener noreferrer" className="cc-btn" style={linkStyle}>
            Read the Preprint
          </a>
        )}
      </div>
    </div>
  );
}