import { FaLongArrowAltLeft, FaRegArrowAltCircleLeft, FaSignOutAlt, FaTimes, FaTimesCircle } from "react-icons/fa";

export default function Sidebar({ isOpen, onToggleSidebar }) {
  return (
    <>
      {/* Overlay (closes sidebar when clicked) */}
      {/* <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } md:hidden`}
        onClick={onToggleSidebar}
        aria-hidden="true"
      ></div> */}

      {/* Sidebar */}
      <div
        className={`fixed flex flex-col justify-between inset-y-0 left-0 z-50 w-72 h-full bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:shadow-none`}
      >
        {/* Close Button (only for mobile) */}
        <button
          className="absolute top-4 right-4 text-gray-500 md:hidden"
          onClick={onToggleSidebar}
        >
          <FaTimesCircle className="h-5 w-5" />
        </button>

        <div>
          {/* User Info */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <h3 className="text-gray-900 font-semibold">Marvin Bautista</h3>
              <p className="text-sm text-gray-500">marvin@fullsuite.ph</p>
            </div>
          </div>

          {/* Navigation */}
          {/* <nav className="space-y-2">
            <p className="text-xs font-semibold uppercase text-gray-500">My Info</p>
            <SidebarLink text="Applicant Tracking System" onClick={onToggleSidebar} active />
            <SidebarLink text="Payslips" onClick={onToggleSidebar} />
            <SidebarLink text="Attendance" onClick={onToggleSidebar} />
          </nav> */}
        </div>

        {/* Logout Button on the bottom of the screen*/}
        <div>
          <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-teal bg-white text-teal hover:bg-teal-soft">
            <FaSignOutAlt className="h-4 w-4" />
            Logout
          </button>
        </div>

      </div>
    </>
  );
}

// Reusable SidebarLink Component (closes sidebar on mobile)
function SidebarLink({ text, onClick, active }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${active
        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
        : "text-gray-700 hover:bg-gray-100"
        }`}
      onClick={onClick}
    >
      <div className="h-5 w-5 bg-gray-500"></div>
      {text}
    </a>
  );
}
