// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import ArtistHeader from "./components/ArtistHeader";
import ArtistPick from "./components/ArtistPick";
import Discography from "./components/Discography";
import FtIn from "./components/FeaturedIn";
import AllEntriesPage from "./components/AllEntriesPage"; // Create this component
import Footer from "./components/Footer";


const artist = {
  tracks: [
    {
      title: "snakum AT uci DOT edu",
      plays: "1000",
      duration: "2:20",
      explicit: false,
      githubUrl: "mailto:snakum@uci.edu"
    },
    {
      title: "LinkedIn",
      plays: "570",
      duration: "5:30",
      explicit: false,
      githubUrl: "https://www.linkedin.com/in/shreya-nakum/"
    },
    {
      title: "Instagram",
      plays: "495",
      duration: "3:48",
      explicit: false,
      githubUrl: "https://www.instagram.com/shreyanakum185/"
    },
    {
      title: "Spotify",
      plays: "36",
      duration: "3:59",
      explicit: true,
      githubUrl: "https://open.spotify.com/user/a865jfg5dv8rxzs43fu2yiuud"
    },
    {
      title: "Github",
      plays: "9",
      duration: "4:03",
      explicit: false,
      githubUrl: "https://github.com/sn82978"
    },
  ],
  playlists: [
    "This is Shreya Nakum",
    "Discography",
  ],
};


const artistPick = {
  image: "MLFFPic.png",
  postedBy: "Shreya Nakum",
  postedByAvatar: "shreya-standing.png",
  title: "Tiling: Method for Small Biological Image Identification",
  type: "UC Irvine: Rose Labs",
  githubUrl: "https://github.com/sn82978/CNN-Classifier"
};


const albums = [
    {
    title:"Uncovering the Typing and Distribution of Code Clones Across Forks of Open Source Microservice Repositories",
    cover: "db.png",
    year:"2025",
    type:"NSF IRES: University of Oulu",
    latest: true,
    githubUrl:"https://github.com/Camithilwen/Code-Cloning-Analysis",
    category:"Research"
  },
  {
    title: "Tiling: Computer Vision to Detect Fruit Fly Eggs",
    cover: "MLFFPic.png",
    year: "2025",
    type: "Rose & Mueller Labs",
    latest: true,
    githubUrl: "https://github.com/sn82978/CNN-Classifier",
    category: "Research",
    paper: "https://docs.google.com/document/d/1g8U7XFLoaX3DetpHfGf9URt-OD2jN2BHP9Nv4N5sYyY/edit?usp=sharing",
    poster: "https://drive.google.com/file/d/12x2XuuYTxEq3A-VKrbrTqwNeN5h-iyRa/view"
  },
  {
    title: "Statistical Analaysis and Machine Learning to Detect Drift v. Anti-Drift",
    cover: "IMG_4926.jpeg",
    year: "2025",
    type: "Rose & Mueller Labs",
    latest: true,
    githubUrl: "https://github.com/rose-mueller-labs/snp-data",
    category: "Research",
    paper: "https://docs.google.com/presentation/d/1aWlFPqgMO3BhaZnXAVgsTnJD6uUTx6W7gs6-XFdm-R8/edit?usp=sharing",
    poster: "https://drive.google.com/file/d/1jpDVq2Ie3iVeWhEsMzWQTm08o821e0iy/view?usp=sharing"
  },
  {
    title: "UI for Tiling",
    cover: "classifier-site-sample.png",
    year: "2025",
    type: "Rose & Mueller Labs",
    latest: true,
    githubUrl: "https://github.com/sn82978/Classifier-Site",
    category: "Research",
    paper: "https://github.com/sn82978/Classifier-Site/blob/main/README.md",
    poster: "https://drive.google.com/file/d/12x2XuuYTxEq3A-VKrbrTqwNeN5h-iyRa/view",
  },
  {
    title: "Constraining Cosmic-Ray Transport with Observational Data",
    cover: "mnras-plot.png",
    year: "2023",
    type: "California Institute of Technology",
    latest: false,
    githubUrl: "https://github.com/sn82978/Cosmic-Ray-Transport-Plots",
    category: "Research", // or "Projects",
    paper: "https://academic.oup.com/mnras/article/521/2/2477/7070735?login=false", // add for each entry
    poster: "https://aas240-aas.ipostersessions.com/Default.aspx?s=39-11-68-61-92-B5-5B-4D-65-27-D7-9C-C2-2B-9E-B1#stay"
  },
  {
    title: "Sentiment Analysis for Financial News",
    cover: "sent.png",
    year: "2024",
    type: "Atoma Media",
    latest: false,
    githubUrl: "https://huggingface.co/snoneeightfive/financial-news-headers-sentiment-analysis",
    category: "Projects",
  },
  {
    title: "AI@UCI: Workshops",
    cover: "IMG_8906.jpeg",
    year: "2025",
    type: "Workshop Coordinator",
    latest: true,
    githubUrl: "https://github.com/Artificial-Intelligence-UC-Irvine",
    category: "Projects"
  },
  {
    title: "HackMIT: ActsAI",
    cover: "sd.png",
    year: "2024",
    type: "HackMIT",
    latest: false,
    githubUrl: "https://github.com/PatelPurav05/ActsAI",
    category: "Projects" // or "Projects"
  },
  {
    title: "Boiling Bad",
    cover: "boiling.png",
    year: "2025",
    type: "[Personal]",
    latest: true,
    githubUrl: "https://sn82978.github.io/BOILING-BAD/",
    category: "Projects" // or "Projects"
  }
];

