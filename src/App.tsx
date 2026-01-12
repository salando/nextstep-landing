
import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/UI/NavBar';
import { Footer } from './components/Footer/Footer';
import { BootSequence } from './components/Boot/BootSequence';
import { GlobalLogo } from './components/UI/GlobalLogo';
import { ScrollToTop } from './components/UI/ScrollToTop';
import './styles/tokens.css';
import './styles/animations.css';
import './App.css';

// Lazy load pages
// We need to use inline imports for Vite/Rollup to correctly bundle the chunks
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Research = lazy(() => import('./pages/Research').then(module => ({ default: module.Research })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Development = lazy(() => import('./pages/Development').then(module => ({ default: module.Development })));
const Physical = lazy(() => import('./pages/Physical').then(module => ({ default: module.Physical })));
const FAQ = lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

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
        shouldHide={bootState === 'cleanup' || bootState === 'complete'}
      />

      {/* Main app is visible behind the overlay, but overlay covers it until cleanup */}
      <main className={`app-wrapper ${bootState !== 'loading' ? 'visible' : ''}`}>
        <NavBar showLogo={bootState === 'cleanup' || bootState === 'complete'} />

        <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/development" element={<Development />} />
            <Route path="/physical" element={<Physical />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
