// App.js
import React from "react";
import ArtistHeader from "./components/ArtistHeader";

// Dummy data
const artist = {
  tracks: [
    {
      title: "FE!N (feat. Playboi Carti)",
      plays: "1,305,571,106",
      duration: "3:11",
      explicit: true,
    },
    {
      title: "goosebumps",
      plays: "2,837,475,467",
      duration: "4:03",
      explicit: true,
    },
    {
      title: "Open Arms (feat. Travis Scott)",
      plays: "770,299,977",
      duration: "3:59",
      explicit: false,
    },
    {
      title: "Type Shit",
      plays: "564,191,661",
      duration: "3:48",
      explicit: false,
    },
  ],
  playlists: [
    "current faves",
    "daylist - introspective floaty wednesday morning",
    "PISMO BEACH",
    "House Mix",
    "i dont dance",
    "This Is Azealia Banks",
    "College",
    "MF DOOM",
  ],
};

function Sidebar({ playlists }) {
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
        <div style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>Your Library</div>
        <div style={{ fontSize: 14, marginBottom: 8 }}>Playlists</div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {playlists.map((pl, i) => (
            <li key={pl} style={{
              padding: "8px 0",
              background: pl === "Travis Scott" ? "#282828" : "transparent",
              color: pl === "Travis Scott" ? "#fff" : "#b3b3b3",
              borderRadius: 4,
              cursor: "pointer"
            }}>{pl}</li>
          ))}
          <li style={{
            padding: "8px 0",
            background: "#282828",
            color: "#fff",
            borderRadius: 4,
            cursor: "pointer"
          }}>Travis Scott</li>
        </ul>
      </div>
    </aside>
  );
}

function PopularTracks({ tracks }) {
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
            <tr key={track.title} style={{ borderTop: "1px solid #282828", fontSize: 18 }}>
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

function App() {
  return (
    <div style={{
      display: "flex",
      background: "#181818",
      minHeight: "100vh"
    }}>
      <Sidebar playlists={artist.playlists} />
      <main style={{ flex: 1, overflow: "auto", background: "#181818" }}>
        <ArtistHeader artist={artist} />
        <PopularTracks tracks={artist.tracks} />
      </main>
    </div>
  );
}

export default App;



// import { useState } from 'react'
// import { Link } from 'react-router-dom';
// import './App.css'

// import Header from './components/Header';
// import Navigation from './components/Navigation';
// import MainContent from './components/MainContent';
// import Footer from './components/Footer';
// import MatrixBackground from './components/MatrixBackground';

// function App() {
//   return (
//     <>
//       <MatrixBackground />
//       <div className="app">
//         <Header />
//         <Navigation />
//         <MainContent />
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default App;