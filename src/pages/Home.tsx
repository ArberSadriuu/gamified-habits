import React, { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import '../styles/index.css';

const HeroSection: React.FC = () => (
  <section className="w-full bg-white border-b border-gray-100 py-16 mb-10">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Your Professional Habit Tracker</h1>
      <p className="text-xl text-gray-600 mb-8">Organize, track, and archive your habits with a clean, modern interface. Stay motivated and productive every day.</p>
      <a href="#habits" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 text-lg shadow transition">Get Started Now</a>
    </div>
  </section>
);

const AboutSection: React.FC = () => (
  <section id="about" className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">About HabitFlow</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A modern, professional habit tracking platform designed to help you build lasting positive habits through intuitive design and powerful features.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Organization</h3>
          <p className="text-gray-600 leading-relaxed">
            Effortlessly categorize and manage your habits with our intuitive category system. Keep your routines organized and easily accessible.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
          <p className="text-gray-600 leading-relaxed">
            Monitor your habit development with detailed history logs. Track your journey from creation to completion with comprehensive analytics.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">🔄</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Management</h3>
          <p className="text-gray-600 leading-relaxed">
            Archive habits for later, restore when needed, or permanently delete. Full control over your habit lifecycle with simple, powerful tools.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const categories = [
  'Health',
  'Work',
  'Wellness',
  'Learning',
  'Other',
];

// HistoryEntry type for the history log
interface HistoryEntry {
  id: string;
  name: string;
  category: string;
  date: string;
  deleted: boolean;
}

const Home: React.FC = () => {
  const { habits, addHabit, removeHabit, archiveHabit, restoreHabit } = useHabits();
  const [newHabit, setNewHabit] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [historyLog, setHistoryLog] = useState<HistoryEntry[]>([]);
  const [showDeletedOnly, setShowDeletedOnly] = useState(false);

  // Active habits: not archived
  const activeHabits = habits.filter(h => !h.archived);
  // Archived habits
  const archivedHabits = habits.filter(h => h.archived);

  // When a new habit is created, add it to both Active Habits and History
  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.trim()) {
      addHabit(newHabit.trim(), category);
      setHistoryLog([
        { id: Date.now().toString(), name: newHabit.trim(), category, date: new Date().toLocaleDateString(), deleted: false },
        ...historyLog,
      ]);
      setNewHabit('');
      setCategory(categories[0]);
    }
  };

  // When a habit is deleted from Active, add to history log
  const handleDeleteHabit = (habit: { id: string; name: string; category: string }) => {
    setHistoryLog([
      { id: habit.id, name: habit.name, category: habit.category, date: new Date().toLocaleDateString(), deleted: true },
      ...historyLog,
    ]);
    removeHabit(habit.id);
  };

  // Remove from history log only (don't affect habits array)
  const handleClearHistory = (id: string) => {
    setHistoryLog(historyLog.filter(entry => entry.id !== id));
  };

  // Restore from history log
  const handleRestoreHistory = (entry: HistoryEntry) => {
    addHabit(entry.name, entry.category);
    setHistoryLog(historyLog.filter(e => e.id !== entry.id));
  };

  // Separate deleted habits from history
  const deletedHabits = historyLog.filter(entry => entry.deleted);

  // Toggle between showing all history or only deleted items
  const toggleDeletedView = () => {
    setShowDeletedOnly(!showDeletedOnly);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <HeroSection />
      <main className="w-full max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* Active Habits Card */}
        <section id="habits" className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Active Habits</h2>
          <form onSubmit={handleAddHabit} className="flex gap-2 mb-6 flex-wrap items-center">
            <input
              type="text"
              value={newHabit}
              onChange={e => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              className="flex-1 border border-gray-200 bg-white text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 shadow-sm"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border border-gray-200 bg-white text-gray-700 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 shadow-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-2 shadow-sm transition">Add</button>
          </form>
          {activeHabits.length === 0 && <p className="text-center text-gray-500">No active habits. Add one above!</p>}
          <div className="space-y-3">
            {activeHabits.map(habit => (
              <div key={habit.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="flex flex-col">
                  <div className="mb-3">
                    <div className="text-lg font-semibold text-gray-700 break-words">{habit.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{habit.category}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => archiveHabit(habit.id)} className="px-4 py-1 rounded border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition">Archive</button>
                    <button onClick={() => handleDeleteHabit(habit)} className="px-4 py-1 rounded border border-red-200 text-red-600 font-medium hover:bg-red-50 transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History Card */}
        <section className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-700">History</h2>
            <button 
              onClick={toggleDeletedView}
              className={`p-2 rounded-lg transition-colors ${showDeletedOnly ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              title={showDeletedOnly ? "Show all history" : "Show deleted items only"}
            >
              🗑️
            </button>
          </div>
          
          {showDeletedOnly ? (
            /* Deleted Items Only View */
            <div>
              <h3 className="text-lg font-semibold text-gray-600 mb-3">Deleted Habits</h3>
              <div className="space-y-3">
                {deletedHabits.length === 0 && <p className="text-center text-gray-400 text-sm">No deleted habits.</p>}
                {deletedHabits.map(entry => (
                  <div key={entry.id} className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <div className="flex flex-col">
                      <div className="mb-3">
                        <div className="text-lg font-semibold text-gray-700 break-words">{entry.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{entry.category}</div>
                        <div className="text-xs text-red-500 mt-1">Deleted on: {entry.date}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleRestoreHistory(entry)} className="px-4 py-1 rounded border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition">Restore</button>
                        <button onClick={() => handleClearHistory(entry.id)} className="px-4 py-1 rounded border border-red-200 text-red-600 font-medium hover:bg-red-50 transition">Clear History</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Regular History View */
            <div className="space-y-3">
              {historyLog.length === 0 && <p className="text-center text-gray-400">No history items yet.</p>}
              {historyLog.map(entry => (
                <div key={entry.id} className={`border rounded-xl p-4 ${entry.deleted ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex flex-col">
                    <div className="mb-3">
                      <div className="text-lg font-semibold text-gray-700 break-words">{entry.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{entry.category}</div>
                      <div className={`text-xs mt-1 ${entry.deleted ? 'text-red-500' : 'text-gray-400'}`}>
                        {entry.deleted ? `Deleted on: ${entry.date}` : `Created on: ${entry.date}`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleRestoreHistory(entry)} className="px-4 py-1 rounded border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition">Restore</button>
                      <button onClick={() => handleClearHistory(entry.id)} className="px-4 py-1 rounded border border-red-200 text-red-600 font-medium hover:bg-red-50 transition">
                        {entry.deleted ? 'Clear History' : 'Clear'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Archived Habits Card */}
        <section className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Archived Habits</h2>
          {archivedHabits.length === 0 && <p className="text-center text-gray-400">No archived habits.</p>}
          <div className="space-y-3">
            {archivedHabits.map(habit => (
              <div key={habit.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="flex flex-col">
                  <div className="mb-3">
                    <div className="text-lg font-semibold text-gray-700 break-words">{habit.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{habit.category}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => restoreHabit(habit.id)} className="px-4 py-1 rounded border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition">Restore</button>
                    <button onClick={() => removeHabit(habit.id)} className="px-4 py-1 rounded border border-red-200 text-red-600 font-medium hover:bg-red-50 transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <AboutSection />
      <footer className="w-full text-center text-gray-400 py-8 text-sm border-t border-gray-100 mt-8">&copy; {new Date().getFullYear()} HabitFlow. All rights reserved.</footer>
    </div>
  );
};

export default Home;
