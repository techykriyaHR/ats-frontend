import { useState, useEffect } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Upload from "./Upload"; // Import the Upload component

export default function ApplicantList({
  onSelectApplicant,
  onAddApplicantClick,
}) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("month");
  const [sortOrder, setSortOrder] = useState("desc");
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/applicants");
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

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
    const applicant = applicants.find((applicant) => applicant.applicant_id === id);
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
      const applicantDate = new Date(applicant.date_created);
      if (dateFilterType === "month") {
        return (
          applicantDate.getMonth() === selectedDate.getMonth() &&
          applicantDate.getFullYear() === selectedDate.getFullYear()
        );
      } else if (dateFilterType === "year") {
        return applicantDate.getFullYear() === selectedDate.getFullYear();
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date_created);
      const dateB = new Date(b.date_created);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="relative p-6 max-w-[1200px] mx-auto bg-white rounded-3xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4 md:mb-0">Applicant List</h1>
        <div className="flex flex-col md:flex-row center gap-2">
          <Upload /> {/* Add the Upload component here */}
          <button
            className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
            onClick={onAddApplicantClick}
          >
            <FiPlus className="w-4 h-4 mr-2" /> Add New Applicant
          </button>
        </div>
      </div>

      <div className="bg-teal-600/10 p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-center gap-2">
        <div className="bg-white relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <select
            value={dateFilterType}
            onChange={(e) => setDateFilterType(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
          >
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthYearPicker={dateFilterType === "month"}
            showYearPicker={dateFilterType === "year"}
            dateFormat={dateFilterType === "month" ? "MM/yyyy" : "yyyy"}
            className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
            placeholderText="Select Date"
          />
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div
        className="bg-white p-4 rounded-lg shadow-md"
        style={{ height: "600px", overflowY: "auto" }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 text-gray-600 font-normal">
                Date Applied
                <button
                  onClick={toggleSortOrder}
                  className="ml-2 text-sm text-gray-600"
                >
                  {sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th className="text-left py-2 px-4 text-gray-600 font-normal">
                Applicant Name
              </th>
              <th className="text-left py-2 px-4 text-gray-600 font-normal">
                Position Applied
              </th>
              <th className="text-left py-2 px-4 text-gray-600 font-normal">
                Application Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr
                key={applicant.applicant_id}
                className="border-b cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(applicant.applicant_id)}
              >
                <td className="py-4 px-4">{new Date(applicant.date_created).toLocaleDateString()}</td>
                <td className="py-4 px-4">{`${applicant.first_name} ${applicant.middle_name} ${applicant.last_name}`}</td>
                <td className="py-4 px-4">{applicant.title}</td>
                <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                  <select
                    className="border border-gray-300 p-2 rounded-md w-full md:w-52"
                    defaultValue={applicant.status}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
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