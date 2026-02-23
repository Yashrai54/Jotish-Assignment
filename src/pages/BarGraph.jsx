import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3">
        <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-sm text-blue-600 font-bold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const BarGraph = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || [];

  const top10Salaries = data
    .map((item) => ({
      name: item[0],
      salary: parseFloat(item[5]?.replace(/[^0-9.]/g, "")) || 0
    }))
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 10);

  if (!data.length) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <p className="text-gray-500 text-sm">No data available to display.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Top 10 Salaries</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Salary Distribution</h2>
              <p className="text-xs text-gray-400 mt-0.5">Top 10 highest salaries from dataset</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-full">
              {top10Salaries.length} entries
            </span>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={top10Salaries} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                angle={-35}
                textAnchor="end"
                interval={0}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#eff6ff' }} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '24px' }}
                formatter={() => 'Salary (USD)'}
              />
              <Bar dataKey="salary" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Breakdown</h2>
          <ul className="divide-y divide-gray-100">
            {top10Salaries.map((entry, i) => (
              <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 font-medium">{entry.name}</span>
                </div>
                <span className="text-blue-600 font-semibold">${entry.salary.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default BarGraph;