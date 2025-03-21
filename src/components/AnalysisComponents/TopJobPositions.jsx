import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const TopJobPositions = ({
  jobPositions = [
    { title: "Accountant", percentage: 50 },
    { title: "SA Engineer", percentage: 20 },
    { title: "SA Engineer", percentage: 10 },
    { title: "SA Engineer", percentage: 20 },
  ],
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="">Top Applied Jobs</h3>
        <div className="relative flex-col flex items-end gap-1">
          <FaInfoCircle
            className="cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <span className="absolute mt-5 w-48 p-2 body-tiny text-teal bg-teal-soft rounded shadow-lg text-justify">
              This is a breakdown of the most frequently applied job positions by candidates
            </span>
          )}
        </div>
      </div>
      <div className="space-y-4 py-2">
        {jobPositions.map((position, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium">{position.title}</span>
            <span className="font-semibold display">{position.percentage}%</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopJobPositions;
