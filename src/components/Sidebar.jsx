import { FaTimes } from "react-icons/fa";
import useUserStore from "../store/userStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onToggleSidebar }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null); // Clear user data from Zustand store
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggleSidebar}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:sticky md:top-0 h-full flex flex-col justify-between`}
      >
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div>
              <h3 className="font-medium">{user ? user.first_name + " " + user.last_name : "Loading..."}</h3>
              <p className="text-sm text-gray-500">{user ? user.user_email : "Loading..."}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium text-gray-500">MY INFO</p>
              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium"
                >
                  <div className="w-5 h-5 bg-gray-500"></div>
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
                >
                  <div className="w-5 h-5 bg-gray-500"></div>
                  Payslips
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
                >
                  <div className="w-5 h-5 bg-gray-500"></div>
                  Attendance
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 w-full text-left"
          >
            <div className="w-5 h-5 bg-gray-500"></div>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}