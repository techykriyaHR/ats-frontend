import { FaHeartbeat, FaList, FaChartBar, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Header({ onSelectView, onToggleSidebar }) {
  const [currentView, setCurrentView] = useState("listings");

  const handleSelectView = (view) => {
    setCurrentView(view);
    onSelectView(view);
  };

  return (
    <header className="top-0 flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-gray-dark focus:outline-none md:hidden"
        >
          <FaBars size={24} />
        </button>
        <p className="display text-gray-dark block md:hidden">ATS</p>
        <p className="display text-gray-dark hidden md:block">Application Tracking System</p>
      </div>
      <div className="flex items-center gap-4">
        
        <button className="rounded-full p-2 text-teal-600 hover:bg-teal-600/10 hover:text-teal-700">
          <FaHeartbeat className="h-6 w-6 md:h-10 md:w-10" />
        </button>
      </div>
    </header>
  );
}
