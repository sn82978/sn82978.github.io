// Personal.jsx
// A Spotify-playlist-style page about what I like to do, with a spinning CD and photos.

import React, { useState } from "react";

const ACCENT = "#1db954";

// "tracks" = things I like to do. Add or edit entries here.
const TRACKS = [
  {
    title: "Listening to music on my walkman.",
    blurb: "Since last year, I have begun collecting CDs and vinyls at various stores and on the internet. I have grown my collection to about 50 CDs, now! Most recently, I got Charli XCX's Brat CD. Right now, I am listening to my Britney Spears CD. Aside from my collecting, I play the flute, and have recently been learning audio engineering.",
    tag: "Music",
  },
  {
    title: "Drinking coffee.",
    blurb: "I love drinking coffee and enjoy trying different types of it. Recently, I have been into drinking Costa Rican coffee, especially the Kwiso mocha coffee. I also enjoy trying out new coffee shops and bakeries!",
    tag: "Kitchen",
  },
  {
    title: "Baking sweet treats.",
    blurb: "I began baking a couple years ago with my mom and now that I am in college I bake for my roommate and friends! My go-to recipe is always brown butter chocolate chip cookies. I have recently been learning to make pies...my first attempt was a huge fail.",
    tag: "Kitchen",
  },
  {
    title: "Working on this website!",
    blurb: "I love adding fun pages or animations to this website, or other little easter eggs (try finding them!). I also love to think of my research projects and experiences as different albums, and my portfolio as looking at an artist's discography.",
    tag: "Side Project",
  },
  {
    title: "Hiking anywhere.",
    blurb: "One of my favorite pastimes whenever I have a break is to go hiking. My favorites hikes are Cathedral rock in Sedona and Fairy falls by the Columbia River Gorge.",
    tag: "Outdoors"
  }

];

const PHOTOS = [
  { src: "coffee Medium.jpeg", caption: "Coffee and an almond croissant." },
  { src: "hiking_oregon.jpeg", caption: "Hiking by the Columbia River!" },
  { src: "pear_cake.jpeg", caption: "A pear cake I baked last Thanksgiving." },
  { src: "walkman Medium.jpeg", caption: "Listening to music on my walkman!"}
];

const TILTS = [-3, 2, -1.5, 3, -2, 1.5];

// CD

// Shared clear-plastic rings drawn on top of every disc's artwork.
function Rim() {
  return (
    <>
      <circle cx="100" cy="100" r="97" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="28" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
    </>
  );
}

function ArtFrame({ children }) {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
      {children}
      <Rim />
    </svg>
  );
}

// Disc 0 (the default): hand-drawn recreation of the MF DOOM disc.
// Dusty purple face, pale yellow zig-zag line, red scalloped cloud, tiny white blob.
function DoomArt() {
  return (
    <ArtFrame>
      <rect width="200" height="200" fill="#6b6591" />

      {/* red cloud */}
      <g fill="#e2361f">
        <polygon points="0,70 0,200 130,200 122,186 82,172 50,160 26,140 20,100 10,76" />
        <circle cx="8" cy="82" r="14" />
        <circle cx="14" cy="98" r="12" />
        <circle cx="12" cy="116" r="12" />
        <circle cx="15" cy="133" r="13" />
        <circle cx="26" cy="148" r="13" />
        <circle cx="42" cy="160" r="12" />
        <circle cx="60" cy="170" r="13" />
        <circle cx="78" cy="177" r="12" />
        <circle cx="96" cy="184" r="12" />
        <circle cx="114" cy="190" r="12" />
        <circle cx="127" cy="197" r="10" />
      </g>

      {/* yellow zig-zag */}
      <g fill="none" stroke="#e6e585" strokeWidth="7" strokeLinejoin="miter" strokeLinecap="butt">
        <polyline points="137,-2 137,31 113,42 111,98" />
        <polyline points="100,108 100,143" />
        <polyline points="46,188 72,142 100,143 137,146 163,98 206,98" />
      </g>

      {/* little white blob */}
      <ellipse cx="168" cy="38" rx="6" ry="4.2" fill="#f1f0f4" />

      {/* tiny printed text, suggested with short lines */}
      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" transform="rotate(-24 62 42)">
        <line x1="42" y1="36" x2="82" y2="36" />
        <line x1="46" y1="41" x2="82" y2="41" />
        <line x1="52" y1="46" x2="82" y2="46" />
        <line x1="62" y1="51" x2="82" y2="51" />
      </g>
    </ArtFrame>
  );
}


