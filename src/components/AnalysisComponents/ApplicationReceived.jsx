import React from "react";

const ApplicationReceived = ({ totalApplications, months }) => {
  return (
    <>
      <h3 className="mb-4 text-center text-sm text-gray-600">
        Application Received
      </h3>
      <p className="mb-6 text-center text-4xl font-semibold">
        {totalApplications}
      </p>

      <div className="space-y-2">
        {months.map((month, index) => (
          <div key={index} className="flex justify-between">
            <span className="font-medium">{month.name}</span>
            <span className="font-medium">{month.count}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplicationReceived;
