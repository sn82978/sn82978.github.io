function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      marginTop: 80,
      padding: "40px 32px",
      borderTop: "1px solid rgba(255,255,255,0.1)"
    }}>
      <div style={{
        background: "rgba(40, 40, 40, 0.8)",
        borderRadius: 12,
        padding: 32,
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center",
        maxWidth: 800,
        margin: "0 auto"
      }}>
        {/* Main content */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 16
          }}>
            Built with passion for music and code
          </div>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
            marginBottom: 20
          }}>
            <a
              href="https://github.com/sn82978/sn82978.github.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1db954",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#1ed760";
                e.target.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#1db954";
                e.target.style.transform = "scale(1)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </a>
            
            <div style={{
              color: "#b3b3b3",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <img 
                src="/vite.svg" 
                alt="Vite" 
                style={{ width: 20, height: 20 }}
              />
              Made with Vite+React
            </div>
            
            <div style={{
              color: "#b3b3b3",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Hosted on GitHub Pages
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
          margin: "24px 0"
        }} />

        {/* Copyright and signature */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            color: "#666",
            fontSize: 12,
            fontStyle: "italic",
            marginBottom: 12
          }}>
            "Without music, life would be a blank to me" - Jane Austen
          </div>
          
          <div style={{
            color: "#b3b3b3",
            fontSize: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 6
          }}>
            <span>&copy; {currentYear}</span>
            <span style={{
              background: "linear-gradient(135deg, #1db954 0%, #1ed760 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600
            }}>
              Shreya Nakum
            </span>
            <span>. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;