// Britney Spears Pretty Girls
function PrettyGirlsArt() {
  const titleFont = "Impact, 'Arial Narrow', 'Arial Black', sans-serif";
  return (
    <ArtFrame>
      <defs>
        <radialGradient id="pz-pg-bg" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0" stopColor="#b3aea8" />
          <stop offset="1" stopColor="#77736f" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#pz-pg-bg)" />

      {/* soft reflective bands */}
      <polygon points="100,100 -20,40 -20,95" fill="rgba(255,255,255,0.14)" />
      <polygon points="100,100 220,160 220,105" fill="rgba(255,255,255,0.14)" />
      <polygon points="100,100 40,-20 95,-20" fill="rgba(160,100,120,0.16)" />
      <polygon points="100,100 160,220 105,220" fill="rgba(160,100,120,0.16)" />

      {/* dark ring around the hub */}
      <circle cx="100" cy="100" r="38" fill="#111" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

      {/* title with a blue drop shadow */}
      <g fontFamily={titleFont} fontWeight="900" fontSize="24" textAnchor="middle">
        <text x="103" y="48" fill="#2f35e0" textLength="118" lengthAdjust="spacingAndGlyphs">PRETTY GIRLS</text>
        <text x="101.5" y="46" fill="#2f35e0" textLength="118" lengthAdjust="spacingAndGlyphs">PRETTY GIRLS</text>
        <text x="100" y="44" fill="#f0198c" textLength="118" lengthAdjust="spacingAndGlyphs">PRETTY GIRLS</text>
      </g>
      <text
        x="100"
        y="58"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="6"
        fill="#ffffff"
        textLength="104"
        lengthAdjust="spacing"
      >
        BRITNEY SPEARS &amp; IGGY AZALEA
      </text>
    </ArtFrame>
  );
}

// Getz & Gilberto
function GetzGilbertoArt() {
  const patches = [
    ["0,0 92,8 72,58 0,48", "#f06a22"],
    ["92,8 200,0 200,72 140,62", "#e24a18"],
    ["0,48 72,58 60,120 0,130", "#e04b17"],
    ["72,58 140,62 150,128 62,122", "#f27a2a"],
    ["140,62 200,72 200,150 150,128", "#ee6a21"],
    ["0,130 60,120 90,200 0,200", "#f06a22"],
    ["62,122 150,128 130,200 90,200", "#d9441a"],
    ["150,128 200,150 200,200 130,200", "#f27a2a"],
    ["30,20 70,16 64,40 28,44", "#d9441a"],
    ["108,70 150,76 146,100 104,96", "#d6401a"],
  ];
  const yellow = [
    "116,22 144,20 150,40 130,52 114,48",
    "50,53 72,50 78,68 58,76 48,70",
    "68,90 82,92 80,106 70,108",
    "94,124 112,122 118,142 108,154 96,148",
    "34,141 48,139 50,158 38,164",
  ];
  const black = [
    "35,47 66,45 68,52 38,58",
    "134,42 156,40 160,66 142,74 132,62",
    "112,92 126,89 128,104 118,112 110,106",
    "154,131 170,129 172,150 160,160 152,150",
  ];
  return (
    <ArtFrame>
      <rect width="200" height="200" fill="#e9581e" />
      {patches.map(([pts, fill], i) => (
        <polygon key={i} points={pts} fill={fill} opacity="0.85" />
      ))}
      {/* palette-knife scratches */}
      <g fill="none" stroke="#a63a14" strokeOpacity="0.45" strokeWidth="0.8">
        <path d="M20,30 L44,70" />
        <path d="M150,20 L176,52" />
        <path d="M60,160 L88,186" />
        <path d="M120,110 L140,150" />
        <path d="M10,110 L30,96" />
        <path d="M170,110 L190,140" />
      </g>
      {yellow.map((pts, i) => (
        <polygon key={"y" + i} points={pts} fill="#f7c61c" />
      ))}
      {black.map((pts, i) => (
        <polygon key={"b" + i} points={pts} fill="#16110e" />
      ))}
    </ArtFrame>
  );
}

