// /app/examinations/components/ExaminationCard.js
import Link from "next/link";
import ExaminationStatusBadge from "./ExaminationStatusBadge";

export default function ExaminationCard({ examination }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {examination.patient?.firstName} {examination.patient?.lastName}
        </div>
        <div className="text-sm text-gray-500">
          Wizyta:{" "}
          {examination.visit?.date?.slice(0, 16).replace("T", " ") || "-"}
        </div>
        <div className="text-sm text-gray-400">
          Pracownik: {examination.employee?.firstName}{" "}
          {examination.employee?.lastName}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ExaminationStatusBadge status={examination.status} />
        <Link
          href={`/examinations/${examination._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
      </div>
    </li>
  );
}
