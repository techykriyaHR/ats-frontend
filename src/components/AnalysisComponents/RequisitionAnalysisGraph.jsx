import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
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
      {
        label: 'Closed Applications',
        data: data.map(d => d.closed),
        backgroundColor: '#008080',
        borderColor: '#008080',
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: 'Passed Applications',
        data: data.map(d => d.passed),
        backgroundColor: '#66b2b2',
        borderColor: '#66b2b2',
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: 'On Progress Applications',
        data: data.map(d => d.onProgress),
        backgroundColor: '#d9ebeb',
        borderColor: '#d9ebeb',
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="w-full space-y-4 p-4 h-full">
      <div className="flex items-center justify-between relative">
        <h2 className="text-lg font-semibold">Requisition Statistics</h2>
        <div className="flex gap-2">
          <div className="relative">
            <button
              className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              Export Data
            </button>
            {showExportOptions && (
              <ExportOptions data={data} onExportComplete={() => setShowExportOptions(false)} />
            )}
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-[240px]"
          >
            <option value="all">All Roles</option>
            <option value="finance">Finance Operations Associate</option>
            <option value="engineering">Software Engineer</option>
            {/* Add more roles as needed */}
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-[120px]"
          >
            <option value="month">By Month</option>
            <option value="year">By Year</option>
          </select>
        </div>
      </div>
      <div className="relative w-full h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ApplicantStatusChart;