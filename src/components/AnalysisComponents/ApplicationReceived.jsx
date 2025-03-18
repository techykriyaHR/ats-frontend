import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ApplicationReceived = () => {
  const [totalApplications, setTotalApplications] = useState(0);
  const [months, setMonths] = useState([]);

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