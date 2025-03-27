import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import api from "../../api/axios";

const InternalVsExternalHires = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [internalData, setInternalData] = useState({ count: 0, percentage: 0 });
  const [externalData, setExternalData] = useState({ count: 0, percentage: 0 });

  useEffect(() => {
    const fetchSourceData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/analytic/graphs/applicant-sources");

        if (response.data && response.data.data && response.data.data.sources) {
          const sources = response.data.data.sources;

          // Find internal and external data
          const internalSource = sources.find(source =>
            source.source_type === "Internal Referral" ||
            source.source_type.toLowerCase().includes("internal")
          );

          const externalSource = sources.find(source =>
            source.source_type === "External" ||
            source.source_type.toLowerCase().includes("external")
          );

          if (internalSource) {
            setInternalData({
              count: internalSource.count,
              percentage: Math.round(Number(internalSource.percentage))
            });
          }

          if (externalSource) {
            setExternalData({
              count: externalSource.count,
              percentage: Math.round(Number(externalSource.percentage))
            });
          }
        }
      } catch (err) {
        console.error("Error fetching source data:", err);
        setError("Failed to load source data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSourceData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="">Internal vs External Hires</h3>
        <div className="relative flex-col flex items-end gap-1">
          <FaInfoCircle
            className="cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <span className="absolute mt-5 w-48 p-2 body-tiny text-teal bg-teal-soft rounded shadow-lg text-justify z-10">
              This card shows the percentage breakdown of internal(referral) vs external hires in your organization over time
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-gray-500">Loading data...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : (
        <div className="px-10">
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="text-4xl font-semibold">{internalData.percentage}%</span>
            <span className="text-xl text-gray-600">-</span>
            <span className="text-4xl font-semibold">{externalData.percentage}%</span>
          </div>





        </div>
      )}
    </>
  );
};

export default InternalVsExternalHires;