// /app/appointments/components/AppointmentList.js
import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return <div className="text-gray-500">Brak terminów do wyświetlenia.</div>;
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment._id} appointment={appointment} />
      ))}
    </ul>
  );
}
