"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ScheduleDetailsPage() {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/schedules/${id}`)
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (!schedule) return <div>Nie znaleziono harmonogramu.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Harmonogram: {schedule.employee?.firstName}{" "}
        {schedule.employee?.lastName}
      </h1>
      <div className="mb-2">
        Okres: {schedule.startDate?.slice(0, 10)} -{" "}
        {schedule.endDate?.slice(0, 10) || "bez końca"}
      </div>
      <div className="mb-2">Opis: {schedule.description || "-"}</div>
      <div className="mb-2 font-semibold">Godziny pracy:</div>
      <ul className="mb-2">
        {Object.entries(schedule.workingHours || {}).map(([day, hours]) => (
          <li key={day} className="flex justify-between">
            <span className="capitalize">{day}:</span>
            <span>
              {hours.start} - {hours.end}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href={`/schedules/${schedule._id}/edit`}
          className="bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Edytuj harmonogram
        </a>
      </div>
    </div>
  );
}
