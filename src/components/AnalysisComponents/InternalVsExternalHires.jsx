import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";


const InternalVsExternalHires = ({
  internalHires = 70,
  externalHires = 30,
}) => {
  const totalHires = internalHires + externalHires;
  const internalPercentage = ((internalHires / totalHires) * 100).toFixed(0);
  const externalPercentage = ((externalHires / totalHires) * 100).toFixed(0);
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
              This card shows the percentage breakdown of internal(referral) vs external hires in your organization over time
            </span>
          )}
        </div>
      </div>
      <div className="px-10">
        <div className="mt-7 flex items-center justify-center gap-3">
          <span className="text-4xl font-semibold">{internalPercentage}%</span>
          <span className="text-xl text-gray-600">-</span>
          <span className="text-4xl font-semibold">{externalPercentage}%</span>
        </div>

        <div className="mt-4 flex justify-between ">
          <span className="text-gray-600">Internal</span>
          <span className="text-gray-600">External</span>
        </div>
      </div>

    </>
  );
};

export default InternalVsExternalHires;
