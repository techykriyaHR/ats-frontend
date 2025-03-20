import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Sidebar from "../layouts/Sidebar.jsx";
import Header from "../layouts/Header.jsx";
import ApplicantList from "../layouts/ApplicantList.jsx";
import StatusCounter from "../layouts/StatusCounter.jsx";
import AnalysisPage from "../components/AnalysisComponents/AnalysisPage.jsx";
import ApplicantDetailsPage from "./ApplicantDetailsPage.jsx";
import AddApplicantForm from "./AddApplicantForm.jsx";
import WarningModal from "../components/Modals/WarningModal.jsx";
import ATSHealthcheck from "../components/Modals/ATSHeathcheck.jsx";
import useUserStore from "../context/userStore.jsx";
import api from "../api/axios.js";
import Cookies from "js-cookie";
import Configurations from "./Configurations.jsx";
import Dashboard from "./Dashboard.jsx";

const MAX_TABS = 10;

export default function Listings() {
  // State Management
  const [selectedView, setSelectedView] = useState("dashboard");
  const [tabs, setTabs] = useState(() => JSON.parse(localStorage.getItem("tabs")) || []);
  const [activeTab, setActiveTab] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modals, setModals] = useState({
    addApplicant: false,
    warning: false,
    atsHealthcheck: false,
  });

  const setUser = useUserStore((state) => state.setUser);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = Cookies.get("token");
        const response = await api.get("/user/getuserinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data fetched:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [setUser]);

  // Persist tabs to local storage
  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  // UI Handlers
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleModal = (modal) => setModals((prev) => ({ ...prev, [modal]: !prev }));

  // View Selection
  const handleSelectView = (view) => {
    setSelectedView(view);
    if (view === "analytics") setActiveTab(null);
  };

  // Applicant Tab Management
  const handleSelectApplicant = (applicant) => {
    toggleModal("atsHealthcheck"); // Close ATS modal

    setTabs((prevTabs) => {
      const isTabExists = prevTabs.some((tab) => tab.id === applicant.applicant_id);
      if (isTabExists) {
        setActiveTab(applicant.applicant_id);
        return prevTabs;
      }

      if (prevTabs.length >= MAX_TABS) {
        toggleModal("warning");
        return prevTabs;
      }

      const newTab = {
        id: applicant.applicant_id,
        name: `${applicant.first_name} ${applicant.last_name}`,
        data: applicant,
      };

      setActiveTab(applicant.applicant_id);
      return [...prevTabs, newTab];
    });
  };

  const handleCloseTab = (id) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    if (activeTab === id) setActiveTab(null);
  };

  // Dynamic Content Rendering
  const renderContent = () => {
    if (activeTab !== null && selectedView === "listings") {
      const activeApplicant = tabs.find((tab) => tab.id === activeTab);
      return activeApplicant ? (
        <ApplicantDetailsPage applicant={activeApplicant.data} onBack={() => setActiveTab(null)} />
      ) : null;
    }

    const contentMap = {
      listings: (
        <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ApplicantList
              onSelectApplicant={handleSelectApplicant}
              onAddApplicantClick={() => toggleModal("addApplicant")}
            />
          </div>
          <div className="lg:col-span-1">
            <StatusCounter />
          </div>
        </div>
      ),
      analytics: <AnalysisPage />,
      dashboard: <Dashboard />,
      config: <Configurations />,
    };

    return contentMap[selectedView] || <div className="p-6 text-center text-lg font-semibold">New Tab</div>;
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 px-5 sm:flex-row">
      {/* Sidebar */}
      <div className={`fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} onSelectView={handleSelectView} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:ml-72 w-full lg:px-5">
        {modals.addApplicant ? (
          <AddApplicantForm onClose={() => toggleModal("addApplicant")} />
        ) : (
          <>
            <Header onToggleSidebar={toggleSidebar} onToggleATSHealthcheck={() => toggleModal("atsHealthcheck")} />

            {/* Tabs Section */}
            {selectedView === "listings" && !modals.addApplicant && (
              <div className="mb-4 flex rounded-lg border border-gray-light bg-white p-1 pb-0">
                <div className="flex flex-wrap space-x-2 whitespace-nowrap items-center">
                  {/* Applicant List Tab */}
                  <button
                    className={`px-3 py-1 mb-1 rounded-md border body-bold transition-colors cursor-pointer ${activeTab === null ? "bg-teal-soft text-teal border-teal-soft" : "bg-white text-teal border-teal hover:bg-gray-light"}`}
                    onClick={() => setActiveTab(null)}
                  >
                    Applicant List
                  </button>

                  {/* Dynamic Tabs */}
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`flex items-center px-2 py-1 mb-1 rounded-md body-regular transition-colors h-6 ${activeTab === tab.id ? "bg-teal-soft text-teal" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                      <button className="truncate max-w-[100px] lg:max-w-none cursor-pointer" onClick={() => setActiveTab(tab.id)} title={tab.name}>
                        {tab.name.length > 10 ? `${tab.name.slice(0, 10)}...` : tab.name}
                      </button>
                      <button className="ml-1 text-gray-600 hover:text-gray-800" onClick={() => handleCloseTab(tab.id)}>
                        <FaTimes className="h-3 w-3" />
                        <span className="sr-only">Remove {tab.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Section */}
            <main className="flex-1 overflow-auto rounded-lg">{renderContent()}</main>
          </>
        )}
      </div>

      {/* Warning Modal */}
      {modals.warning && <WarningModal message={`You can only open up to ${MAX_TABS} tabs.`} onClose={() => toggleModal("warning")} />}

      {/* ATS Healthcheck Modal */}
      {modals.atsHealthcheck && (
        <div className="fixed inset-0 flex items-start justify-end z-50 pointer-events-none">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mt-4 relative pointer-events-auto">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={() => toggleModal("atsHealthcheck")}>
              <FaTimes className="h-5 w-5" />
            </button>
            <ATSHealthcheck onSelectApplicant={handleSelectApplicant} />
          </div>
        </div>
      )}
    </div>
  );
}
