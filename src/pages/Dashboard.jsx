import { useState } from "react";

export default function Dashboard() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <h1 className="text-xl font-bold">Applicant Tracking System</h1>
        <nav className="flex space-x-4">
          <button className="px-4 py-2 bg-green-700 text-white rounded-md">Home</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Dashboards</button>
        </nav>
      </div>

      {/* Status Counter Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Status Counter</h2>
          <div className="flex space-x-2 mb-2">
            <button className="px-4 py-2 border rounded-md">For Processing</button>
            <button className="px-4 py-2 border rounded-md">In-Progress</button>
            <button className="px-4 py-2 border rounded-md">Wrapped-Up</button>
            <button className="px-4 py-2 border rounded-md">Finished</button>
          </div>
          <select className="p-2 border rounded-md w-full" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {["Sent Test", "Second Interview", "Job Offer Sent", "Not Fit", "Blacklisted"].map((status, index) => (
              <div key={index} className="flex justify-between p-2 bg-gray-200 rounded-md">
                <span>{status}</span>
                <span className="font-bold">{Math.floor(Math.random() * 100)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">ATS Healthcheck</h2>
        </div>
      </div>

      {/* Applicant List Section */}
      <div className="p-4 bg-white shadow-md rounded-md mt-6">
        <h2 className="text-lg font-semibold mb-2">Applicant List</h2>
        <div className="flex space-x-2">
          <input className="p-2 border rounded-md flex-1" placeholder="Search" />
          <button className="px-4 py-2 bg-green-700 text-white rounded-md">Search</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Upload</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Add New</button>
        </div>
      </div>
    </div>
  );
}
