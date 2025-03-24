import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Research from './Research'
import Projects from './Projects'
import Personal from './Personal'


createRoot(document.getElementById('root')).render(
 <StrictMode>
   <Router>
     <Routes>
       <Route path="/" element={<App />} />
       <Route path="/research" element={<Research />} />
       <Route path="/projects" element={<Projects />} />
       <Route path="/personal" element={<Personal />} />
     </Routes>
   </Router>
 </StrictMode>
)