import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import api from "../../api/axios";

const CandidateDropOffRate = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overallRate, setOverallRate] = useState(0);
  const [monthlyRates, setMonthlyRates] = useState({});

  useEffect(() => {
    const fetchDropOffData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/analytic/metrics");
        
        if (response.data && response.data.dropOffRate) {
          const { overallDropOffRate, monthlyDropOffs } = response.data.dropOffRate;
          
          // Set overall rate
          setOverallRate(parseFloat(overallDropOffRate));
          
          // Transform monthly data into expected format
          const formattedMonthlyRates = {};
          monthlyDropOffs.forEach(item => {
            const [year, month] = item.month.split('-');
            const date = new Date(year, month - 1);
            const monthName = date.toLocaleString('default', { month: 'long' });
            
            formattedMonthlyRates[monthName] = parseFloat(item.dropOffRate);
          });
          
          setMonthlyRates(formattedMonthlyRates);
        }
      } catch (err) {
        console.error("Error fetching drop-off rate data:", err);
        setError("Failed to load drop-off rate data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDropOffData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="">Drop-Off Rate</h3>
        <div className="relative flex-col flex items-end gap-1">
          <FaInfoCircle
            className="cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip &&
            <span className="absolute mt-5 w-48 p-2 body-tiny text-teal bg-teal-soft rounded shadow-lg text-justify z-10">
              This shows the percentage of candidates who start but do not complete the application or interview process.
            </span>}
        </div>
      </div>
      
      {isLoading ? (
        <div className="py-8 text-center text-gray-500">Loading data...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-6 text-center text-4xl font-semibold">
            {overallRate}
          </div>
          {Object.keys(monthlyRates).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(monthlyRates)
                .sort((a, b) => {
                  // Sort months in reverse chronological order
                  const months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                  return months.indexOf(b[0]) - months.indexOf(a[0]);
                })
                .map(([month, rate]) => (
                  <div key={month} className="flex justify-between">
                    <span className="font-medium">{month}</span>
                    <span className="font-medium">{rate}</span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No monthly data available</div>
          )}
        </>
      )}
    </>
  );
};

export default CandidateDropOffRate;