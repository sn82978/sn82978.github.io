import React, { useState } from "react";

const artist = {
  name: "Shreya Nakum",
  image: "IMG_2562.jpeg",
  verified: true,
};

export default function ArtistHeader() {
  const [followers, setFollowers] = useState(737);

  const [isFollowing, setIsFollowing] = useState(false);

  const handleDotsClick = () => {
    window.open("https://github.com/sn82978/sn82978.github.io", "_blank", "noopener,noreferrer");
  };

  const handleFollowClick = () => {
    if (!isFollowing) {
      setFollowers(followers + 1);
      setIsFollowing(true);
    } else {
      setFollowers(followers - 1);
      setIsFollowing(false);
    }
  };

  const handlePlayClick = () => {
    window.open("https://www.youtube.com/watch?v=U49nqkmsq0w", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 340,
        backgroundImage: `url(${artist.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        padding: "0 40px 32px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Overlay for dark gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(24,24,24,0) 60%, #181818 100%)",
          zIndex: 1,
        }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {artist.verified && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <span
              style={{
                color: "#1db954",
                background: "#222",
                borderRadius: 999,
                fontWeight: "bold",
                fontSize: 14,
                padding: "2px 10px",
                marginRight: 8,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                <circle cx="8" cy="8" r="8" fill="#1db954" />
                <path d="M12 5.5l-4.2 4.2L6 8.9" stroke="#fff" strokeWidth="1.5" fill="none" />
              </svg>
              Verified Programmer
            </span>
          </div>
        )}
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "#fff",
            margin: 0,
            lineHeight: 1,
            letterSpacing: -2,
            textShadow: "0 4px 32px #000a",
          }}
        >
          {artist.name}
        </h1>
        <div style={{ color: "#fff", fontSize: 18, marginTop: 20, fontWeight: 500 }}>
          {followers.toLocaleString()} contributions
        </div>
        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 32, gap: 16 }}>
          <button
            onClick={handlePlayClick}
            style={{
              background: "#1db954",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 56,
              height: 56,
              fontSize: 32,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px #0008",
            }}
          >
            ▶
          </button>
          <button
            onClick={handleFollowClick}
            style={{
              background: isFollowing ? "#222" : "#1db954",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: 999,
              padding: "8px 24px",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            {isFollowing ? "Pushed!" : "Push to main"}
          </button>
          <button
            onClick={handleDotsClick}
            style={{
              background: "transparent",
              color: "#fff",
              border: "none",
              fontSize: 32,
              marginLeft: 8,
              cursor: "pointer",
            }}
          >
            ⋯
          </button>
        </div>
      </div>
    </div>
  );
}
