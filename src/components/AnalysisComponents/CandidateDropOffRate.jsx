import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const CandidateDropOffRate = ({ overallRate, monthlyRates }) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
            <span className="absolute mt-5 w-48 p-2 body-tiny text-teal bg-teal-soft rounded shadow-lg text-justify">
              This shows the percentage of candidates who start but do not complete the application or interview process.
            </span>}
        </div>
      </div>
      <div className="mb-6 text-center text-4xl font-semibold">
        {overallRate}%
      </div>
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
              <span className="font-medium">{rate}%</span>
            </div>
          ))}
      </div>
    </>
  );
};

CandidateDropOffRate.propTypes = {
  overallRate: PropTypes.number.isRequired,
  monthlyRates: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default CandidateDropOffRate;
