import React from 'react';

const ApplicantStatusAnalysis = ({ data }) => {
  const totalClosed = data.reduce((sum, month) => sum + month.closed, 0);
  const totalPassed = data.reduce((sum, month) => sum + month.passed, 0);
  const totalOnProgress = data.reduce((sum, month) => sum + month.onProgress, 0);

  const highestClosedMonth = data.reduce((max, month) => month.closed > max.closed ? month : max, data[0]);
  const highestPassedMonth = data.reduce((max, month) => month.passed > max.passed ? month : max, data[0]);
  const highestOnProgressMonth = data.reduce((max, month) => month.onProgress > max.onProgress ? month : max, data[0]);

  return (
    <div className="w-full space-y-4 p-4 h-full">
      <h2 className="text-lg font-semibold">Requisition Statistics (Numeric)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-md font-semibold">Total Applications</h3>
          <p>Closed: {totalClosed}</p>
          <p>Passed: {totalPassed}</p>
          <p>On Progress: {totalOnProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-md font-semibold">Highest Closed Applications</h3>
          <p>Month: {highestClosedMonth.month}</p>
          <p>Count: {highestClosedMonth.closed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-md font-semibold">Highest Passed Applications</h3>
          <p>Month: {highestPassedMonth.month}</p>
          <p>Count: {highestPassedMonth.passed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-md font-semibold">Highest On Progress Applications</h3>
          <p>Month: {highestOnProgressMonth.month}</p>
          <p>Count: {highestOnProgressMonth.onProgress}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantStatusAnalysis;