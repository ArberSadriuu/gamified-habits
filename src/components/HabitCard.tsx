import React, { useState } from 'react';
import type { Habit } from '../contexts/HabitContext';

interface HabitCardProps {
  habit: Habit;
  onComplete: () => void;
  onRemove: () => void;
  getLevel: (points: number) => number;
  archived?: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onComplete, onRemove, getLevel, archived }) => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <>
      <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col gap-3 mb-6 transition-transform hover:scale-105 border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{habit.name}</h2>
            <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-semibold w-fit">{habit.category}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowHistory(true)} className="text-blue-600 hover:underline text-sm font-medium">History</button>
            <button onClick={onRemove} className={archived ? "text-red-500 hover:text-red-700 transition text-lg font-semibold" : "text-gray-400 hover:text-blue-500 transition text-lg font-semibold"}>
              {archived ? 'Delete' : 'Archive'}
            </button>
          </div>
        </div>
        <div className="flex gap-8 text-lg items-center mb-2 text-gray-700">
          <span title="Streak" className="flex items-center gap-1">🔥 <b>{habit.streak}</b></span>
          <span title="Points" className="flex items-center gap-1">⭐ <b>{habit.points}</b></span>
          <span title="Level" className="flex items-center gap-1">🏅 <b>{getLevel(habit.points)}</b></span>
        </div>
        <button onClick={onComplete} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition font-semibold text-lg mt-2 self-end">Mark as Complete</button>
      </div>
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in border border-gray-100">
            <button onClick={() => setShowHistory(false)} className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500">×</button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Completion History</h3>
            {habit.history && habit.history.length > 0 ? (
              <ul className="max-h-60 overflow-y-auto text-gray-700">
                {habit.history.map((date, idx) => (
                  <li key={idx} className="py-1 border-b border-gray-100 last:border-0">{date}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No completion history yet.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HabitCard;
