import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';


function ResearchContent() {
 const [text, setText] = useState('');
 const fullText = 'research';


 useEffect(() => {
   let index = 0;
   const timer = setInterval(() => {
     if (index < fullText.length) {
       setText(fullText.slice(0, index + 1));
       index++;
     } else {
       clearInterval(timer);
     }
   }, 100); // Adjust typing speed here


   return () => clearInterval(timer);
 }, []);


 return (
   <div className="research-content">
     <h1 className="typewriter">{text}</h1>
     <p></p>
     <div className="project-container">
       <div className="project">
         <h3 className="project-title">Computer Vision to Count <i>Drosophila Melanogaster</i> Eggs</h3>
         <p className="project-description">
           With a multidisciplinary approach, we use computer vision to detect drosophila melanogaster (fruit fly) eggs to automate egg-counting.
           At the moment, my team and I are working on the creating a fully annotated dataset for the model. In this stage, to make annotating faster,
           we made use of out 26 GB of image data by splitting it into smaller 75x75 tiles. I have created a UI that then makes annotation
           easier, by providing a series of options asking the number of eggs in the smaller tile. This way, drawing bounding boxes is eliminated.
         </p>
         <img src="public/classifier-site-sample.png" alt="Classifier Site Sample" width="596.4" height="301.2" />
         <p><i>Sample of the UI</i></p>
         <a href="https://github.com/rose-mueller-labs/Classifier-Site" className="project-link">Github</a>
       </div>
       <div className="project">
         <h3 className="project-title">Constraining Cosmic-Ray Transport with Observational Data</h3>
         <p className="project-description">
         In this project, I wrote programs to create and analyze trends in plots and presenting the research.
         Using modules like numpy and pandas, I convert the Hubble COS-Halos Datasets' content into the variables I needed to calculate
         the effective cosmic ray transport rate. I then plotted the lower limits of the effective transport rate for each galaxy in
         the dataset as well as the errors present. These errors were from the hydrogen column density, circular velocity, and the
         star formation rate estimations.
         </p>
         <p>After the plot was finalized, I created a poster about the research. Writing about the research proved difficult as I had to
         learn to use technical vocabulary in my explanations. That June, I presented at the American Astronomical Society Conference (AAS).
         After the presentation, I began to work on the research paper. I helped write the methods section of the paper, describing the
         plot that displays the final transport rate values for each galaxy in the dataset.</p>
         <img src="public/mnras-plot.png" alt="cosmic rays plot"  width="503.4" height="405" />
         <p><i>Figure 2</i></p>
         <div className="project-links-container">
           <a href="https://github.com/sn82978/Cosmic-Ray-Transport-Plots" className="project-link">Github</a>
           <a href="https://academic.oup.com/mnras/article/521/2/2477/7070735" className="project-link">Paper</a>
           <a href="https://aas240-aas.ipostersessions.com/Default.aspx?s=39-11-68-61-92-B5-5B-4D-65-27-D7-9C-C2-2B-9E-B1#stay" className="project-link">Poster</a>
         </div>
       </div>
     </div>
   </div>
 );
}
// 1678 by 1350
function Research() {
  return (
    <>
      <MatrixBackground />
      <div className="app">
        <Header />
        <Navigation />
        <ResearchContent />
        <Footer />
      </div>
    </>
  );
}


export default Research;