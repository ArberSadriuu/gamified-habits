import React from 'react';
import { motion } from 'framer-motion';
import { useHabits } from '../contexts/HabitContext';
import AchievementCard from '../components/AchievementCard';

const Achievements: React.FC = () => {
  const { allAchievements, unlockedAchievements } = useHabits();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow p-6 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">About This App</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              HabitFlow is a gamified habit tracker designed to help you build positive routines, stay motivated, and celebrate your progress. Track your daily habits, earn points, unlock achievements, and watch your streaks grow—all in a beautiful, distraction-free interface.
            </p>
          </div>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">Your Achievements</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            You've unlocked <span className='text-blue-600 dark:text-blue-400'>{unlockedAchievements.length}</span> of <span className='text-blue-600 dark:text-blue-400'>{allAchievements.length}</span> badges. Keep it up!
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {allAchievements.map(ach => (
            <motion.div key={ach.id} variants={itemVariants}>
              <AchievementCard
                achievement={ach}
                isUnlocked={unlockedAchievements.includes(ach.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements; 