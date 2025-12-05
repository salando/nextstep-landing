
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Research } from './pages/Research';
import { Contact } from './pages/Contact';
import { Development } from './pages/Development';
import { NavBar } from './components/UI/NavBar';
import { Footer } from './components/Footer/Footer';
import { BootSequence } from './components/Boot/BootSequence';
import { ScrollToTop } from './components/UI/ScrollToTop';
import './styles/tokens.css';
import './App.css';

function App() {
  // Boot animation shows on page reload (state resets)
  // Skipped on internal navigation (React Router preserves state)
  const [booted, setBooted] = useState(false);

  const handleBootComplete = () => {
    setBooted(true);
  };

  return (
    <Router>
      <ScrollToTop />
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      <main className={`app-wrapper ${booted ? 'visible' : ''}`}>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/development" element={<Development />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
