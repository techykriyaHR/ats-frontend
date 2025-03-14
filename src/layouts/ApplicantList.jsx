import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFileExport } from "react-icons/fa";
import AddApplicantDropdown from "../components/AddApplicantDropdown";
import ApplicantTable from "../components/ApplicantTable";

import exportToExcel from "../utils/exportToExcel";
import exportToPdf from "../utils/exportToPdf";
import moment from "moment";

export default function ApplicantList({
  onSelectApplicant,
  onAddApplicantClick,
}) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("month");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const applicants = [
    // Your applicant data here
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRowClick = (id) => {
    const applicant = applicants.find((applicant) => applicant.applicant_id === id);
    onSelectApplicant(applicant);
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
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="relative mx-auto max-w-[1200px] rounded-3xl bg-white p-6 border border-gray-light">
      <div className="mb-4 flex items-center justify-between rounded-lg ">
        <h1 className="headline text-gray-dark font-semibold md:mb-0">Applicant List</h1>
        <div className="center flex gap-2">
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button className="flex items-center rounded-md bg-white border border-teal px-2 py-1 text-sm text-teal hover:bg-teal-700 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}>
              <FaFileExport className="mr-2 h-4 w-4 " /> Export
            </button>

            {isOpen && (
              <div className="absolute w-20 sm:w-full mt-1 bg-white border border-gray-200 rounded-lg z-10">
                <button
                  className="block text-center text-sm px-2 py-2 text-gray-dark hover:bg-gray-100"
                  onClick={() => {
                    let exportValue = "";
                  
                    if (dateFilterType === "year" && selectedDate) {
                      exportValue = selectedDate.getFullYear().toString();
                    } else if (dateFilterType === "month" && selectedDate) {
                      exportValue = moment(selectedDate).format("MMMM").toLowerCase();
                    }
                  
                    exportToExcel(dateFilterType, exportValue, 'Business Operations Associate', ["NONE", "TEST_SENT"]);
                  }}
                  
                >
                  Excel
                </button>

                <button
                  className="block text-center text-sm px-2 py-2 text-gray-dark hover:bg-gray-100"
                >
                  PDF
                </button>
              </div>
            )}
          </div>

          {/* dropdown button for adding a new applicant (add manually or upload a file)*/}
          <AddApplicantDropdown className="" onAddManually={onAddApplicantClick} />
        </div>
      </div>

      <div className="mb-4 flex flex-col items-center gap-2 rounded-lg bg-teal-600/10 p-2 md:flex-row">
        <div className="flex-initial w-full bg-white md:mb-0 md:w-1/3">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full body-regular rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto md:flex-row justify-end">
          <select
            value={dateFilterType}
            onChange={(e) => setDateFilterType(e.target.value)}
            className="flex body-regular rounded-md border border-gray-300 p-2 w-auto"
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
            className="flex-auto body-regular rounded-md border border-gray-300 p-2 w-20"
            placeholderText={`${dateFilterType === "month" ? "MM/yyyy" : "yyyy"
              }`}
          />
          <button
            className="flex w-auto body-regular rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
            onClick={clearFilter}
          >
            Clear
          </button>
        </div>

      </div>

      <div
        className="rounded-lg bg-white"
        style={{ height: "", overflowY: "auto" }}
      >
        <ApplicantTable onSelectApplicant={onSelectApplicant} />
      </div>
    </div>
  );
}