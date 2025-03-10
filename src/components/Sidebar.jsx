import { FaList, FaChartBar, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import useUserStore from "../store/userStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen, onToggleSidebar, onSelectView }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("listings");

  const handleSelectView = (view) => {
    setCurrentView(view);
    onSelectView(view);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null); // Clear user data from Zustand store
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggleSidebar}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:sticky md:top-0 h-full flex flex-col justify-between shadow-lg`}
      >
        <div>
          <div className="mb-8 flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-sm">
            <FaUserCircle className="h-12 w-12 text-gray-300" />
            <div>
              {user ? (
                <>
                  <h3 className="font-medium text-lg">{`${user.first_name} ${user.last_name}`}</h3>
                  <p className="text-sm text-gray-500">{user.user_email}</p>
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-teal-600"></div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <nav className="space-y-1">
               
                <div
                  onClick={() => handleSelectView("listings")}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium cursor-pointer ${
                    currentView === "listings"
                      ? "bg-[#008080] text-white"
                      : "bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
                  } transition`}
                >
                  <FaList className="w-5 h-5" />
                  Listings
                </div>
                <div
                  onClick={() => handleSelectView("analytics")}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium cursor-pointer ${
                    currentView === "analytics"
                      ? "bg-[#008080] text-white"
                      : "bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
                  } transition`}
                >
                  <FaChartBar className="w-5 h-5" />
                  Analytics
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div>
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-teal-600/10 hover:text-teal-700 transition w-full text-left cursor-pointer"
          >
            <FaSignOutAlt className="w-5 h-5" />
            Logout
          </div>
        </div>
      </div>
    </>
  );
}