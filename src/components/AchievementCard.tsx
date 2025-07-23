import React from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '../lib/achievements';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, isUnlocked }) => {
  const cardVariants = {
    locked: { filter: 'grayscale(100%)', opacity: 0.6 },
    unlocked: { filter: 'grayscale(0%)', opacity: 1 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial={isUnlocked ? 'unlocked' : 'locked'}
      animate={isUnlocked ? 'unlocked' : 'locked'}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
    >
      <span className="text-6xl mb-4">{achievement.icon}</span>
      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">{achievement.name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
    </motion.div>
  );
};

export default AchievementCard; 