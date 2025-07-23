import type { Habit } from '../contexts/HabitContext';

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: (habits: Habit[]) => boolean;
};

export const allAchievements: Achievement[] = [
  {
    id: 'first-habit',
    name: 'First Habit',
    description: 'Add your first habit!',
    icon: '🌱',
    isUnlocked: (habits) => habits.length > 0,
  },
  {
    id: 'streak-3',
    name: '3-Day Streak',
    description: 'Complete any habit 3 days in a row.',
    icon: '🔥',
    isUnlocked: (habits) => habits.some(h => h.streak >= 3),
  },
  // Add more achievements as needed
]; 