// BRAT
function BratArt() {
  return (
    <ArtFrame>
      <defs>
        <radialGradient id="pz-brat-bg" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#d3df3a" />
          <stop offset="1" stopColor="#b2cf26" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#pz-brat-bg)" />

      {/* crinkled paper */}
      <g fill="none" strokeWidth="1" strokeLinecap="round">
        <g stroke="rgba(255,255,255,0.28)">
          <path d="M20,60 C50,70 70,50 110,64" />
          <path d="M30,150 C60,140 90,160 130,148" />
          <path d="M120,24 C140,44 130,70 150,92" />
          <path d="M60,176 C80,160 70,140 90,128" />
        </g>
        <g stroke="rgba(80,100,0,0.2)">
          <path d="M14,104 C40,96 60,114 92,104" />
          <path d="M110,176 C130,160 160,170 182,150" />
          <path d="M150,30 C160,50 176,52 190,66" />
          <path d="M44,34 C60,48 84,40 96,28" />
        </g>
      </g>

      {/* paper tab on the right edge */}
      <rect x="168" y="70" width="40" height="52" fill="#b6e07a" opacity="0.8" transform="rotate(4 188 96)" />

      <text
        x="102"
        y="62"
        textAnchor="middle"
        fontFamily="'Arial Narrow', Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="27"
        letterSpacing="-1"
        fill="#1b1b12"
      >
        brat
      </text>
      <g fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="10" textAnchor="middle" fill="#1b1b12">
        <text x="100" y="146">charli</text>
        <text x="100" y="158">xcx</text>
      </g>
    </ArtFrame>
  );
}

// The first disc is the default; the rest are picked at random when a song is clicked.
const DISCS = [DoomArt, PrettyGirlsArt, GetzGilbertoArt, BratArt];

function Disc({ spinning, discIdx, prevIdx }) {
  const Current = DISCS[discIdx];
  const Prev = prevIdx !== null ? DISCS[prevIdx] : null;

  return (
    <div className="pz-cd-wrap" aria-hidden="true">
      <div className="pz-cd" style={{ animationPlayState: spinning ? "running" : "paused" }}>
        {/* the previous disc stays underneath while the new one fades in on top */}
        {Prev && (
          <div className="pz-art-layer">
            <Prev />
          </div>
        )}
        <div key={discIdx} className={`pz-art-layer${prevIdx !== null ? " pz-art-in" : ""}`}>
          <Current />
        </div>
      </div>
      {/* static shine so the light doesn't spin with the disc */}
      <div className="pz-cd-shine" />
      <div className="pz-cd-hub">
        <div className="pz-cd-hole" />
      </div>
    </div>
  );
}

// photos

