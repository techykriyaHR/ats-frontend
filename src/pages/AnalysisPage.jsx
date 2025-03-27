import { useState, useEffect } from "react"
import {
  FiUsers,
  FiBriefcase,
  FiRefreshCw,
  FiTrendingDown,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi"

import TopJobPositions from "../components/AnalysisComponents/TopJobPositions"
import InternalVsExternalHires from "../components/AnalysisComponents/InternalVsExternalHires"
import CandidateDropOffRate from "../components/AnalysisComponents/CandidateDropOffRate"
import ApplicationReceived from "../components/AnalysisComponents/ApplicationReceived"
import ApplicantStatusChart from "../components/AnalysisComponents/RequisitionAnalysisGraph"
import SourceOfApplication from "../components/AnalysisComponents/SourceOfApplication"

const AnalysisPage = () => {
  const jobPositions = [
    { title: "Software Engineer", percentage: 25 },
    { title: "Product Manager", percentage: 20 },
    { title: "Data Analyst", percentage: 15 },
  ];

  const internalHires = 30;
  const externalHires = 70;

  const overallRate = 10;
  const monthlyRates = {
    January: 5,
    February: 10,
    March: 15,
  };

  const totalApplications = 100;
  const months = [
    { name: "January", count: 30 },
    { name: "February", count: 40 },
    { name: "March", count: 30 },
  ];

  const requisitionData = [
    { month: "January", closed: 12, passed: 3, onProgress: 0 },
    { month: "February", closed: 4, passed: 2, onProgress: 0 },
    { month: "March", closed: 3, passed: 1, onProgress: 0 },
    { month: "April", closed: 4, passed: 2, onProgress: 0 },
    { month: "May", closed: 27, passed: 4, onProgress: 0 },
    { month: "June", closed: 14, passed: 2, onProgress: 0 },
    { month: "July", closed: 5, passed: 4, onProgress: 0 },
    { month: "August", closed: 0, passed: 0, onProgress: 11 },
    { month: "September", closed: 0, passed: 2, onProgress: 0 },
    { month: "October", closed: 0, passed: 0, onProgress: 21 },
    { month: "November", closed: 4, passed: 0, onProgress: 4 },
    { month: "December", closed: 0, passed: 0, onProgress: 1 },
  ];

  const sourceData = [
    { name: "Referral", value: 50 },
    { name: "Website", value: 30 },
    { name: "Caravan", value: 20 },
  ];

  // Simplified Card component without expansion functionality
  const Card = ({ id, title, icon, children }) => {
    return (
      <div
        className="
          rounded-xl bg-white/80 backdrop-blur-sm
          h-auto min-h-[12rem] xs:min-h-[13rem] sm:min-h-[15rem]
        "
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
        }}
      >
        <div className="flex items-center justify-between p-2 xs:p-3 sm:p-4 border-b border-opacity-10 border-gray-200">
          <div className="flex items-center gap-1 xs:gap-2 text-xs xs:text-sm sm:text-base font-medium text-gray-700">
            <span className="text-primary">{icon}</span>
            {title}
          </div>
        </div>
        <div 
          className="p-2 xs:p-3 sm:p-4 h-[calc(100%-40px)] xs:h-[calc(100%-44px)] sm:h-[calc(100%-56px)] custom-scrollbar"
          style={{ overflowY: 'auto' }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 xs:space-y-6 sm:space-y-8 p-2 xs:p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
        }
      `}</style>
      
      {/* Top row with 4 equal cards */}
      <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card id="applications" title="Applications Received" icon={<FiUsers className="h-4 w-4 sm:h-5 sm:w-5" />}>
          <ApplicationReceived totalApplications={totalApplications} months={months} />
        </Card>

        <Card id="positions" title="Top Job Positions" icon={<FiBriefcase className="h-4 w-4 sm:h-5 sm:w-5" />}>
          <TopJobPositions jobPositions={jobPositions} />
        </Card>

        <Card id="hires" title="Internal vs External Hires" icon={<FiRefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />}>
          <InternalVsExternalHires internalHires={internalHires} externalHires={externalHires} />
        </Card>

        <Card id="dropoff" title="Candidate Drop-off Rate" icon={<FiTrendingDown className="h-4 w-4 sm:h-5 sm:w-5" />}>
          <CandidateDropOffRate overallRate={overallRate} monthlyRates={monthlyRates} />
        </Card>
      </div>

      {/* Bottom row with 2 cards */}
      <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card
            id="requisition"
            title="Requisition Analysis"
            icon={<FiBarChart2 className="h-4 w-4 sm:h-5 sm:w-5" />}
          >
            <ApplicantStatusChart data={requisitionData} />
          </Card>
        </div>
        <div>
          <Card
            id="source"
            title="Source of Applications"
            icon={<FiPieChart className="h-4 w-4 sm:h-5 sm:w-5" />}
          >
            <SourceOfApplication data={sourceData} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;