const features = [
  {
    title: "Constraining Cosmic-Ray Transport with Observational Data",
    cover: "mnras-plot.png",
    year: "2023",
    type: "California Institute of Technology",
    latest: false,
    githubUrl: "https://academic.oup.com/mnras/article/521/2/2477/7070735?login=false",
    category: "Volunteering" // or "Projects"
  },
  {
    title: "MHS Alumnus Interview",
    cover: "alumnus.png",
    year: "2025",
    type: "Interview",
    latest: true,
    githubUrl: "https://mhstheunion.com/2025/03/04/mhs-alumni-discuss-college-experiences/",
    category: "Volunteering" // or "Projects"
  }
];


// Sidebar component updated to use Link and highlight active page
function Sidebar({ playlists }) {
  const location = useLocation();

  const handleCreateClick = () => {
    window.open("https://vite.dev/guide/", "_blank", "noopener,noreferrer");
  };

  return (
    <aside style={{
      width: 260,
      background: "#000",
      color: "#b3b3b3",
      height: "100vh",
      padding: "24px 0",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #333",
    }}>
      <div style={{ padding: "0 24px", marginBottom: 24 }}>
        <button 
        onClick={handleCreateClick}
        style={{
          background: "#1db954",
          color: "#fff",
          border: "none",
          borderRadius: 25,
          fontWeight: 600,
          padding: "12px 24px",
          marginBottom: 16,
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontSize: 14
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#1ed760";
          e.target.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#1db954";
          e.target.style.transform = "scale(1)";
        }}>Create</button>
      </div>
      <div style={{ padding: "0 24px" }}>
        <div style={{ fontWeight: "bold", color: "#fff", marginBottom: 16, fontSize: 16 }}>Your Library</div>
        <div style={{ fontSize: 14, marginBottom: 8, color: "#b3b3b3" }}>Playlists</div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              padding: "12px 16px",
              background: location.pathname === "/" ? "rgba(29, 185, 84, 0.1)" : "transparent",
              color: location.pathname === "/" ? "#1db954" : "#b3b3b3",
              borderRadius: 8,
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: location.pathname === "/" ? "1px solid #1db954" : "1px solid transparent"
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== "/") {
                e.target.style.background = "rgba(80, 80, 80, 0.9)";
                e.target.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== "/") {
                e.target.style.background = "transparent";
                e.target.style.color = "#b3b3b3";
              }
            }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Shreya Nakum</Link>
          </li>

          {playlists.map((pl) => {
            if (pl === "This is Shreya Nakum") {
              // External resume URL
              return (
                <li
                  key={pl}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(80, 80, 80, 0.9)";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#b3b3b3";
                  }}
                >
                  <a
                    href="ShreyaNakumResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {pl}
                  </a>
                </li>
              );
            }

            if (pl === "Discography") {
              // Internal link to /all-entries
              return (
                <li
                  key={pl}
                  style={{
                    padding: "12px 16px",
                    background: location.pathname === "/all-entries" ? "rgba(29, 185, 84, 0.1)" : "transparent",
                    color: location.pathname === "/all-entries" ? "#1db954" : "#b3b3b3",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: location.pathname === "/all-entries" ? "1px solid #1db954" : "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== "/all-entries") {
                      e.target.style.background = "rgba(80, 80, 80, 0.9)";
                      e.target.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== "/all-entries") {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#b3b3b3";
                    }
                  }}
                >
                  <Link
                    to="/all-entries"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {pl}
                  </Link>
                </li>
              );
            }

            // Default rendering for any other playlists
            return (
              <li
                key={pl}
                style={{
                  padding: "12px 16px",
                  background: location.pathname === `/${pl}` ? "rgba(29, 185, 84, 0.1)" : "transparent",
                  color: location.pathname === `/${pl}` ? "#1db954" : "#b3b3b3",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: location.pathname === `/${pl}` ? "1px solid #1db954" : "1px solid transparent"
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== `/${pl}`) {
                    e.target.style.background = "rgba(80, 80, 80, 0.9)";
                    e.target.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== `/${pl}`) {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#b3b3b3";
                  }
                }}
              >
                <Link to={`/${pl}`} style={{ color: "inherit", textDecoration: "none" }}>{pl}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}


