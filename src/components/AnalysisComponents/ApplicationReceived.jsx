import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaInfoCircle } from "react-icons/fa";

const ApplicationReceived = () => {
  const [totalApplications, setTotalApplications] = useState(0);
  const [months, setMonths] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchApplicationTrend = async () => {
      try {
        const response = await api.get("/analytic/graphs/application-trend");
        const data = response.data.data;

        setTotalApplications(data.total);
        setMonths(data.trend.map((item) => ({ name: item.month, count: item.count })));
      } catch (error) {
        console.error("Error fetching application trend data:", error);
      }
    };

    fetchApplicationTrend();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="">Application Received</h3>
        <div className="relative flex-col flex items-end gap-1">
          <FaInfoCircle
            className="cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <span className="absolute mt-5 w-48 p-2 body-tiny text-teal bg-teal-soft rounded shadow-lg text-justify">
              This card shows the number of applications received.
            </span>
          )}
        </div>
      </div>

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