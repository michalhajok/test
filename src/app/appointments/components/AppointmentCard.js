// /app/appointments/components/AppointmentCard.js
import Link from "next/link";
import AppointmentStatusBadge from "./AppointmentStatusBadge";

export default function AppointmentCard({ appointment }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {appointment.patient?.firstName} {appointment.patient?.lastName}
        </div>
        <div className="text-sm text-gray-500">
          Pracownik: {appointment.employee?.firstName}{" "}
          {appointment.employee?.lastName}
        </div>
        <div className="text-sm text-gray-400">
          Data: {appointment.date?.slice(0, 16).replace("T", " ")}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <AppointmentStatusBadge status={appointment.status} />
        <Link
          href={`/appointments/${appointment._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
      </div>
    </li>
  );
}
