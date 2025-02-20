export default function StatusCounter({ filter, setFilter }) {
    return (
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
    );
  }
  