import { useState } from 'react'
import { Link } from 'react-router-dom';

import './App.css'

import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function ResearchContent() {
    return (
        <>
            <h1>Research</h1>
            <h2>Counting Fruit Fly Eggs with Computer Vision</h2>
            <h2>Constraining Cosmic-Ray Transport with Observational Data</h2>
        </>
    )
}

function Research() {
  return (
    <div className="app">
      <Header />
      <Navigation />
      <ResearchContent />
      <Footer />
    </div>
  );
}

export default Research
