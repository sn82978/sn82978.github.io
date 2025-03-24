import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';
import TVGrid from './components/TVGrid';

function PersonalContent() {
    const [text, setText] = useState('');
    const fullText = 'personal';
    const images = [
      'IMG_5924_Original Medium.jpeg',
      'IMG_7451_Original Medium.jpeg',
      'IMG_0336 Medium.jpeg',
      'IMG_0355.JPG',
      'IMG_6628 Medium.jpeg',
      'IMG_0091 Medium.jpeg',
      'IMG_5670_Original Medium.jpeg',
      'IMG_6822_Original Medium.jpeg',
      'IMG_7322_Original Medium.jpeg',
    ];
  
    useEffect(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
  
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div className="research-content">
        <h1 className="typewriter">{text}</h1>
        <div className="content-container">
          <TVGrid images={images} />
          <div className="paragraph">
            <p>Outside of computer science, I do touch grass and feel sunlight. I absolutely adore
                hiking. Whether that be at Ed Levin County Park in my hometown or in the canyons of 
                Arizona's Sedona National Park, it brings me so much joy to make it to the top of a long,
                winding trail. I also love the beach, which is partly why I chose to go to UC Irvine over
                other colleges. I love boogie-boarding and just swimming on the beach, or just hanging
                out with friends in the sand, as I often do at Newport Beach.
            </p>
            <p>A massive part of my personality is also music. I listen to a LOT of music, mainly rap
                and rock. Last year, I had a total of 71,568 minutes (the top 2% of listeners worldwide). I
                am an avid records collector. My latest acquisition is <i>Paint it Black</i>, by the Rolling Stones record.
                At the top, you can see me at the Don Toliver concert at the Crypto.com arena! 
                Alongside music, I enjoy photography. The icon of this website is a photograph of the moon I
                took. You can see me taking a picture of the beach and the picture of the beach side-by-side, as well as
                my picture of the Draper v. Fonseca match from the Indian Wells tournament! Although I don't play the sport,
                I enjoy watching Tennis, especially with my family. We are big into tennis. In fact, while I'm writing this, I'm
                watching the Miami Open's Paul v. Cerúndolo match :)
                Back to my photography, you can see more of it on my <a href = "https://vsco.co/shreyan185/gallery">VSCO</a>!
            </p>
            <p>Two more things about me, I love animals they're so cute, especially dogs. They're so funny.
                You can see me with my friend's puppy at the bottom. ❤️
            </p>

          </div>
        </div>
      </div>
    );
  }
  

function Personal() {
  return (
    <>
      <MatrixBackground />
      <div className="app" style={{ background: 'transparent' }}>
        <Header />
        <Navigation />
        <PersonalContent />
        <Footer />
      </div>
    </>
  );
}

export default Personal;
