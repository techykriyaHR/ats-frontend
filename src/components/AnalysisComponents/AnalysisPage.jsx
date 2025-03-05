import TopJobPositions from "./TopJobPositions";
import InternalVsExternalHires from "./InternalVsExternalHires";
import CandidateDropOffRate from "./CandidateDropOffRate";
import ApplicationReceived from "./ApplicationReceived";
import ApplicantStatusChart from "./RequisitionAnalysisGraph";
import SourceOfApplication from "./SourceOfApplication";

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

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Top row with 4 equal cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <div className="h-60 rounded-xl bg-white p-6 shadow-xl md:p-8">
          <ApplicationReceived
            totalApplications={totalApplications}
            months={months}
          />
        </div>
        <div className="h-60 rounded-xl bg-white p-6 shadow-xl md:p-8">
          <TopJobPositions jobPositions={jobPositions} />
        </div>
        <div className="h-60 rounded-xl bg-white p-6 shadow-xl md:p-8">
          <InternalVsExternalHires
            internalHires={internalHires}
            externalHires={externalHires}
          />
        </div>
        <div className="h-60 rounded-xl bg-white p-6 shadow-xl md:p-8">
          <CandidateDropOffRate
            overallRate={overallRate}
            monthlyRates={monthlyRates}
          />
        </div>
      </div>

      {/* Bottom row with 2 cards */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-xl md:p-8 lg:col-span-2">
          <div className="h-96">
            <ApplicantStatusChart data={requisitionData} />
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-xl md:p-8">
          <div className="h-96">
            <SourceOfApplication data={sourceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
