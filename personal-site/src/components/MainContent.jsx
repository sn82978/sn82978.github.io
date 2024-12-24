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
         <img src="IMG_0075.JPG" className="shreya-image" alt="Shreya" />
       </section>
     </div>
     <div className="right-column">
       <section className="quick-links">
         <h1 className="typewriter">{text}</h1>
         <p>Hi! I'm Shreya, a computer science major specializing in Intelligent Systems and Systems & Software at UC Irvine with a minor in Mathematics.</p>
         <p>I am passionate about multidisciplinary research, especially how AI tools can be used in fields such as biology or physics.
           My research interests consist of computational astrophysics, computational biology, compilers, and machine learning.
         </p>
         <p>I also love 80's rock, so let me know if you want music recommendations!</p>
       </section>
     </div>
   </main>
 );
}


export default MainContent;



