// /app/employees/components/ScheduleManager.js
import { useState, useEffect } from "react";

export default function ScheduleManager({ employeeId }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/schedules?employee=${employeeId}`)
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .finally(() => setLoading(false));
  }, [employeeId]);

  if (loading) return <div>Ładowanie harmonogramu...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
      <h3 className="font-semibold mb-4">Harmonogram pracy</h3>
      {!schedule ? (
        <div className="text-gray-500">Brak zdefiniowanego harmonogramu.</div>
      ) : (
        <div className="space-y-2">
          {Object.entries(schedule.workingHours || {}).map(([day, hours]) => (
            <div key={day} className="flex justify-between">
              <span className="capitalize">{day}:</span>
              <span>
                {hours.start} - {hours.end}
              </span>
            </div>
          ))}
        </div>
      )}
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">
        Edytuj harmonogram
      </button>
    </div>
  );
}
