// /app/patients/components/PatientCard.js
import Link from "next/link";

export default function PatientCard({ patient }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {patient.firstName} {patient.lastName}
        </div>
        <div className="text-sm text-gray-500">
          PESEL:{" "}
          {patient.pesel
            ? patient.pesel.replace(/^(\d{2})(\d{2})(\d{2})/, "$1-$2-$3")
            : "-"}
        </div>
        <div className="text-sm text-gray-400">
          {patient.email || patient.phone || ""}
        </div>
      </div>
      <Link
        href={`/patients/${patient._id}`}
        className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
      >
        Szczegóły
      </Link>
    </li>
  );
}
