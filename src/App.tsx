import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import { HabitProvider } from './contexts/HabitContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <HabitProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </HabitProvider>
  );
}

export default App;

