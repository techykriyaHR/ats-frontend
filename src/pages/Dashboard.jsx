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

const MAX_TABS = 5;

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState("listings");
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [showAddApplicantForm, setShowAddApplicantForm] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleApplicantSelect = (applicant) => {
    setTabs((prevTabs) => {
      if (prevTabs.length >= MAX_TABS) {
        setShowWarningModal(true);
        return prevTabs;
      }

      const existingTab = prevTabs.find((tab) => tab.id === applicant.id);
      if (existingTab) {
        setActiveTab(applicant.id);
        return prevTabs;
      }

      const newTabs = [...prevTabs, applicant];
      setActiveTab(applicant.id);
      return newTabs;
    });
  };

  const handleCloseTab = (id) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(null);
    }
  };

  const renderContent = () => {
    if (activeTab !== null && selectedView === "listings") {
      const activeApplicant = tabs.find((tab) => tab.id === activeTab);
      return (
        <ApplicantDetailsPage
          applicant={activeApplicant}
          onBack={() => setActiveTab(null)}
        />
      );
    }

    switch (selectedView) {
      case "listings":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <ApplicantList
                onSelectApplicant={handleApplicantSelect}
                onAddApplicantClick={() => setShowAddApplicantForm(true)}
              />
            </div>
            <div className="lg:col-span-1">
              <StatusCounter />
            </div>
          </div>
        );
      case "analytics":
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
    if (view === "analytics") {
      setActiveTab(null);
    }
  };

  const handleWarningModalClose = () => {
    setShowWarningModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-30 ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
      </div>

      {/* Main content area with padding to account for fixed sidebar width */}
      <div className="flex-1 flex flex-col md:ml-64">
        {showAddApplicantForm ? (
          <AddApplicantForm onClose={() => setShowAddApplicantForm(false)} />
        ) : (
          <>
            {/* Fixed header */}
            <div className="fixed top-0 right-0 left-0 z-20 md:left-64">
              <Header
                onSelectView={handleSelectView}
                onToggleSidebar={handleToggleSidebar}
              />
            </div>

            {/* Content with padding to account for fixed header height */}
            <main className="p-4 overflow-auto flex-1 mt-16">
              {selectedView === "listings" && !showAddApplicantForm && (
                <div className="flex flex-wrap space-x-2 mb-4 p-2 border rounded-lg overflow-x-auto">
                  <div className="flex items-center space-x-1 mb-2 md:mb-0">
                    <button
                      className={`px-4 py-2 rounded-md border ${
                        activeTab === null
                          ? "bg-teal-600 text-white"
                          : "bg-white text-teal-600 border-teal-600"
                      }`}
                      onClick={() => setActiveTab(null)}
                    >
                      Applicant List
                    </button>
                  </div>
                  <div className="flex space-x-1 flex-shrink-0 mb-2 md:mb-0 overflow-x-auto">
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className="flex items-center space-x-1 bg-gray-200 rounded-md text-sm flex-shrink-0 min-w-0"
                      >
                        <button
                          className={`px-4 py-2 rounded-md truncate ${
                            activeTab === tab.id
                              ? "bg-teal-600 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                          title={tab.name}
                        >
                          {tab.name.length > 10
                            ? `${tab.name.slice(0, 8)}...`
                            : tab.name}
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
              <div className="flex-1 overflow-auto">{renderContent()}</div>
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
