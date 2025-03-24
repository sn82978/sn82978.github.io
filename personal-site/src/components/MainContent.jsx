import React, { useEffect, useState } from 'react';


function MainContent() {
 const [text, setText] = useState('');
 const fullText = 'about me';


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
   <main className="main-content">
     <div className="left-column">
       <section className="news">
         <img src="IMG_3918.jpg" className="shreya-image" alt="Shreya" />
       </section>
     </div>
     <div className="right-column">
       <section className="quick-links">
         <h1 className="typewriter">{text}</h1>
         <p>Hi! I'm Shreya, a computer science major specializing in Intelligent Systems and Systems & Software at UC Irvine with a minor in Mathematics.</p>
         <p>I am passionate about multidisciplinary research, especially how AI tools can be used in fields such as biology or physics.
           My research interests consist of computational astrophysics, computational biology, compilers, and machine learning. 
         </p>
         <p>I have a lot of experience with machine learning and creating models. In the past, I have pruned datasets and finetuned existing models to
          create custom models for whatever issue I'm facing. At the moment, I am creating a Computer Vision CNN model
          to detect very small <i>drosophila melanogaster</i> eggs, expediating the current manual process of egg-counting in research labs. I also developed
          an interface to have producing bounding-boxed training data for computer vision models (pretraining or from scratch) faster by 10x, rivaling current practices such as using Roboflow.
         </p>
         <p>In systems, I am interested in distributed systems research, specifically in concurrency and parallelism and distributed AI. I am currently looking to join research projects
          in this field, please reach out to me if you are looking for undergraduates passionate in the topic to join
          your project!
         </p>
         <p>I also love 80's rock, <i>The Matrix</i> (only the first one), and ciphers! Let me know if you have song recommendations</p>
       </section>
     </div>
   </main>
 );
}


export default MainContent;



