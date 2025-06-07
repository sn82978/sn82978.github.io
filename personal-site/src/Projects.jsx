import React, { useEffect, useState } from 'react';
import "./App.css"


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
        <div className="project">
         <h3 className="project-title">Boiling Bad (Vlog Site)</h3>
         <p className="project-description">
         BOILING BAD is a web application that allows users to view recipes and vlogs made by
         my roommate and I, built using Vite+React+Typescript. The site is designed with a 
         user-friendly interface, making it easy to 
         navigate and find the information you're looking for. The project was made to share
         the funny vlogs my roommate and I make with the world. 
         This project demonstrates skills 
         in web development, API integration, and data presentation.
         </p>
         <img src="Screenshot 2025-03-23 at 10.15.24 PM.png" className="project-image"></img>
         <div className="project-links-container">
          <a href="https://github.com/sn82978/BOILING-BAD" className="project-link">GitHub</a>
          <a href="https://sn82978.github.io/BOILING-BAD/" className="project-link">Deployed Site</a>
          </div>
       </div>
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
           <a href="https://github.com/PatelPurav05/ActsAI" className="project-link">GitHub</a>
           <a href="https://ballot.hackmit.org/project/cbspo-ztize-qaxbl-xmhub" className="project-link">Devpost</a>
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
         <img src="Screenshot 2025-03-23 at 10.49.53 PM.png" className="project-image"></img>
         <a href="https://huggingface.co/snoneeightfive/final-luna-sentiment-analysis" className="project-link">Hugging Face</a>
       </div>
     </div>
   </div>
 );
}

function Projects() {
  return (
    <>
      <div className="app">
        <ProjectsContent />
      </div>
    </>
  );
}


export default Projects;