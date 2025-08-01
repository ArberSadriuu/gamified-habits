import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const handleHomeClick = () => {
    // Scroll to top when Home is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">HabitFlow</span>
        </div>
        <div className="flex items-center space-x-8">
          <NavLink 
            to="/" 
            onClick={handleHomeClick}
            className={({ isActive }) => `text-lg font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
          >
            Home
          </NavLink>
          <a href="#about" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 