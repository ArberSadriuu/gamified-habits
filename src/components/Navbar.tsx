import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const linkStyles = "px-4 py-2 rounded-md text-lg font-semibold transition-colors";
  const activeLinkStyles = "bg-blue-600 dark:bg-blue-500 text-white";
  const inactiveLinkStyles = "text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800";

  const mobileLinkStyles = "block text-3xl font-bold py-4 text-center";

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                HabitFlow
              </NavLink>
              <div className="hidden md:flex items-center space-x-2">
                <NavLink to="/" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
                  Home
                </NavLink>
                <NavLink to="/achievements" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
                  Achievements
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
                  Reports
                </NavLink>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block"><ThemeToggle /></div>
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-gray-900 dark:text-gray-100">
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-20 md:hidden"
          >
            <div className="flex justify-end p-4 pt-7">
                <button onClick={toggleMobileMenu} className="text-gray-900 dark:text-gray-100">
                    <CloseIcon />
                </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full -mt-20 gap-8">
              <NavLink to="/" onClick={toggleMobileMenu} className={({ isActive }) => `${mobileLinkStyles} ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                Home
              </NavLink>
              <NavLink to="/achievements" onClick={toggleMobileMenu} className={({ isActive }) => `${mobileLinkStyles} ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                Achievements
              </NavLink>
              <NavLink to="/reports" onClick={toggleMobileMenu} className={({ isActive }) => `${mobileLinkStyles} ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                Reports
              </NavLink>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 