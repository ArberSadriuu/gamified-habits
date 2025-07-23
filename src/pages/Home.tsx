import React, { useState, useEffect } from 'react';
import { useHabits } from '../contexts/HabitContext';
import HabitCard from '../components/HabitCard';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/index.css'; // Ensure custom CSS is loaded

const motivationalQuotes = [
  "Small steps every day lead to big results.",
  "Consistency is the key to success.",
  "Your habits define your future.",
  "Progress, not perfection.",
  "Stay committed to your goals!"
];
const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

const getToday = () => new Date().toISOString().split('T')[0];

const DailyMotivationBanner: React.FC<{ quote: string }> = ({ quote }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const today = getToday();
    const dismissed = localStorage.getItem('motivationBannerDismissed');
    setVisible(dismissed !== today);
  }, []);
  const handleClose = () => {
    localStorage.setItem('motivationBannerDismissed', getToday());
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div className="w-full flex items-center justify-between bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-6 py-3 rounded-xl shadow mb-6 animate-fade-in">
      <span className="font-medium italic">{quote}</span>
      <button onClick={handleClose} className="ml-4 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-white font-bold text-xl">×</button>
    </div>
  );
};

const AnimatedHeader: React.FC = () => (
  <div className="relative w-full flex justify-center items-center h-40 md:h-56 mb-10 overflow-hidden rounded-2xl shadow-xl">
    <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-900 dark:via-indigo-900 dark:to-fuchsia-900 opacity-80 blur-sm" />
    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2 tracking-tight">Welcome to HabitFlow</h1>
      <p className="text-lg md:text-xl text-white/90 italic drop-shadow">“{quote}”</p>
    </div>
  </div>
);

const Avatar: React.FC<{ level: number; label: string }> = ({ level, label }) => {
  // Simple evolving avatar: emoji changes with level
  const avatars = ['😀', '😎', '🦸‍♂️', '🧙‍♂️', '🦄', '🐉'];
  return (
    <div className="flex flex-col items-center mb-6">
      <span className="text-6xl mb-2">{avatars[Math.min(level - 1, avatars.length - 1)]}</span>
      <span className="text-lg font-semibold">{label} {level}</span>
    </div>
  );
};

const categories = [
  'Health',
  'Work',
  'Wellness',
  'Learning',
  'Other',
];

const Home: React.FC = () => {
  const { habits, addHabit, removeHabit, markComplete, getLevel } = useHabits();
  const [newHabit, setNewHabit] = useState('');
  const [category, setCategory] = useState(categories[0]);
  
  const maxLevel = habits.reduce((max, h) => Math.max(max, getLevel(h.points)), 1);
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.trim()) {
      addHabit(newHabit.trim(), category);
      setNewHabit('');
      setCategory(categories[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-8 px-2">
      <DailyMotivationBanner quote={quote} />
      <AnimatedHeader />
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Sidebar / Dashboard */}
        <aside className="md:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8 md:mb-0">
          <Avatar level={maxLevel} label="Highest Level:" />
          <div className="w-full mb-4 text-center">
            <div className="text-gray-900 dark:text-gray-100 font-medium">Total Habits</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{habits.length}</div>
          </div>
          <div className="w-full mb-4">
            <div className="mb-2 text-gray-900 dark:text-gray-100 font-medium">Best Streak</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
              <div className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full transition-all" style={{ width: `${Math.min(bestStreak, 30) * 100 / 30}%` }} />
            </div>
            <div className="text-right text-xs text-gray-500 dark:text-gray-400">{bestStreak} days</div>
          </div>
        </aside>
        {/* Main Habit Tracker Card */}
        <main className="flex-1">
          <form onSubmit={handleAddHabit} className="flex gap-2 mb-8 flex-wrap items-center">
            <input
              type="text"
              value={newHabit}
              onChange={e => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 shadow"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 shadow"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="submit" className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white rounded-full px-6 py-2 shadow-lg font-semibold transition-all focus:ring-2 focus:ring-blue-300">
              Add
            </button>
          </form>
          <div>
            {habits.length === 0 && <p className="text-center text-gray-400 dark:text-gray-500">No habits yet. Add one above!</p>}
            <AnimatePresence>
              {habits.map(habit => (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                >
                  <HabitCard
                    habit={habit}
                    onComplete={() => markComplete(habit.id)}
                    onRemove={() => removeHabit(habit.id)}
                    getLevel={getLevel}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
      {/* How It Works Section */}
      <section className="w-full max-w-3xl mt-12 mb-8 mx-auto">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 text-center">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2 text-lg">
            <li><b>Add Habits:</b> Enter the routines you want to build or track.</li>
            <li><b>Mark as Complete:</b> Each day, check off habits you've accomplished to earn points and build streaks.</li>
            <li><b>Level Up:</b> Gain points for consistency and watch your avatar evolve as you progress.</li>
            <li><b>Unlock Achievements:</b> Hit milestones and celebrate your wins with badges and rewards.</li>
            <li><b>Stay Motivated:</b> Enjoy daily motivational quotes and track your journey in a beautiful, distraction-free interface.</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Home;
