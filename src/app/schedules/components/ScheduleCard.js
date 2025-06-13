// /app/schedules/components/ScheduleCard.js
import Link from "next/link";

export default function ScheduleCard({ schedule }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {schedule.employee?.firstName} {schedule.employee?.lastName}
        </div>
        <div className="text-sm text-gray-500">
          Okres: {schedule.startDate?.slice(0, 10)} -{" "}
          {schedule.endDate?.slice(0, 10) || "bez końca"}
        </div>
        <div className="text-sm text-gray-400">
          Dni: {Object.keys(schedule.workingHours || {}).join(", ")}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={`/schedules/${schedule._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
        <Link
          href={`/schedules/${schedule._id}/edit`}
          className="bg-gray-200 text-gray-900 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Edytuj
        </Link>
      </div>
    </li>
  );
}
