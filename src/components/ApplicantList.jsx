import { useState } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function ApplicantList({ onSelectApplicant }) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("month");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  const applicants = [
    { id: 1, date: "Jan 05, 2024", name: "Juniper Williams", position: "Software Engineer", status: "Sent Test" },
    { id: 2, date: "Feb 10, 2024", name: "Macrow Mhaneej", position: "Data Analyst", status: "First Interview Stage" },
    { id: 3, date: "Mar 15, 2024", name: "Alice Johnson", position: "Product Manager", status: "Final Interview Stage" },
    { id: 4, date: "Apr 20, 2024", name: "Bob Smith", position: "UX Designer", status: "Job Offer Sent" },
    { id: 5, date: "May 25, 2024", name: "Carol White", position: "Marketing Specialist", status: "Abandoned" },
    { id: 6, date: "Jun 30, 2024", name: "David Brown", position: "Sales Manager", status: "Blacklisted" },
    { id: 7, date: "Jul 05, 2024", name: "Eve Davis", position: "HR Specialist", status: "No Show" },
    { id: 8, date: "Aug 10, 2024", name: "Frank Green", position: "IT Support", status: "Not Fit" },
    { id: 9, date: "Sep 15, 2024", name: "Grace Lee", position: "Business Analyst", status: "Sent Test" },
    { id: 10, date: "Oct 20, 2024", name: "Henry King", position: "Operations Manager", status: "First Interview Stage" },
  ];

  const statuses = [
    "Sent Test",
    "First Interview Stage",
    "Final Interview Stage",
    "Job Offer Sent",
    "Abandoned",
    "Blacklisted",
    "No Show",
    "Not Fit",
  ];

  const handleRowClick = (id) => {
    const applicant = applicants.find((applicant) => applicant.id === id);
    if (applicant) {
      onSelectApplicant(applicant);
    }
  };

  const clearFilter = () => {
    setSelectedDate(null);
    setDateFilterType("month");
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredApplicants = applicants
    .filter((applicant) => {
      if (!selectedDate) return true;
      const applicantDate = new Date(applicant.date);
      const selectedMonth = selectedDate.toLocaleString("en-US", { month: "long" });

      if (dateFilterType === "month") {
        return (
          applicantDate.toLocaleString("en-US", { month: "long" }) === selectedMonth &&
          applicantDate.getFullYear() === selectedDate.getFullYear()
        );
      } else if (dateFilterType === "year") {
        return applicantDate.getFullYear() === selectedDate.getFullYear();
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleAddApplicantClick = () => {
    navigate('/add-applicant');
  };

  return (
    <div className="relative p-6 max-w-[1200px] mx-auto bg-white rounded-3xl shadow-lg">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">Applicant List</h1>
        <div className="flex gap-2">
          <button className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
            <FiUpload className="w-4 h-4 mr-2" /> Upload File
          </button>
          <button
            className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
            onClick={handleAddApplicantClick}
          >
            <FiPlus className="w-4 h-4 mr-2" /> Add New Applicant
          </button>
        </div>
      </div>

      <div className="bg-teal-600/10 p-4 rounded-lg shadow-md mb-6 flex items-center gap-2">
        <div className="bg-white relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateFilterType}
            onChange={(e) => setDateFilterType(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthYearPicker
            dateFormat="MMMM yyyy"  // Now displays full month name
            className="border border-gray-300 p-2 rounded-md"
            placeholderText="Select Month"
          />
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '600px', overflowY: 'auto' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 text-gray-600 font-normal">
                Date Applied
                <button onClick={toggleSortOrder} className="ml-2 text-sm text-gray-600">
                  {sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th className="text-left py-2 px-4 text-gray-600 font-normal">Applicant Name</th>
              <th className="text-left py-2 px-4 text-gray-600 font-normal">Position Applied</th>
              <th className="text-left py-2 px-4 text-gray-600 font-normal">Application Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.id} className="border-b cursor-pointer hover:bg-gray-50" onClick={() => handleRowClick(applicant.id)}>
                <td className="py-4 px-4">{applicant.date}</td>
                <td className="py-4 px-4">{applicant.name}</td>
                <td className="py-4 px-4">{applicant.position}</td>
                <td className="py-4 px-4">
                  <select className="border border-gray-300 p-2 rounded-md w-52" defaultValue={applicant.status}>
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
