import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import api from "../../api/axios";

ChartJS.register(ArcElement, Tooltip);

const SourceOfApplication = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/analytic/graphs/source");
        setData(response.data.source);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((entry) => entry.source),
    datasets: [
      {
        data: data.map((entry) => entry.value),
        backgroundColor: ["#008080", "#66b2b2", "#d9ebeb", "#ffcccb", "#c0c0c0"],
        hoverBackgroundColor: ["#007777", "#5daaaa", "#cce5e5", "#ff9999", "#a9a9a9"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (acc, val) => acc + val,
              0,
            );
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}% (${value})`;
          },
        },
      },
    },
  };

  return (
    <>
      <h3 className="mb-4 text-center text-sm text-gray-600">
        Source of Application
      </h3>

      <div className="mx-auto w-1/2">
        <Pie data={chartData} options={options} />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: chartData.datasets[0].backgroundColor[index],
              }}
            />
            <span className="text-sm text-gray-700">{entry.source}</span>
            <span className="ml-auto text-sm font-medium">{entry.value}%</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SourceOfApplication;