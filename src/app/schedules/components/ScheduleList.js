// /app/schedules/components/ScheduleList.js
import ScheduleCard from "./ScheduleCard";

export default function ScheduleList({ schedules }) {
  if (!schedules || schedules.length === 0) {
    return (
      <div className="text-gray-500">Brak harmonogramów do wyświetlenia.</div>
    );
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {schedules.map((schedule) => (
        <ScheduleCard key={schedule._id} schedule={schedule} />
      ))}
    </ul>
  );
}
