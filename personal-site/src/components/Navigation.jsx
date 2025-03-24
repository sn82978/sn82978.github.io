import React from 'react';
import { Link } from 'react-router-dom'


function Navigation() {
 return (
   <nav className="navigation">
     <ul>
       <li><Link to="/">home</Link></li>
       <li><Link to="/research">research</Link></li>
       <li><Link to="/projects">projects</Link></li>
       <li><a href="https://drive.google.com/file/d/18Q8WNwC_vFKxLsTCQFOm11L_ODkL4HEl/view?usp=sharing" target="_blank" rel="noopener noreferrer">resume</a></li>
       <li><Link to="/personal">personal</Link></li>
     </ul>
   </nav>
 );
}


export default Navigation;



