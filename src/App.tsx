import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import { HabitProvider } from './contexts/HabitContext';
import ThemeProvider from './contexts/ThemeContext';
import Home from './pages/Home';
import Achievements from './pages/Achievements';
import Reports from './pages/Reports';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <HabitProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Router>
      </HabitProvider>
    </ThemeProvider>
  );
}

export default App;

/*
// --- COMPLEX APP STRUCTURE TEMPORARILY DISABLED FOR DEBUGGING ---
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import { HabitProvider } from './contexts/HabitContext';
import ThemeProvider from './contexts/ThemeContext';
import Home from './pages/Home';
import Achievements from './pages/Achievements';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <HabitProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </Router>
      </HabitProvider>
    </ThemeProvider>
  );
}
*/

