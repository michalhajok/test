"use client";

import { useEffect, useState } from "react";
import ScheduleList from "./components/ScheduleList";

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ employee: "", search: "" });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.employee) params.append("employee", filter.employee);
    if (filter.search) params.append("search", filter.search);

    fetch(`/api/schedules?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .finally(() => setLoading(false));
  }, [filter]);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Harmonogramy pracy</h1>
        <a
          href="/schedules/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Dodaj harmonogram
        </a>
      </div>
      {/* Filtry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Szukaj po pracowniku..."
          value={filter.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {/* Możesz dodać select z pracownikami */}
      </div>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <ScheduleList schedules={schedules} />
      )}
    </div>
  );
}
