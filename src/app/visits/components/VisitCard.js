// /app/visits/components/VisitCard.js
import Link from "next/link";
import VisitStatusBadge from "./VisitStatusBadge";

export default function VisitCard({ visit }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {visit.patient?.firstName} {visit.patient?.lastName}
        </div>
        <div className="text-sm text-gray-500">
          Pracownik: {visit.employee?.firstName} {visit.employee?.lastName}
        </div>
        <div className="text-sm text-gray-400">
          Data: {visit.date?.slice(0, 16).replace("T", " ")}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <VisitStatusBadge status={visit.status} />
        <Link
          href={`/visits/${visit._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
      </div>
    </li>
  );
}
