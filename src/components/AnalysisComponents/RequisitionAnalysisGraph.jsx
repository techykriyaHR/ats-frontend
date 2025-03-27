import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
import api from "../../api/axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ApplicantStatusChart = () => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [requisitionData, setRequisitionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `/analytic/graphs/requisition`;
        
        // Add query parameters based on selections
        if (selectedPeriod === "month") {
          url += "?month=true";
        } else if (selectedPeriod === "year") {
          url += "?year=true";
        }
        
        // Add position filter if not "all"
        if (selectedRole !== "all") {
          url += (url.includes("?") ? "&" : "?") + `position=${selectedRole}`;
        }
        
        const response = await api.get(url);
        
        // Ensure we have data for all months
        let processedData = response.data.requisition;
        
        // If in month view, ensure all 12 months are present
        if (selectedPeriod === "month") {
          processedData = ensureAllMonthsPresent(processedData);
        }
        
        setRequisitionData(processedData);
        
      } catch (err) {
        console.error("Error fetching requisition data:", err);
        setError("Failed to load requisition data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRole, selectedPeriod]);
  
  // Function to ensure all months are present in the data
  const ensureAllMonthsPresent = (data) => {
    // Month names for reference
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    // Create a map of existing months
    const monthMap = {};
    data.forEach(item => {
      if (item.month_num) {
        monthMap[item.month_num] = item;
      } else {
        // Try to extract month number from label if it's a format like "January 2025"
        const monthName = item.label.split(' ')[0];
        const monthNum = monthNames.indexOf(monthName) + 1;
        if (monthNum > 0) {
          monthMap[monthNum] = item;
        }
      }
    });
    
    // Fill in missing months
    const year = new Date().getFullYear();
    const result = [];
    
    for (let i = 1; i <= 12; i++) {
      if (monthMap[i]) {
        result.push(monthMap[i]);
      } else {
        result.push({
          label: `${monthNames[i-1]}${selectedPeriod === "all" ? ` ${year}` : ''}`,
          month_num: i,
          year: selectedPeriod === "all" ? year : null,
          closed: 0,
          passed: 0,
          onProgress: 0
        });
      }
    }
    
    return result;
  };

  const chartData = {
    labels: requisitionData.map((d) => d.label),
    datasets: [
      {
        label: "Closed",
        data: requisitionData.map((d) => d.closed || 0),
        backgroundColor: "#008080",
      },
      {
        label: "Passed",
        data: requisitionData.map((d) => d.passed || 0),
        backgroundColor: "#33A3A3",
      },
      {
        label: "In Progress",
        data: requisitionData.map((d) => d.onProgress || 0),
        backgroundColor: "#66C5C5",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        display: true, 
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: { 
      x: { 
        stacked: true,
        grid: {
          display: false
        }
      }, 
      y: { 
        stacked: true,
        beginAtZero: true, // Ensures the y-axis begins at zero
        grid: {
          color: "rgba(0, 0, 0, 0.05)"
        }
      } 
    },
  };

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-sm text-gray-500">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-sm text-red-500">{error}</div>
      </div>
    );
  }

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
              <div className="absolute right-0 z-10 mt-1 w-40 rounded border bg-white shadow-lg">
                <ExportOptions
                  data={requisitionData}
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
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded border p-1 text-sm"
          >
            <option value="month">By Month</option>
            <option value="year">By Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      
      {/* Show chart even if all values are zero (empty data check is for completely empty response) */}
      {requisitionData.length === 0 ? (
        <div className="flex h-64 w-full items-center justify-center">
          <div className="text-sm text-gray-500">No data available for the selected filters</div>
        </div>
      ) : (
        <div className="h-64 w-full">
          <Bar data={chartData} options={options} />
        </div>
      )}
      
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-md bg-gray-50 p-2">
            <p className="text-xs text-gray-500">Total Closed</p>
            <p className="text-lg font-semibold text-teal-600">
              {requisitionData.reduce((total, item) => total + (item.closed || 0), 0)}
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-2">
            <p className="text-xs text-gray-500">Total Passed</p>
            <p className="text-lg font-semibold text-teal-600">
              {requisitionData.reduce((total, item) => total + (item.passed || 0), 0)}
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-2">
            <p className="text-xs text-gray-500">In Progress</p>
            <p className="text-lg font-semibold text-teal-600">
              {requisitionData.reduce((total, item) => total + (item.onProgress || 0), 0)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantStatusChart;