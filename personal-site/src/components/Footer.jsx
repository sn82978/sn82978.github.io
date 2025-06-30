function Footer() {
     const currentYear = new Date().getFullYear();

    return (
    <footer className="footer">
        <div className="footer-section">
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