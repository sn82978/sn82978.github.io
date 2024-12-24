import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-heading">Social</h3>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/shreya-nakum-sn185/" target="_blank" rel="noopener noreferrer">
            <img src="link.png" alt="linkedin icon" className="footer-icon" />
          </a>
          <a href="https://github.com/sn82978" target="_blank" rel="noopener noreferrer">
            <img src="github.png" alt="github icon" className="footer-icon" />
          </a>
          <a href="https://www.instagram.com/shreyanakum185/" target="_blank" rel="noopener noreferrer">
            <img src="instagram.png" alt="instagram icon" className="footer-icon" />
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h3 className="footer-heading">Website Info</h3>
        <p className="footer-text">
          <a href="https://github.com/sn82978/sn82978.github.io" target="_blank" rel="noopener noreferrer">
            Source Code
          </a>
        </p>
        <p className="footer-text">Made with Vite+React, hosted on GitHub Pages</p>
        <p className="footer-text">&copy; {currentYear} Shreya Nakum. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
