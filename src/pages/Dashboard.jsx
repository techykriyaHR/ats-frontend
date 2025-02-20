import { useState } from "react";

import Header from "../components/Header";
import StatusCounter from "../components/StatusCounter";
import ATSHealthcheck from "../components/ATSHeathcheck";
import ApplicantList from "../components/ApplicantList";

export default function Dashboard() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <StatusCounter filter={filter} setFilter={setFilter} />
        <ATSHealthcheck />
      </div>
      <ApplicantList />
    </div>
  );
}
