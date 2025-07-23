import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-16 h-8 rounded-full p-1 flex items-center transition-colors duration-300 ${
        theme === 'light' ? 'bg-indigo-300' : 'bg-gray-700'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
      >
        <span className="text-sm">{theme === 'light' ? '☀️' : '🌙'}</span>
      </motion.div>
    </button>
  );
};

export default ThemeToggle; 