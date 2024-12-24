import { useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css'

import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';

function App() {
  return (
    <>
      <MatrixBackground />
      <div className="app">
        <Header />
        <Navigation />
        <MainContent />
        <Footer />
      </div>
    </>
  );
}

export default App;