import React, { useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ExportOptions from "./ExportOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ApplicantStatusChart = ({ data }) => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showExportOptions, setShowExportOptions] = useState(false);

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Closed",
        data: data.map((d) => d.closed),
        backgroundColor: "#008080",
      },
      {
        label: "Passed",
        data: data.map((d) => d.passed),
        backgroundColor: "#66b2b2",
      },
      {
        label: "In Progress",
        data: data.map((d) => d.onProgress),
        backgroundColor: "#d9ebeb",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: "right" } },
    scales: { x: { stacked: true }, y: { stacked: true } },
  };

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-md font-semibold">Requisition Stats</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="rounded bg-teal-600 px-3 py-1 text-sm text-white hover:bg-teal-700"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              Export
            </button>
            {showExportOptions && (
              <div className="absolute left-0 z-10 mt-1 w-40 rounded border bg-white shadow-lg">
                <ExportOptions
                  data={data}
                  onExportComplete={() => setShowExportOptions(false)}
                />
              </div>
            )}
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded border p-1 text-sm"
          >
            <option value="all">All Roles</option>
            <option value="finance">Finance</option>
            <option value="engineering">Engineering</option>
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded border p-1 text-sm"
          >
            <option value="month">By Month</option>
            <option value="year">By Year</option>
          </select>
        </div>
      </div>
      <div className="h-64 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default ApplicantStatusChart;
