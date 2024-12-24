import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';


function ProjectsContent() {
 const [text, setText] = useState('');
 const fullText = 'projects';


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
        {/* <div className="project">
         <h3 className="project-title">Aristocrat Model</h3>
         <p className="project-description">
           [description incoming]
         </p>
         <a href="https://github.com/sn82978/Aristocrat-Model" className="project-link">GitHub</a>
       </div> */}
        <div className="project">
         <h3 className="project-title">HackMIT: ActsAI</h3>
         <p className="project-description">
           Acts.ai is a mental health platform that integrates AI technology to provide immediate, personalized psychological support and connect users 
           with the most suitable therapists based on their specific needs. It features an AI-powered chatbot for instant assistance, an intelligent matching 
           system for optimal therapist pairing, proactive wellness checks via SMS, and a library of mental health resources. The platform prioritizes safety 
           by detecting signs of self-harm or dangerous behavior and activating emergency protocols when necessary. Acts.ai combines AI's speed and 
           accessibility with human expertise to offer continuous, comprehensive mental health care.
           The platform is built using a cutting-edge tech stack: Convex as the full-stack solution, Modal for hosting the AI chatbot, 
           TuneHQ for fine-tuning, and Clerk for secure user authentication. Python libraries support features like SMS wellness checks and the 
           therapist-matching algorithm, ensuring a secure, scalable, and functional system.
         </p>
         <div className="project-links-container">
           <a href="https://github.com/PatelPurav05/ActsAI" className="project-link">Github</a>
           <a href="https://ballot.hackmit.org/project/cbspo-ztize-qaxbl-xmhub" className="project-link">DevPost</a>
         </div>
       </div>
       <div className="project">
         <h3 className="project-title">Sentiment Analysis for Financial News</h3>
         <p className="project-description">
           I used scraped Twitter financial data to finetune an existing BERT classification model that produces the sentiment of tweets so that it is 
           specific to financial headlines. The Twitter data consisted of financial headlines and comments to the headlines. Based on the sentiment of the
           Twitter comments and pruning out irrelevant comments (like bot comments), I came up with the sentiment of the financial headlines. 
           Through this, I created the model's training/testing/validation set. I finetuned the BERT model and then proceeded to test it, coming up with an
           accuracy of 80%. The model has around 6k downloads.
         </p>
         <a href="https://huggingface.co/snoneeightfive/final-luna-sentiment-analysis" className="project-link">HuggingFace</a>
       </div>
     </div>
   </div>
 );
}

function Projects() {
  return (
    <>
      <MatrixBackground />
      <div className="app">
        <Header />
        <Navigation />
        <ProjectsContent />
        <Footer />
      </div>
    </>
  );
}


export default Projects;