import { useState } from 'react'
import { Link } from 'react-router-dom';

import './App.css'


function App() {

  return (
    <>
      <div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <img src="src/assets/shreya-standing.JPG" className="logo react" alt="Shreya standing" />
        </a>
      </div>
      <h1>Shreya Nakum</h1>
      <div className="card">
        <button>
          <a href="https://drive.google.com/file/d/1W9kQ_K1j7ohh0oqIMQr7FD-4rNuXWpLs/view?usp=sharing">resume</a>
        </button>
        <Link to="/research">
        <button>
          research
        </button>
      </Link>
        <p>
          small description
        </p>
      </div>
      <p className="read-the-docs">
        <a href="https://www.linkedin.com/in/shreya-nakum-sn185/">
          Linkedin
        </a>
      </p>
    </>
  )
}

export default App
