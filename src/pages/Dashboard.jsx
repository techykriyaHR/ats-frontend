import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ApplicantList from "../components/ApplicantList";
import StatusCounter from "../components/StatusCounter";
import AnalysisPage from "../components/AnalysisComponents/AnalysisPage";
import ApplicantDetailsPage from "./ApplicantDetailsPage";
import AddApplicantForm from "./AddApplicantForm";
import WarningModal from "../components/Modals/WarningModal";

const MAX_TABS = 10;

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState('home');
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [showAddApplicantForm, setShowAddApplicantForm] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const data = [
    {
      month: "January",
      closed: 12,
      passed: 3,
      onProgress: 0,
    },
    {
      month: "February",
      closed: 4,
      passed: 2,
      onProgress: 0,
    },
    {
      month: "March",
      closed: 3,
      passed: 1,
      onProgress: 0,
    },
    {
      month: "April",
      closed: 4,
      passed: 2,
      onProgress: 0,
    },
    {
      month: "August",
      closed: 0,
      passed: 0,
      onProgress: 11,
    },
    {
      month: "September",
      closed: 0,
      passed: 2,
      onProgress: 0,
    },
    {
      month: "October",
      closed: 0,
      passed: 0,
      onProgress: 21,
    },
    {
      month: "May",
      closed: 27,
      passed: 4,
      onProgress: 0,
    },
    {
      month: "June",
      closed: 14,
      passed: 2,
      onProgress: 0,
    },
    {
      month: "July",
      closed: 5,
      passed: 4,
      onProgress: 0,
    },
    {
      month: "November",
      closed: 4,
      passed: 0,
      onProgress: 4,
    },
    {
      month: "December",
      closed: 0,
      passed: 0,
      onProgress: 1,
    },
  ];

  const handleApplicantSelect = (applicant) => {
    setTabs((prevTabs) => {
      if (prevTabs.length >= MAX_TABS) {
        setShowWarningModal(true);
        return prevTabs;
      }
      if (!prevTabs.some(tab => tab.id === applicant.id)) {
        return [...prevTabs, applicant];
      }
      return prevTabs;
    });
  };

  const handleCloseTab = (id) => {
    setTabs((prevTabs) => prevTabs.filter(tab => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(null);
    }
  };

  const renderContent = () => {
    if (activeTab !== null && selectedView === 'home') {
      const activeApplicant = tabs.find(tab => tab.id === activeTab);
      return <ApplicantDetailsPage applicant={activeApplicant} onBack={() => setActiveTab(null)} />;
    }

    switch (selectedView) {
      case 'home':
        return (
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <ApplicantList onSelectApplicant={handleApplicantSelect} onAddApplicantClick={() => setShowAddApplicantForm(true)} />
            </div>
            <div className="col-span-1">
              <StatusCounter />
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="flex flex-col items-center w-full h-full">
            <AnalysisPage />
          </div>
        );
      default:
        return <div>Welcome to the Applicant Tracking System</div>;
    }
  };

  const handleSelectView = (view) => {
    setSelectedView(view);
    if (view === 'dashboard') {
      setActiveTab(null);
    }
  };

  const handleWarningModalClose = () => {
    setShowWarningModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {showAddApplicantForm ? (
          <AddApplicantForm onClose={() => setShowAddApplicantForm(false)} />
        ) : (
          <>
            <Header onSelectView={handleSelectView} />
            <main className="p-4 overflow-auto">
              {selectedView === 'home' && !showAddApplicantForm && (
                <div className="flex space-x-2 mb-4 p-2 border rounded-lg overflow-x-auto">
                  <div className="flex items-center space-x-1">
                    <button
                      className={`px-4 py-2 rounded-md border ${activeTab === null ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border-teal-600'}`}
                      onClick={() => setActiveTab(null)}
                    >
                      Applicant List
                    </button>
                  </div>
                  <div className="flex space-x-1 flex-shrink-0">
                    {tabs.map((tab) => (
                      <div key={tab.id} className="flex items-center space-x-1 bg-gray-200 rounded-md text-sm flex-shrink-0 min-w-0">
                        <button
                          className={`px-4 py-2 rounded-md truncate ${activeTab === tab.id ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                          onClick={() => setActiveTab(tab.id)}
                          title={tab.name} // Show full name on hover
                        >
                          {tab.name.length > 10 ? `${tab.name.slice(0, 8)}...` : tab.name}
                        </button>
                        <button
                          className="px-2 text-gray-600 hover:text-gray-800"
                          onClick={() => handleCloseTab(tab.id)}
                        >
                          <FaTimes className="h-4 w-4" />
                          <span className="sr-only">Remove {tab.name}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex-1 overflow-auto">
                {renderContent()}
              </div>
            </main>
          </>
        )}
      </div>
      {showWarningModal && (
        <WarningModal
          message={`You can only open up to ${MAX_TABS} tabs.`}
          onClose={handleWarningModalClose}
        />
      )}
    </div>
  );
}