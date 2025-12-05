
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Research } from './pages/Research';
import { Contact } from './pages/Contact';
import { Development } from './pages/Development';
import { Physical } from './pages/Physical';
import { FAQ } from './pages/FAQ';
import { NavBar } from './components/UI/NavBar';
import { Footer } from './components/Footer/Footer';
import { BootSequence } from './components/Boot/BootSequence';
import { GlobalLogo } from './components/UI/GlobalLogo';
import { ScrollToTop } from './components/UI/ScrollToTop';
import './styles/tokens.css';
import './App.css';

function App() {
  // Boot State Machine: 'loading' -> 'flying' -> 'cleanup' -> 'complete'
  const [bootState, setBootState] = useState<'loading' | 'flying' | 'cleanup' | 'complete'>('loading');

  const handleBootLinesComplete = () => {
    setBootState('flying');
  };

  const handleLogoAnimationComplete = () => {
    setBootState('cleanup');
  };

  // Clean up boot sequence after it fades out
  useEffect(() => {
    if (bootState === 'cleanup') {
      const timer = setTimeout(() => {
        setBootState('complete');
      }, 1000); // Match fade-out duration
      return () => clearTimeout(timer);
    }
  }, [bootState]);

  return (
    <Router>
      <ScrollToTop />
      {bootState !== 'complete' && (
        <BootSequence
          onComplete={handleBootLinesComplete}
          shouldFadeOut={bootState === 'flying' || bootState === 'cleanup'}
        />
      )}

      <GlobalLogo
        booted={bootState === 'flying' || bootState === 'cleanup' || bootState === 'complete'}
        onAnimationComplete={handleLogoAnimationComplete}
      />

      {/* Main app is visible behind the overlay, but overlay covers it until cleanup */}
      <main className={`app-wrapper ${bootState !== 'loading' ? 'visible' : ''}`}>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/development" element={<Development />} />
          <Route path="/physical" element={<Physical />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
