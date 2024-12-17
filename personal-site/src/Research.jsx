import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function Research() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/research">research</Link></li>
                </ul>
            </nav>
            <h1>Research</h1>
            <h2>Counting Fruit Fly Eggs with Computer Vision</h2>
            <h2>Constraining Cosmic-Ray Transport with Observational Data</h2>
        </>
    )
}

export default Research
