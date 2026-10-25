import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Portfolio3D from './components/Portfolio3D';
import SoundEngine from './components/SoundEngine';
import './components/Portfolio3D.css';
import './App.css';

import { DeepOceanProvider, DepthIndicator } from './components/DeepOceanEngine';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <DeepOceanProvider>
      <div className="app-wrapper">
        <Cursor />
        <Background3D />
        <SoundEngine />
        <DepthIndicator />
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        
        {!loading && (
          <main className="main-content">
            <Navbar />
            <Hero />
            <Services />
            <Portfolio3D />
            <About />
            <Process />
            <Contact />
            <Footer />
          </main>
        )}
      </div>
    </DeepOceanProvider>
  );
}

export default App;