function Polaroid({ photo, index }) {
  const [failed, setFailed] = useState(false);
  const tilt = TILTS[index % TILTS.length];

  return (
    <figure className="pz-polaroid" style={{ "--tilt": `${tilt}deg` }}>
      <div className="pz-tape" />
      <div className="pz-photo">
        {failed ? (
          <div className="pz-photo-fallback">✦</div>
        ) : (
          <img src={`/${photo.src}`} alt={photo.caption} onError={() => setFailed(true)} />
        )}
      </div>
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

// page

export default function PersonalPage() {
  const [playing, setPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [discIdx, setDiscIdx] = useState(0); // 0 = the default disc
  const [prevDisc, setPrevDisc] = useState(null);

  // clicking a song starts the CD and swaps in a random disc (never the one already showing)
  const playTrack = (i) => {
    setCurrent(i);
    setPlaying(true);
    const options = DISCS.map((_, k) => k).filter((k) => k !== discIdx);
    const next = options[Math.floor(Math.random() * options.length)];
    setPrevDisc(discIdx);
    setDiscIdx(next);
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
        @keyframes pz-spin { to { transform: rotate(360deg); } }
        @keyframes pz-fade { from { opacity: 0; } to { opacity: 1; } }

        .pz-hero {
          display: flex;
          align-items: flex-end;
          gap: 32px;
          flex-wrap: wrap;
          padding: 56px 32px 32px 32px;
          background:
            radial-gradient(ellipse at 15% 0%, rgba(107,101,145,0.45), transparent 55%),
            radial-gradient(ellipse at 60% 0%, rgba(230,229,133,0.10), transparent 55%),
            radial-gradient(ellipse at 100% 20%, rgba(226,54,31,0.18), transparent 50%);
        }

        .pz-cd-wrap {
          position: relative;
          width: 232px;
          height: 232px;
          flex: 0 0 auto;
          filter: drop-shadow(0 12px 28px rgba(0,0,0,0.55));
        }
        .pz-cd {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          animation: pz-spin 5s linear infinite;
        }
        .pz-art-layer {
          position: absolute;
          inset: 0;
        }
        .pz-art-in {
          animation: pz-fade 0.6s ease both;
        }
        .pz-cd-shine {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.25) 100%);
          pointer-events: none;
        }
        .pz-cd-hub {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 76px;
          height: 76px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, #f4f4f8 0%, #c9ccd6 60%, #eceef4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pz-cd-hole {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #151515;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,0.35);
        }

        .pz-play {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: ${ACCENT};
          color: #000;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .pz-play:hover { transform: scale(1.06); background: #1ed760; }

        .pz-row {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .pz-row:hover { background: rgba(80, 80, 80, 0.9); }
        .pz-row:focus-visible { outline: 2px solid ${ACCENT}; }

        .pz-polaroid {
          --tilt: 0deg;
          position: relative;
          margin: 0;
          background: #f6f4ef;
          padding: 12px 12px 10px 12px;
          border-radius: 4px;
          box-shadow: 0 10px 28px rgba(0,0,0,0.45);
          transform: rotate(var(--tilt));
        }
        .pz-polaroid figcaption {
          color: #2a2a2a;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          padding-top: 10px;
        }
        .pz-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          width: 64px;
          height: 20px;
          transform: translateX(-50%) rotate(-2deg);
          background: rgba(214,168,255,0.7);
          border-radius: 2px;
        }
        .pz-photo {
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #ddd;
          border-radius: 2px;
        }
        .pz-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pz-photo-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: #fff;
          background: conic-gradient(from 20deg, #ff9ad5, #ffd6a8, #c8ffd9, #9ad8ff, #b9a8ff, #ff9ad5);
        }

        @media (prefers-reduced-motion: reduce) {
          .pz-cd { animation: none; }
          .pz-art-in { animation: none; }
          .pz-play { transition: none; }
        }
      `}</style>

      {/* hero */}
      <div className="pz-hero">
        <Disc spinning={playing} discIdx={discIdx} prevIdx={prevDisc} />

        <div style={{ minWidth: 0, flex: "1 1 320px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Playlist</div>
          <h1
            style={{
              fontSize: "clamp(48px, 9vw, 96px)",
              fontWeight: 800,
              margin: "4px 0 12px 0",
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            Personal
          </h1>
          <div style={{ fontSize: 15, color: "#e1e1e1", lineHeight: 1.5 }}>
            Things I like to do when I'm not in the lab.
          </div>
          <div style={{ fontSize: 14, color: "#b3b3b3", marginTop: 6 }}>
            <strong style={{ color: "#fff" }}>Shreya Nakum</strong> · {TRACKS.length} songs, ∞ min
          </div>
        </div>
      </div>

      {/* controls + now playing */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 32px 24px 32px" }}>
        <button
          className="pz-play"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause the CD" : "Spin the CD"}
        >
          {playing ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
        </button>
        <div style={{ fontSize: 14, color: "#b3b3b3", minWidth: 0 }}>
          {playing ? "Now spinning: " : "Paused: "}
          <span style={{ color: "#fff", fontWeight: 600 }}>{TRACKS[current].title}</span>
        </div>
      </div>

      {/* tracklist */}
      <div style={{ padding: "0 32px 24px 32px", maxWidth: 960 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr auto",
            gap: 12,
            padding: "0 16px 12px 16px",
            color: "#b3b3b3",
            fontSize: 13,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            marginBottom: 8,
          }}
        >
          <span>#</span>
          <span>Title</span>
          <span>Type</span>
        </div>

        {TRACKS.map((t, i) => {
          const active = i === current;
          return (
            <div
              key={t.title}
              className="pz-row"
              role="button"
              tabIndex={0}
              onClick={() => playTrack(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  playTrack(i);
                }
              }}
            >
              <span style={{ color: active ? ACCENT : "#b3b3b3", fontWeight: active ? 700 : 400 }}>{i + 1}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 600, color: active ? ACCENT : "#fff" }}>{t.title}</div>
                <div style={{ fontSize: 14, color: "#b3b3b3", marginTop: 2, lineHeight: 1.5 }}>{t.blurb}</div>
              </div>
              <span style={{ fontSize: 13, color: "#b3b3b3" }}>{t.tag}</span>
            </div>
          );
        })}
      </div>

      {/* photos */}
      <div style={{ padding: "24px 32px 64px 32px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Highlights</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 240px))",
            gap: 36,
            justifyContent: "center",
          }}
        >
          {PHOTOS.map((p, i) => (
            <Polaroid key={p.src} photo={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}