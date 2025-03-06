import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFileExport } from "react-icons/fa";
import AddApplicantDropdown from "./AddApplicantDropdown";
import ApplicantTable from "./ApplicantTable";

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
      "applicant_id": "A21",
      "first_name": "Rachel",
      "middle_name": "Marie",
      "last_name": "Stewart",
      "date_created": "2025-03-07T04:15:22.000Z",
      "status": "BLACKLISTED",
      "title": "Graphic Designer"
    },
    {
      "applicant_id": "A22",
      "first_name": "Steve",
      "middle_name": null,
      "last_name": "Parker",
      "date_created": "2025-03-08T02:30:45.000Z",
      "status": "JOB_OFFER_ACCEPTED",
      "title": "Software Engineer"
    },
    {
      "applicant_id": "A23",
      "first_name": "Megan",
      "middle_name": "Louise",
      "last_name": "Collins",
      "date_created": "2025-03-06T06:22:10.000Z",
      "status": "TEST_SENT",
      "title": "Data Analyst"
    },
    {
      "applicant_id": "A24",
      "first_name": "David",
      "middle_name": "Robert",
      "last_name": "Hughes",
      "date_created": "2025-03-07T11:45:33.000Z",
      "status": "BLACKLISTED",
      "title": "Marketing Manager"
    },
    {
      "applicant_id": "A25",
      "first_name": "Sophia",
      "middle_name": null,
      "last_name": "Bennett",
      "date_created": "2025-03-06T14:11:29.000Z",
      "status": "FIRST_INTERVIEW",
      "title": "HR Specialist"
    },
    {
      "applicant_id": "A26",
      "first_name": "Daniel",
      "middle_name": "Ray",
      "last_name": "Evans",
      "date_created": "2025-03-09T17:20:50.000Z",
      "status": "BLACKLISTED",
      "title": "Product Manager"
    },
    {
      "applicant_id": "A27",
      "first_name": "Isabella",
      "middle_name": "Claire",
      "last_name": "Morris",
      "date_created": "2025-03-08T10:30:55.000Z",
      "status": "JOB_OFFER_ACCEPTED",
      "title": "Data Scientist"
    },
    {
      "applicant_id": "A28",
      "first_name": "Lucas",
      "middle_name": null,
      "last_name": "Hill",
      "date_created": "2025-03-07T03:50:14.000Z",
      "status": "TEST_SENT",
      "title": "Software Engineer"
    },
    {
      "applicant_id": "A29",
      "first_name": "Emma",
      "middle_name": "Rose",
      "last_name": "Scott",
      "date_created": "2025-03-06T08:14:40.000Z",
      "status": "FIRST_INTERVIEW",
      "title": "Content Strategist"
    },
    {
      "applicant_id": "A30",
      "first_name": "Henry",
      "middle_name": null,
      "last_name": "King",
      "date_created": "2025-03-06T19:45:00.000Z",
      "status": "JOB_OFFER_ACCEPTED",
      "title": "DevOps Engineer"
    },
    {
      "applicant_id": "A31",
      "first_name": "Olivia",
      "middle_name": "Grace",
      "last_name": "Green",
      "date_created": "2025-03-08T15:20:30.000Z",
      "status": "BLACKLISTED",
      "title": "SEO Specialist"
    },
    {
      "applicant_id": "A32",
      "first_name": "Noah",
      "middle_name": null,
      "last_name": "Baker",
      "date_created": "2025-03-06T23:59:59.000Z",
      "status": "TEST_SENT",
      "title": "Cybersecurity Analyst"
    },
    {
      "applicant_id": "A33",
      "first_name": "Ava",
      "middle_name": "Lynn",
      "last_name": "Walker",
      "date_created": "2025-03-06T16:35:22.000Z",
      "status": "FIRST_INTERVIEW",
      "title": "Customer Success Manager"
    },
    {
      "applicant_id": "A34",
      "first_name": "James",
      "middle_name": "Edward",
      "last_name": "Hall",
      "date_created": "2025-03-07T12:10:45.000Z",
      "status": "JOB_OFFER_ACCEPTED",
      "title": "Solutions Architect"
    },
    {
      "applicant_id": "A35",
      "first_name": "Chloe",
      "middle_name": null,
      "last_name": "Allen",
      "date_created": "2025-03-06T09:05:55.000Z",
      "status": "BLACKLISTED",
      "title": "UX Researcher"
    },
    {
      "applicant_id": "A36",
      "first_name": "Benjamin",
      "middle_name": "Joseph",
      "last_name": "Young",
      "date_created": "2025-03-07T18:00:10.000Z",
      "status": "TEST_SENT",
      "title": "QA Engineer"
    },
    {
      "applicant_id": "A37",
      "first_name": "Ella",
      "middle_name": "Sophia",
      "last_name": "Hernandez",
      "date_created": "2025-03-08T07:45:33.000Z",
      "status": "JOB_OFFER_ACCEPTED",
      "title": "Business Analyst"
    },
    {
      "applicant_id": "A38",
      "first_name": "William",
      "middle_name": null,
      "last_name": "Wright",
      "date_created": "2025-03-06T22:30:50.000Z",
      "status": "FIRST_INTERVIEW",
      "title": "Sales Executive"
    },
    {
      "applicant_id": "A39",
      "first_name": "Zoe",
      "middle_name": "Isabel",
      "last_name": "Lopez",
      "date_created": "2025-03-09T05:55:15.000Z",
      "status": "BLACKLISTED",
      "title": "Social Media Manager"
    },
    {
      "applicant_id": "A40",
      "first_name": "Jack",
      "middle_name": "Daniel",
      "last_name": "Adams",
      "date_created": "2025-03-22T13:10:20.000Z",
      "status": "JOB_OFFER_ACCEPTED",
      "title": "Network Administrator"
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
    const applicant = applicants.find((applicant) => applicant.applicant_id === id);
    onSelectApplicant(applicant.applicant_id);
  };

  // const handleRowClick = () => {
  //   console.log("Row clicked:");
  //   const applicant = applicants.find((applicant) => applicant.id === row.applicant_id);
  //   if (applicant) {
  //     onSelectApplicant(applicant);
  //     alert("Applicant selected: " + applicant.name);
  //   }
  // };


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

          {/* partial button for export */}
          <button className="flex items-center rounded-md bg-white border border-teal px-2 py-1 text-sm text-teal hover:bg-teal-700 cursor-pointer">
            <FaFileExport className="mr-2 h-4 w-4 " /> Export
          </button>

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
        <ApplicantTable
        // applicants={filteredApplicants}
        // handleRowClick={handleRowClick}
        // sortOrder={sortOrder}
        // toggleSortOrder={toggleSortOrder}
        />
        {/* <table className="w-full">
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
        </table> */}
      </div>
    </div>
  );
}
