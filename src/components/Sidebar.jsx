import { FaTimes } from "react-icons/fa";

export default function Sidebar({ isOpen, onToggleSidebar }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onToggleSidebar}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:top-0 h-full`}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div>
            <h3 className="font-medium">Marvin Bautista</h3>
            <p className="text-sm text-gray-500">marvin@fullsuite.ph</p>
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
    </>
  );
}
