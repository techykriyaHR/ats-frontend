import { FaHeartbeat, FaList, FaChartBar, FaBars } from 'react-icons/fa';
import { useState } from 'react';

export default function Header({ onSelectView, onToggleSidebar }) {
  const [currentView, setCurrentView] = useState('home');

  const handleSelectView = (view) => {
    setCurrentView(view);
    onSelectView(view);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden text-gray-500 focus:outline-none">
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">ATS</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 bg-teal-600/10 p-2 rounded-md justify-center">
          <button
            className={`p-2 rounded-md ${currentView === 'home' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
            onClick={() => handleSelectView('home')}
          >
            <span className="hidden md:inline">Listings</span>
            <FaList className="h-6 w-6 md:hidden" />
          </button>
          <button
            className={`p-2 rounded-md ${currentView === 'dashboard' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
            onClick={() => handleSelectView('dashboard')}
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