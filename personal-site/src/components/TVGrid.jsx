import React, { useState, useEffect } from 'react';
import './TVGrid.css';

const TVGrid = ({ images }) => {
  const [flickeringTVs, setFlickeringTVs] = useState([]);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      const randomIndexes = Array.from({ length: 3 }, () => Math.floor(Math.random() * images.length));
      setFlickeringTVs(randomIndexes);
    }, 2000);

    return () => clearInterval(flickerInterval);
  }, [images.length]);

  return (
    <div className="tv-grid">
      {images.map((image, index) => (
        <div key={index} className={`tv ${flickeringTVs.includes(index) ? 'flicker' : ''}`}>
          <img src={image} alt={`TV ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default TVGrid;
