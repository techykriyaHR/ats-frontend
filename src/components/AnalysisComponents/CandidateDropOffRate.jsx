import React from "react";
import PropTypes from "prop-types";

const CandidateDropOffRate = ({ overallRate, monthlyRates }) => {
  return (
    <>
      <h3 className="mb-4 text-center text-sm text-gray-600">
        Candidate Drop-Off Rate
      </h3>
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
