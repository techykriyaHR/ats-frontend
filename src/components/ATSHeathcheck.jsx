import { format, differenceInDays } from "date-fns";
import { useState } from "react";


const days = [
  { id: 1, day: 3 },
  { id: 2, day: 6 },
  { id: 3, day: 9 },
  { id: 4, day: 12 },
  { id: 5, day: 15 },
  { id: 6, day: 30 },
]

const applicants = [
  {
    id: 1,
    name: "user1",
    updated_at: new Date("2025-01-20"),
    position_applied: "GIS Analyst",
  },
  {
    id: 2,
    name: "user2",
    updated_at: new Date("2025-02-21"),
    position_applied: "GIS Analyst",
  },
  {
    id: 3,
    name: "user3",
    updated_at: new Date("2025-01-22"),
    position_applied: "Data Scientist",
  },
  {
    id: 4,
    name: "user4",
    updated_at: new Date("2025-01-23"),
    position_applied: "Software Engineer",
  },
  {
    id: 5,
    name: "user5",
    updated_at: new Date("2025-01-24"),
    position_applied: "Backend Developer",
  },
  {
    id: 6,
    name: "user6",
    updated_at: new Date("2025-01-25"),
    position_applied: "Frontend Developer",
  },
  {
    id: 7,
    name: "user7",
    updated_at: new Date("2025-01-26"),
    position_applied: "GIS Analyst",
  },
  {
    id: 8,
    name: "user8",
    updated_at: new Date("2025-02-13"),
    position_applied: "Full-Stack Developer",
  },
  {
    id: 9,
    name: "user9",
    updated_at: new Date("2025-02-15"),
    position_applied: "Project Manager",
  },
  {
    id: 10,
    name: "user10",
    updated_at: new Date("2025-01-29"),
    position_applied: "GIS Technician",
  },
  {
    id: 11,
    name: "user11",
    updated_at: new Date("2025-01-30"),
    position_applied: "DevOps Engineer",
  },
  {
    id: 12,
    name: "user12",
    updated_at: new Date("2025-01-31"),
    position_applied: "Database Administrator",
  },
  {
    id: 13,
    name: "user13",
    updated_at: new Date("2025-02-01"),
    position_applied: "Network Engineer",
  },
  {
    id: 14,
    name: "user14",
    updated_at: new Date("2025-02-02"),
    position_applied: "GIS Developer",
  },
  {
    id: 15,
    name: "user15",
    updated_at: new Date("2025-02-03"),
    position_applied: "QA Engineer",
  },
];

function UserCard({ applicant, daySelected }) {
  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const dateUpdated = new Date(applicant.updated_at)
  const daysElapsed = differenceInDays(currentDate, dateUpdated)

  if (daysElapsed >= daySelected) {
    return (
      <div className="flex justify-between rounded-md border-1 p-2">
        <div>
          <p className="text-sm font-semibold">{applicant.name}</p>
          <p className="text-xs text-gray-500">{applicant.position_applied}</p>
        </div>

        <div className="flex">
          <p className="text-xs">Last Updated {daysElapsed} days ago | </p>
          <p className="text-xs text-green-700">Reply</p>
        </div>
      </div>
    );
  }
  return null;
}


function ATSHealthcheck() {
  const [daySelected, setDaySelected] = useState(3);

  return (
    <div className="h-96 w-full flex flex-col p-4 bg-white rounded-md">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">ATS Healthcheck</h2>
        <div>
          <select className="bg-gray-200 rounded-md px-5" onChange={(e) => setDaySelected(e.target.value)}>
            {days.map((day) => {
              return (
                <option value={day.day} key={day.id}>{day.day}</option>
              )
            })}
          </select>
        </div>
      </div>

      <div className="flex flex-col overflow-y-auto min-h-0 space-y-2 mt-4">
        {applicants.map((applicant) => (
          <UserCard applicant={applicant} key={applicant.id} daySelected={daySelected} />
        ))}
      </div>
    </div>
  );
}

export default ATSHealthcheck;

