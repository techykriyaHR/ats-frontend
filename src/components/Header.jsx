import { FaHeartbeat, FaList, FaChartBar, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Header({ onSelectView, onToggleSidebar }) {
  const [currentView, setCurrentView] = useState("listings");

  const handleSelectView = (view) => {
    setCurrentView(view);
    onSelectView(view);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-500 focus:outline-none"
        >
          <FaBars size={24} />
        </button>
        <p className="display block sm:hidden">ATS</p>
        <p className="display hidden sm:block">Application Tracking System</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 bg-teal-600/10 p-2 rounded-md justify-center">
          <button
            className={`p-2 rounded-md ${
              currentView === "listings"
                ? "bg-[#008080] text-white"
                : "bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
            }`}
            onClick={() => handleSelectView("listings")}
          >
            <span className="hidden md:inline">Listings</span>
            <FaList className="h-6 w-6 md:hidden" />
          </button>
          <button
            className={`p-2 rounded-md ${
              currentView === "analytics"
                ? "bg-[#008080] text-white"
                : "bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
            }`}
            onClick={() => handleSelectView("analytics")}
          >
            <span className="hidden md:inline">Analytics</span>
            <FaChartBar className="h-6 w-6 md:hidden" />
          </button>
        </div>
        <button className="p-2 text-teal-600 hover:bg-teal-600/10 hover:text-teal-700 rounded-full">
          <FaHeartbeat className="h-6 w-6 md:h-10 md:w-10" />
        </button>
      </div>
    </header>
  );
}
