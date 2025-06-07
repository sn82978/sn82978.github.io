// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import ArtistHeader from "./components/ArtistHeader";
import ArtistPick from "./components/ArtistPick";
import Discography from "./components/Discography";
import Projects from "./Projects";
import Research from "./Research";


// Dummy data
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
    "resume",
    "research",
    "projects",
    "CV",
  ],
};


const artistPick = {
  image: "MLFFPic.png",
  postedBy: "Shreya Nakum",
  postedByAvatar: "headshot.jpg",
  title: "ML to Detect Fruit Fly Eggs",
  type: "Research",
  githubUrl: "https://github.com/sn82978/CNN-Classifier" // <-- Add your unique link here
};


const albums = [
  {
    title: "coming soon",
    cover: "https://link-to-tatata.jpg",
    year: "Latest Release",
    type: "Single",
    latest: true,
    githubUrl: "https://github.com/yourusername/repo-tatata"
  },
  // {
  //   title: "UTOPIA",
  //   cover: "https://link-to-utopia.jpg",
  //   year: 2023,
  //   type: "Album",
  //   githubUrl: "https://github.com/yourusername/repo-utopia"
  // },
  // {
  //   title: "ASTROWORLD",
  //   cover: "https://link-to-astroworld.jpg",
  //   year: 2018,
  //   type: "Album",
  //   githubUrl: "https://github.com/yourusername/repo-astroworld"
  // },
  // {
  //   title: "Birds In The Trap Sing McKnight",
  //   cover: "https://link-to-birds.jpg",
  //   year: 2016,
  //   type: "Album",
  //   githubUrl: "https://github.com/yourusername/repo-birdsintrapsing"
  // }
];

// Sidebar component updated to use Link and highlight active page
function Sidebar({ playlists }) {
  const location = useLocation();

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
        <button style={{
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
        <div style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>Pages</div>
        <div style={{ fontSize: 14, marginBottom: 8 }}>Explore</div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              padding: "8px 0",
              background: location.pathname === "/" ? "#282828" : "transparent",
              color: location.pathname === "/" ? "#fff" : "#b3b3b3",
              borderRadius: 4,
              cursor: "pointer"
            }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>home</Link>
          </li>

          {playlists.map((pl) => {
            const lower = pl.toLowerCase();

            if (lower === "resume") {
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
                    href="https://drive.google.com/file/d/12f1we87TBJ78daKGBmC6RHoP3fVy-gO6/view?usp=sharing" // <-- Replace with your actual resume URL
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#b3b3b3", textDecoration: "none" }}
                  >
                    {pl}
                  </a>
                </li>
              );
            }

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


// function Sidebar({ playlists }) {
//   const location = useLocation();
//   return (
//     <aside style={{
//       width: 260,
//       background: "#000",
//       color: "#b3b3b3",
//       height: "100vh",
//       padding: "24px 0",
//       display: "flex",
//       flexDirection: "column",
//       borderRight: "1px solid #222",
//     }}>
//       <div style={{ padding: "0 24px", marginBottom: 24 }}>
//         <button style={{
//           background: "#fff",
//           color: "#000",
//           border: "none",
//           borderRadius: 999,
//           fontWeight: "bold",
//           padding: "8px 24px",
//           marginBottom: 16,
//           cursor: "pointer"
//         }}>Create</button>
//       </div>
//       <div style={{ padding: "0 24px" }}>
//         <div style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>Pages</div>
//         <div style={{ fontSize: 14, marginBottom: 8 }}>Explore</div>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           <li
//             style={{
//               padding: "8px 0",
//               background: location.pathname === "/" ? "#282828" : "transparent",
//               color: location.pathname === "/" ? "#fff" : "#b3b3b3",
//               borderRadius: 4,
//               cursor: "pointer"
//             }}>
//             <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>home</Link>
//           </li>
//           {playlists.map((pl) => (
//             <li
//               key={pl}
//               style={{
//                 padding: "8px 0",
//                 background: location.pathname === `/${pl}` ? "#282828" : "transparent",
//                 color: location.pathname === `/${pl}` ? "#fff" : "#b3b3b3",
//                 borderRadius: 4,
//                 cursor: "pointer"
//               }}>
//               <Link to={`/${pl}`} style={{ color: "inherit", textDecoration: "none" }}>{pl}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }

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
              style={{
                borderTop: "1px solid #282828",
                fontSize: 18,
                cursor: "pointer"
              }}
              onClick={() => handleTrackClick(track.githubUrl)}
              tabIndex={0}
              onKeyPress={e => { if (e.key === "Enter" || e.key === " ") handleTrackClick(track.githubUrl); }}
              title="View on GitHub"
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
function HomePage() {
  return (
    <>
       <div style={{ padding: "2px 32px" }}>
      <ArtistHeader artist={artist} />
      <h2 style={{ color: "#fff", fontSize: 28, marginBottom: 16 }}>About</h2>
      <p>Hi! I'm Shreya, a computer science major specializing in Intelligent Systems and 
        Systems & Software at UC Irvine with a minor in Mathematics. I am passionate about 
        multidisciplinary research, especially how AI tools can be used in fields such as 
        biology or physics.</p>
        <p> My research interests consist of computational astrophysics, 
        computational biology, and machine learning. I have a lot of experience 
        with machine learning and creating models. In the past, I have pruned datasets and 
        finetuned existing models to create custom models for whatever issue I'm facing. Recently,
        I have developed a Computer Vision CNN model to detect very small <i>drosophila 
         melanogaster</i> eggs, expediating the current manual process of egg-counting in research
          labs. I also developed an interface to have producing bounding-boxed training data 
          for computer vision models (pretraining or from scratch) faster by 10x, rivaling 
          current practices such as using Roboflow.</p>
          <p>I am interested in joining research labs and internships in computational physics or
            pure machine learning.
          </p>
          <p>In case you haven't noticed, I absolutely love music. At the moment,
            I recommend you to listen to "UNLIMITED" by NAV FT PLAYBOI CARTI.
            I also produce my own music (a page about that is coming soon) :p
          </p>
      </div>
      <PopularTracks tracks={artist.tracks} />
      <div style={{ padding: "24px 32px" }}>
        <ArtistPick pick={artistPick} />
      </div>
      <div style={{ padding: "24px 32px" }}>
        <Discography albums={albums} />
      </div>
    </>
  );
}

// Main App with Router
function App() {
  return (
      <div style={{
        display: "flex",
        background: "#181818",
        minHeight: "100vh"
      }}>
        <Sidebar playlists={artist.playlists} />
        <main style={{ flex: 1, overflow: "auto", background: "#181818" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/resume" element={<PlaylistPage name="resume" />} />
            <Route path="/CV" element={<PlaylistPage name="CV" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;