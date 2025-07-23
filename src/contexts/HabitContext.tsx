import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { allAchievements, type Achievement } from '../lib/achievements';

export type Habit = {
  id: string;
  name: string;
  category: string;
  streak: number;
  points: number;
  lastCompleted: string | null;
  history: string[];
};

export type HabitContextType = {
  habits: Habit[];
  addHabit: (name: string, category?: string) => void;
  removeHabit: (id: string) => void;
  markComplete: (id: string) => void;
  getLevel: (points: number) => number;
  unlockedAchievements: string[];
  allAchievements: Achievement[];
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage<string[]>('unlockedAchievements', []);

  const checkAchievements = (updatedHabits: Habit[]) => {
    const newUnlocks = allAchievements
      .filter((ach: Achievement) => !unlockedAchievements.includes(ach.id))
      .filter((ach: Achievement) => ach.isUnlocked(updatedHabits))
      .map((ach: Achievement) => ach.id);

    if (newUnlocks.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocks]);
      // Here you could trigger a notification for new unlocks
    }
  };

  useEffect(() => {
    checkAchievements(habits);
  }, [habits]);

  const addHabit = (name: string, category: string = 'General') => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      category,
      streak: 0,
      points: 0,
      lastCompleted: null,
      history: [],
    };
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
  };

  const removeHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const markComplete = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toISOString().split('T')[0];
        let newStreak = habit.streak;
        let newHistory = habit.history || [];
        if (habit.lastCompleted !== today) {
          // If last completed was yesterday, increment streak, else reset
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          newStreak = habit.lastCompleted === yesterday ? habit.streak + 1 : 1;
          // Add today to history if not already present
          if (!newHistory.includes(today)) {
            newHistory = [...newHistory, today];
          }
        }
        return {
          ...habit,
          streak: newStreak,
          points: habit.points + 10, // 10 points per completion
          lastCompleted: today,
          history: newHistory,
        };
      }
      return habit;
    }));
  };

  const getLevel = (points: number) => {
    return Math.floor(points / 100) + 1; // 100 points per level
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, removeHabit, markComplete, getLevel, unlockedAchievements, allAchievements }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabits must be used within a HabitProvider');
  return context;
}; 