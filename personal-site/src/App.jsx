import { useState } from 'react'
import { Link } from 'react-router-dom';


import './App.css'


import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Footer from './components/Footer';


function App() {
 return (
   <div className="app">
     <Header />
     <Navigation />
     <MainContent />
     <Footer />
   </div>
 );
}


export default App;