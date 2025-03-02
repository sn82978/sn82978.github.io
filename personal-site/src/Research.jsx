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
           With a multidisciplinary approach, I use computer vision to detect drosophila melanogaster (fruit fly) eggs to automate egg-counting.
           The images of fly eggs contain varied overlaid eggs, causing current computer vision models and methods to develop them have difficulty
           differentiating between one egg and two overlaid eggs. In an attempt to address, I propose a novel approach to increase accuracy
           of CV models to detect small objects when images are of lower quality. Rather than aritificially augmenting the quality using models such as CARN-M,
           I proposed splitting the images into smaller 75x75 tiles. These tiles encapsulated 0-10 eggs. Each one of these counts represents a class that a smaller
           image could be classified into. In training the model on these smaller 75x75 tiles matching up to 0 to 10 egg classes, the model showed considerable improved.
           Additionally, rather than manually annotating, creating a portal to help quickly annotate these by have automatically created "bounding boxes," 
           egg counting time was decreased by 10x. The resulting model with only one set of annotated images has an accuracy of 88%. Below is a sample of the classifier site
           used to annotate/classify the tiles to egg count classes.
         </p>
         <img src="classifier-site-sample.png" alt="Classifier Site Sample" className="project-image"  />
         <p><i>Sample of the UI</i></p>
         <div className="project-links-container">
          <a href="https://github.com/sn82978/Classifier-Site" className="project-link">Classifier Site Github</a>
          <a href="https://github.com/sn82978/CNN-Classifier" className="project-link">CNN Github</a>
         </div>
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
         <img src="mnras-plot.png" alt="cosmic rays plot" className="project-image" />
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