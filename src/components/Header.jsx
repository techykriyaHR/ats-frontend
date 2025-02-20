export default function Header() {
    return (
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <h1 className="text-xl font-bold">Applicant Tracking System</h1>
        <nav className="flex space-x-4">
          <button className="px-4 py-2 bg-green-700 text-white rounded-md">Home</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Dashboards</button>
        </nav>
      </div>
    );
  }
  