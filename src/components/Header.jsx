import { FaHeartbeat } from 'react-icons/fa';
import { useState } from 'react';

export default function Header({ onSelectView }) {
  const [currentView, setCurrentView] = useState('home');

  const handleSelectView = (view) => {
    setCurrentView(view);
    onSelectView(view);
  };

  return (
    <header className="flex items-center justify-between  px-6 py-4 ">
      <h1 className="text-xl font-semibold text-gray-900">Applicant Tracking System</h1>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 bg-teal-600/10 p-2 w-80 rounded-md justify-center">
          <button
            className={`px-4 py-2 w-80 rounded-md ${currentView === 'home' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
            onClick={() => handleSelectView('home')}
          >
            Listings
          </button>
          <button
            className={`px-4 py-2 w-80 rounded-md ${currentView === 'dashboard' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
            onClick={() => handleSelectView('dashboard')}
          >
            Analytics
          </button>
        </div>
        <button className="p-2 text-teal-600 hover:bg-teal-600/10 hover:text-teal-700 rounded-full">
          <FaHeartbeat className="h-10 w-10" />
        </button>
      </div>
    </header>
  );
}