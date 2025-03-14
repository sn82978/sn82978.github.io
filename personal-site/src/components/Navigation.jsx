import React from 'react';
import { Link } from 'react-router-dom'


function Navigation() {
 return (
   <nav className="navigation">
     <ul>
       <li><Link to="/">home</Link></li>
       <li><Link to="/research">research</Link></li>
       <li><Link to="/projects">projects</Link></li>
       <li><a href="https://drive.google.com/file/d/12f1we87TBJ78daKGBmC6RHoP3fVy-gO6/view?usp=sharing" target="_blank" rel="noopener noreferrer">resume</a></li>
     </ul>
   </nav>
 );
}


export default Navigation;



