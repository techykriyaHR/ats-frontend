import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFileExport } from "react-icons/fa";
import AddApplicantDropdown from "./AddApplicantDropdown";

export default function ApplicantList({
  onSelectApplicant,
  onAddApplicantClick,
}) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("month");
  const [sortOrder, setSortOrder] = useState("desc");

  const applicants = [
    {
      id: 1,
      date: "Jan 05, 2024",
      name: "Juniper Williams",
      position: "Software Engineer",
      status: "Sent Test",
      gender: "Female",
      birthdate: "February 25, 1998",
      email: "juniperwilliams123@gmail.com",
      phone: "(123)566-976-9834",
      address: "123 Main St",
      source: "Website",
      dateApplied: "January 17, 2024",
      referrer: "LinkedIn",
    },
    {
      id: 2,
      date: "Feb 10, 2024",
      name: "Macrow Mhaneej",
      position: "Data Analyst",
      status: "First Interview Stage",
      gender: "Male",
      birthdate: "March 15, 1990",
      email: "macrowmhaneej@gmail.com",
      phone: "(123)566-976-9834",
      address: "456 Elm St",
      source: "Referral",
      dateApplied: "February 12, 2024",
      referrer: "Employee",
    },
    {
      id: 3,
      date: "Mar 15, 2024",
      name: "Alice Johnson",
      position: "Product Manager",
      status: "Final Interview Stage",
      gender: "Female",
      birthdate: "April 20, 1985",
      email: "alicejohnson@gmail.com",
      phone: "(123)566-976-9834",
      address: "789 Oak St",
      source: "Job Board",
      dateApplied: "March 18, 2024",
      referrer: "Indeed",
    },
    {
      id: 4,
      date: "Apr 20, 2024",
      name: "Bob Smith",
      position: "UX Designer",
      status: "Job Offer Sent",
      gender: "Male",
      birthdate: "May 10, 1988",
      email: "bobsmith@gmail.com",
      phone: "(123)566-976-9834",
      address: "101 Pine St",
      source: "Website",
      dateApplied: "April 22, 2024",
      referrer: "Glassdoor",
    },
    {
      id: 5,
      date: "May 25, 2024",
      name: "Carol White",
      position: "Marketing Specialist",
      status: "Abandoned",
      gender: "Female",
      birthdate: "June 30, 1992",
      email: "carolwhite@gmail.com",
      phone: "(123)566-976-9834",
      address: "202 Maple St",
      source: "Referral",
      dateApplied: "May 27, 2024",
      referrer: "Employee",
    },
    {
      id: 6,
      date: "Jun 30, 2024",
      name: "David Brown",
      position: "Sales Manager",
      status: "Blacklisted",
      gender: "Male",
      birthdate: "July 25, 1980",
      email: "davidbrown@gmail.com",
      phone: "(123)566-976-9834",
      address: "303 Birch St",
      source: "Job Board",
      dateApplied: "July 2, 2024",
      referrer: "Monster",
    },
    {
      id: 7,
      date: "Jul 05, 2024",
      name: "Eve Davis",
      position: "HR Specialist",
      status: "No Show",
      gender: "Female",
      birthdate: "August 15, 1995",
      email: "evedavis@gmail.com",
      phone: "(123)566-976-9834",
      address: "404 Cedar St",
      source: "Website",
      dateApplied: "July 7, 2024",
      referrer: "LinkedIn",
    },
    {
      id: 8,
      date: "Aug 10, 2024",
      name: "Frank Green",
      position: "IT Support",
      status: "Not Fit",
      gender: "Male",
      birthdate: "September 10, 1983",
      email: "frankgreen@gmail.com",
      phone: "(123)566-976-9834",
      address: "505 Walnut St",
      source: "Referral",
      dateApplied: "August 12, 2024",
      referrer: "Employee",
    },
    {
      id: 9,
      date: "Sep 15, 2024",
      name: "Grace Lee",
      position: "Business Analyst",
      status: "Sent Test",
      gender: "Female",
      birthdate: "October 5, 1990",
      email: "gracelee@gmail.com",
      phone: "(123)566-976-9834",
      address: "606 Chestnut St",
      source: "Job Board",
      dateApplied: "September 17, 2024",
      referrer: "Indeed",
    },
    {
      id: 10,
      date: "Oct 20, 2024",
      name: "Henry King",
      position: "Operations Manager",
      status: "First Interview Stage",
      gender: "Male",
      birthdate: "November 20, 1987",
      email: "henryking@gmail.com",
      phone: "(123)566-976-9834",
      address: "707 Spruce St",
      source: "Website",
      dateApplied: "October 22, 2024",
      referrer: "Glassdoor",
    },
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
    <div className="relative mx-auto max-w-[1200px] rounded-3xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex flex-col items-center justify-between rounded-lg md:flex-row">
        <h1 className="mb-4 headline font-semibold md:mb-0">Applicant List</h1>
        <div className="center flex flex-col gap-2 md:flex-row">

          {/* <button className="flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700 cursor-pointer">
            <FaFileExport className="mr-2 h-4 w-4 " /> Export
          </button> */}

          {/* dropdown button for adding a new applicant (add manually or upload a file)*/}
          <AddApplicantDropdown onAddManually={onAddApplicantClick} />

        </div>
      </div>

      <div className="mb-6 flex flex-col items-center gap-2 rounded-lg bg-teal-600/10 p-4 shadow-md md:flex-row">
        <div className="relative mb-4 w-full bg-white md:mb-0 md:w-1/3">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-row">
          <select
            value={dateFilterType}
            onChange={(e) => setDateFilterType(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 md:w-auto"
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
            className="w-full rounded-md border border-gray-300 p-2 md:w-auto"
            placeholderText="Select Date"
          />
          <button
            className="w-full rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 md:w-auto"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div
        className="rounded-lg bg-white p-4 shadow-md"
        style={{ height: "600px", overflowY: "auto" }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-normal text-gray-600">
                Date Applied
                <button
                  onClick={toggleSortOrder}
                  className="ml-2 text-sm text-gray-600"
                >
                  {sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th className="px-4 py-2 text-left font-normal text-gray-600">
                Applicant Name
              </th>
              <th className="px-4 py-2 text-left font-normal text-gray-600">
                Position Applied
              </th>
              <th className="px-4 py-2 text-left font-normal text-gray-600">
                Application Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="cursor-pointer border-b hover:bg-gray-50"
                onClick={() => handleRowClick(applicant.id)}
              >
                <td className="px-4 py-4">{applicant.date}</td>
                <td className="px-4 py-4">{applicant.name}</td>
                <td className="px-4 py-4">{applicant.position}</td>
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <select
                    className="w-full rounded-md p-2 border border-gray-300 md:w-52"
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
