export default function ApplicantList() {
    return (
      <div className="p-4 bg-white shadow-md rounded-md mt-6">
        <h2 className="text-lg font-semibold mb-2">Applicant List</h2>
        <div className="flex space-x-2">
          <input className="p-2 border rounded-md flex-1" placeholder="Search" />
          <button className="px-4 py-2 bg-green-700 text-white rounded-md">Search</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Upload</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Add New</button>
        </div>
      </div>
    );
  }
  