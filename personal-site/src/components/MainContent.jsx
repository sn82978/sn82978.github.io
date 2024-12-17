// components/MainContent.js
import React from 'react';

function MainContent() {
  return (
    <main className="main-content">
      <div className="left-column">
        <section className="news">
          <img src="src/assets/IMG_0075.JPG" class="shreya-image"></img>
        </section>
      </div>
      <div className="right-column">
        <section className="quick-links">
          <h3>about me</h3>
          <p>just a chill guy</p>
        </section>
      </div>
    </main>
  );
}

export default MainContent;