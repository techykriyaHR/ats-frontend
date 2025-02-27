import React, { useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ExportOptions from './ExportOptions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApplicantStatusChart = ({ data }) => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      { label: 'Closed', data: data.map(d => d.closed), backgroundColor: '#008080' },
      { label: 'Passed', data: data.map(d => d.passed), backgroundColor: '#66b2b2' },
      { label: 'In Progress', data: data.map(d => d.onProgress), backgroundColor: '#d9ebeb' },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'right' } },
    scales: { x: { stacked: true }, y: { stacked: true } },
  };

  return (
    <>
    
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-md font-semibold">Requisition Stats</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <button
                className="px-3 py-1 text-sm bg-teal-600 text-white rounded hover:bg-teal-700"
                onClick={() => setShowExportOptions(!showExportOptions)}
              >
                Export
              </button>
              {showExportOptions && (
                <div className="absolute left-0 mt-1 bg-white shadow-lg border rounded w-40 z-10">
                  <ExportOptions data={data} onExportComplete={() => setShowExportOptions(false)} />
                </div>
              )}
            </div>

            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="border p-1 text-sm rounded">
              <option value="all">All Roles</option>
              <option value="finance">Finance</option>
              <option value="engineering">Engineering</option>
            </select>
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="border p-1 text-sm rounded">
              <option value="month">By Month</option>
              <option value="year">By Year</option>
            </select>
          </div>
        </div>
        <div className="w-full h-64">
          <Bar data={chartData} options={options} />
        </div>

    </>

  );
};

export default ApplicantStatusChart;
  