import { useHabits } from '../contexts/HabitContext';
import { Line } from 'react-chartjs-2';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// ✅ Funksionet për datat
function getDateArray(days: number): string[] {
  const arr: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    arr.push(d.toISOString().split('T')[0]);
  }
  return arr;
}

function getWeekArray(weeks: number): string[] {
  const arr: string[] = [];
  const now = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - d.getDay() - i * 7 + 1); // Start of week (Monday)
    arr.push(d.toISOString().split('T')[0]);
  }
  return arr;
}

function getMonthArray(months: number): string[] {
  const arr: string[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    arr.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return arr;
}

// ✅ Funksionet për agjregim me tipizim të saktë
function aggregateDaily(habits: any[], days = 30) {
  const dates = getDateArray(days);
  const counts = dates.map(date =>
    habits.reduce((sum, h: any) => sum + (h.history?.filter((d: string) => d === date).length || 0), 0)
  );
  return { labels: dates, data: counts };
}

function aggregateWeekly(habits: any[], weeks = 12) {
  const weeksArr = getWeekArray(weeks);
  const counts = weeksArr.map(weekStart => {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return habits.reduce(
      (sum, h: any) =>
        sum +
        (h.history?.filter((d: string) => {
          const dt = new Date(d);
          return dt >= start && dt <= end;
        }).length || 0),
      0
    );
  });
  return { labels: weeksArr, data: counts };
}

function aggregateMonthly(habits: any[], months = 12) {
  const monthsArr = getMonthArray(months);
  const counts = monthsArr.map(month => {
    return habits.reduce(
      (sum, h: any) =>
        sum + (h.history?.filter((d: string) => d.startsWith(month)).length || 0),
      0
    );
  });
  return { labels: monthsArr, data: counts };
}

// ✅ Komponenti kryesor
const Reports: React.FC = () => {
  const { habits } = useHabits();
  const daily = aggregateDaily(habits);
  const weekly = aggregateWeekly(habits);
  const monthly = aggregateMonthly(habits);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: '#334155' }, grid: { color: '#e5e7eb' } },
      y: { ticks: { color: '#334155' }, grid: { color: '#e5e7eb' } },
    },
  };

  const darkChartOptions = {
    ...chartOptions,
    scales: {
      x: { ticks: { color: '#e5e7eb' }, grid: { color: '#334155' } },
      y: { ticks: { color: '#e5e7eb' }, grid: { color: '#334155' } },
    },
  };

  const isDark = window.document.documentElement.classList.contains('dark');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center">Reports & Progress</h1>
        <div className="grid gap-10">
          {/* Daily */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Daily Completions (Last 30 Days)</h2>
            <Line
              data={{
                labels: daily.labels,
                datasets: [
                  {
                    label: 'Completions',
                    data: daily.data,
                    borderColor: isDark ? '#60a5fa' : '#2563eb',
                    backgroundColor: isDark ? 'rgba(96,165,250,0.2)' : 'rgba(37,99,235,0.2)',
                    tension: 0.3,
                  },
                ],
              }}
              options={isDark ? darkChartOptions : chartOptions}
            />
          </div>

          {/* Weekly */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Weekly Completions (Last 12 Weeks)</h2>
            <Line
              data={{
                labels: weekly.labels,
                datasets: [
                  {
                    label: 'Completions',
                    data: weekly.data,
                    borderColor: isDark ? '#60a5fa' : '#2563eb',
                    backgroundColor: isDark ? 'rgba(96,165,250,0.2)' : 'rgba(37,99,235,0.2)',
                    tension: 0.3,
                  },
                ],
              }}
              options={isDark ? darkChartOptions : chartOptions}
            />
          </div>

          {/* Monthly */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Monthly Completions (Last 12 Months)</h2>
            <Line
              data={{
                labels: monthly.labels,
                datasets: [
                  {
                    label: 'Completions',
                    data: monthly.data,
                    borderColor: isDark ? '#60a5fa' : '#2563eb',
                    backgroundColor: isDark ? 'rgba(96,165,250,0.2)' : 'rgba(37,99,235,0.2)',
                    tension: 0.3,
                  },
                ],
              }}
              options={isDark ? darkChartOptions : chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