function PopularTracks({ tracks }) {
  const handleTrackClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Popular</h2>
      <div style={{
        background: "rgba(40, 40, 40, 0.8)",
        borderRadius: 12,
        padding: 24,
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <table style={{ width: "100%", color: "#fff", borderSpacing: 0 }}>
          <thead>
            <tr style={{ color: "#b3b3b3", fontSize: 14, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <th style={{ textAlign: "left", width: 40, paddingBottom: 16 }}>#</th>
              <th style={{ textAlign: "left", paddingBottom: 16 }}>Title</th>
              <th style={{ textAlign: "left", width: 180, paddingBottom: 16 }}>Plays</th>
              <th style={{ textAlign: "left", width: 80, paddingBottom: 16 }}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, i) => (
             <tr
             key={track.title}
             className="popular-track-row"
             style={{
               fontSize: 16,
               cursor: "pointer",
               transition: "all 0.2s ease"
             }}
             onClick={() => handleTrackClick(track.githubUrl)}
             tabIndex={0}
             onKeyPress={e => { if (e.key === "Enter" || e.key === " ") handleTrackClick(track.githubUrl); }}
             onMouseEnter={(e) => {
               e.currentTarget.style.background = "rgba(80, 80, 80, 0.9)";
               e.currentTarget.style.borderRadius = "8px";
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.background = "transparent";
               e.currentTarget.style.borderRadius = "0px";
             }}
             title="View social media"
           >
                <td style={{ padding: "12px 0" }}>{i + 1}</td>
                <td>
                  <span style={{ marginRight: 8 }}>{track.title}</span>
                  {track.explicit && (
                    <span style={{
                      background: "#b3b3b3",
                      color: "#000",
                      borderRadius: 3,
                      fontSize: 11,
                      padding: "2px 6px",
                      fontWeight: "bold",
                      marginLeft: 4
                    }}>E</span>
                  )}
                </td>
                <td style={{ color: "#b3b3b3" }}>{track.plays}</td>
                <td style={{ color: "#b3b3b3" }}>{track.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



// Playlist page component
function PlaylistPage({ name }) {
  return (
    <div style={{ padding: "32px", color: "#fff", background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)", minHeight: "100vh" }}>
      <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>{name.charAt(0).toUpperCase() + name.slice(1)} Page</h2>
      <p style={{ fontSize: 18, color: "#b3b3b3" }}>This is the {name} page!</p>
    </div>
  );
}

// Home page component
function HomePage() {
  return (
    <div style={{ 
      background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)", 
      minHeight: "100vh",
      color: "#fff"
    }}>
      <ArtistHeader artist={artist} />
      <div style={{ padding: "32px" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 24 }}>About</h2>
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: 40,
          background: "rgba(40, 40, 40, 0.8)",
          borderRadius: 12,
          padding: 32,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          {/* Image container: 25% width */}
          <div style={{ flex: "0 0 25%", maxWidth: "25%" }}>
            <img
              src="IMG_0454_Original.jpg"
              alt="Shreya Nakum"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
              }}
            />
          </div>
          {/* About blurb: 75% width */}
          <div style={{ flex: "1 1 75%", marginLeft: 32 }}>
            <div style={{ color: "#e1e1e1", fontSize: 16, lineHeight: 1.7 }}>
              <p>Hi! I'm Shreya, a computer science major specializing in Intelligent Systems and 
                Systems & Software at UC Irvine. I am a part of the Campus Honors Collegium and the Information 
                and Computer Science Honors Program. I am passionate about 
                multidisciplinary research, especially regarding AI tools!</p>
              <p>My research interests consist of computational astrophysics, computational biology, and machine learning. I have a lot of experience with machine learning and creating models. In the past, I have pruned datasets and finetuned existing models to create custom models for whatever issue I'm facing. 
                Recently, I have developed a Computer Vision CNN model to detect small biological images. Over this last summer, I was accepted into the National Science Foundation's IRES REU,
                where I conducted research at the University of Oulu in Finland.</p>
              <p>I am interested in joining research labs and internships in machine learning.</p>
              <p> I absolutely love music, it is truly my passion. At the moment, I recommend you to listen to "Mugwort" by MF Doom (or just click the play button :D ).</p>
            </div>
          </div>
        </div>
      </div>
      <PopularTracks tracks={artist.tracks} />
      <div style={{ padding: "32px" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Artist Pick</h2>
        <ArtistPick pick={artistPick} />
      </div>
      <div style={{ padding: "32px" }}>
        <Discography albums={albums} name="Discography" />
      </div>
      <div style={{ padding: "32px" }}>
        <FtIn albums={features}/>
      </div>
      <Footer></Footer>
    </div>
  );
}


function App() {
  const SIDEBAR_WIDTH = 260; // Adjust as needed

  return (
    <div style={{ background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)", minHeight: "100vh" }}>
      {/* Fixed Sidebar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: SIDEBAR_WIDTH,
          background: "#000",
          zIndex: 100,
          borderRight: "1px solid #333"
        }}
      >
        <Sidebar playlists={artist.playlists} />
      </div>
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          minHeight: "100vh",
          overflow: "auto"
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-entries" element={<AllEntriesPage entries={albums} />} />
          <Route path="/resume" element={<PlaylistPage name="resume" />} />
          <Route path="/CV" element={<PlaylistPage name="CV" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}


export default App;