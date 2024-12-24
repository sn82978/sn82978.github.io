import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Research from './Research'


createRoot(document.getElementById('root')).render(
 <StrictMode>
   <Router>
     <Routes>
       <Route path="/" element={<App />} />
       <Route path="/research" element={<Research />} />
     </Routes>
   </Router>
 </StrictMode>
)