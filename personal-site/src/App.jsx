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
  title: "ML to Detect Fruit Fly Eggs",
  type: "Research",
  githubUrl: "https://github.com/sn82978/CNN-Classifier"
};


const albums = [
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
    cover: "Screenshot 2025-03-23 at 10.49.53 PM.png",
    year: "2024",
    type: "Atoma Media",
    latest: false,
    githubUrl: "https://huggingface.co/snoneeightfive/financial-news-headers-sentiment-analysis",
    category: "Projects",
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
    cover: "Screenshot 2025-03-23 at 10.15.24 PM.png",
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
    title: "AI@UCI: Workshops",
    cover: "IMG_8906.jpeg",
    year: "2025",
    type: "Workshop Coordinator",
    latest: true,
    githubUrl: "https://github.com/sn82978/AI-UCI-Demos",
    category: "Volunteering" // or "Projects"
  },
  {
    title: "MHS Alumnus Interview",
    cover: "Screenshot 2025-06-08 at 10.01.42 PM.png",
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
      borderRight: "1px solid #222",
    }}>
      <div style={{ padding: "0 24px", marginBottom: 24 }}>
        <button 
        onClick={handleCreateClick}
        style={{
          background: "#fff",
          color: "#000",
          border: "none",
          borderRadius: 999,
          fontWeight: "bold",
          padding: "8px 24px",
          marginBottom: 16,
          cursor: "pointer"
        }}>Create</button>
      </div>
      <div style={{ padding: "0 24px" }}>
        <div style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>Your Library</div>
        <div style={{ fontSize: 14, marginBottom: 8 }}>Playlists</div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              padding: "8px 0",
              background: location.pathname === "/" ? "#282828" : "transparent",
              color: location.pathname === "/" ? "#fff" : "#b3b3b3",
              borderRadius: 4,
              cursor: "pointer"
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
                    padding: "8px 0",
                    borderRadius: 4,
                    cursor: "pointer"
                  }}
                >
                  <a
                    href="https://drive.google.com/file/d/12f1we87TBJ78daKGBmC6RHoP3fVy-gO6/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#b3b3b3", textDecoration: "none" }}
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
                    padding: "8px 0",
                    background: location.pathname === "/all-entries" ? "#282828" : "transparent",
                    color: location.pathname === "/all-entries" ? "#fff" : "#b3b3b3",
                    borderRadius: 4,
                    cursor: "pointer"
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
                  padding: "8px 0",
                  background: location.pathname === `/${pl}` ? "#282828" : "transparent",
                  color: location.pathname === `/${pl}` ? "#fff" : "#b3b3b3",
                  borderRadius: 4,
                  cursor: "pointer"
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
    <div style={{ padding: "24px 32px" }}>
      <h2 style={{ color: "#fff", fontSize: 28, marginBottom: 16 }}>Popular</h2>
      <table style={{ width: "100%", color: "#fff", borderSpacing: 0 }}>
        <thead>
          <tr style={{ color: "#b3b3b3", fontSize: 14 }}>
            <th style={{ textAlign: "left", width: 40 }}>#</th>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left", width: 180 }}>Plays</th>
            <th style={{ textAlign: "left", width: 80 }}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, i) => (
           <tr
           key={track.title}
           className="popular-track-row"
           style={{
             borderTop: "1px solid #282828",
             fontSize: 18,
             cursor: "pointer"
           }}
           onClick={() => handleTrackClick(track.githubUrl)}
           tabIndex={0}
           onKeyPress={e => { if (e.key === "Enter" || e.key === " ") handleTrackClick(track.githubUrl); }}
           title="View social media"
         >
              <td style={{ padding: "8px 0" }}>{i + 1}</td>
              <td>
                <span style={{ marginRight: 8 }}>{track.title}</span>
                {track.explicit && (
                  <span style={{
                    background: "#b3b3b3",
                    color: "#000",
                    borderRadius: 2,
                    fontSize: 12,
                    padding: "0 4px",
                    fontWeight: "bold",
                    marginLeft: 4
                  }}>E</span>
                )}
              </td>
              <td>{track.plays}</td>
              <td>{track.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



// Playlist page component
function PlaylistPage({ name }) {
  return (
    <div style={{ padding: "24px 32px", color: "#fff" }}>
      <h2 style={{ fontSize: 28, marginBottom: 16 }}>{name.charAt(0).toUpperCase() + name.slice(1)} Page</h2>
      <p>This is the {name} page!</p>
    </div>
  );
}

// Home page component
// Home page component
function HomePage() {
  return (
    <>
      <div style={{ padding: "24px 32px" }}>
        <ArtistHeader artist={artist} />
        <h2 style={{ color: "#fff", fontSize: 28, marginBottom: 16 }}>About</h2>
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: 32
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
                borderRadius: "5%", // Optional: for rounded image
                // border: "2px solid #fff"
              }}
            />
          </div>
          {/* About blurb: 75% width */}
          <div style={{ flex: "1 1 75%", marginLeft: 24 }}>
            <div style={{ color: "#fff", fontSize: 16, lineHeight: 1.7 }}>
              <p>Hi! I'm Shreya, a computer science major specializing in Intelligent Systems and 
                Systems & Software at UC Irvine with a minor in Mathematics. I am passionate about 
                multidisciplinary research, especially how AI tools can be used in fields such as 
                biology or physics.</p>
              <p>My research interests consist of computational astrophysics, computational biology, and machine learning. I have a lot of experience with machine learning and creating models. In the past, I have pruned datasets and finetuned existing models to create custom models for whatever issue I'm facing. Recently, I have developed a Computer Vision CNN model to detect very small <i>drosophila melanogaster</i> eggs, expediating the current manual process of egg-counting in research labs. I also developed an interface to have producing bounding-boxed training data for computer vision models (pretraining or from scratch) faster by 10x, rivaling current practices such as using Roboflow.</p>
              <p>I am interested in joining research labs and internships in computational physics or pure machine learning.</p>
              <p>In case you haven't noticed, I absolutely love music. At the moment, I recommend you to listen to "Reminiscing" by Little River Band.</p>
            </div>
          </div>
        </div>
      </div>
      <PopularTracks tracks={artist.tracks} />
      <div style={{ padding: "24px 32px" }}>
        <h2 style={{ color: "#fff", fontSize: 28, marginBottom: 16 }}>Artist Pick</h2>
        <ArtistPick pick={artistPick} />
      </div>
      <div style={{ padding: "24px 32px" }}>
        <Discography albums={albums} name="Discography" />
      </div>
      <div style={{ padding: "24px 32px" }}>
        <FtIn albums={features}/>
      </div>
      <Footer></Footer>
    </>
  );
}


function App() {
  const SIDEBAR_WIDTH = 260; // Adjust as needed

  return (
    <div style={{ background: "#181818", minHeight: "100vh" }}>
      {/* Fixed Sidebar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: SIDEBAR_WIDTH,
          background: "#181818",
          zIndex: 100
        }}
      >
        <Sidebar playlists={artist.playlists} />
      </div>
      {/* Scrollable Main Content */}
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          minHeight: "100vh",
          overflow: "auto",
          background: "#181818"
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