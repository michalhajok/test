// /app/employees/components/EmployeeCard.js
import Link from "next/link";

const roleLabels = {
  admin: "Administrator",
  employee: "Pracownik",
  physio: "Fizjoterapeuta",
};

export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
          {employee.firstName?.charAt(0)}
          {employee.lastName?.charAt(0)}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-gray-500">
            {roleLabels[employee.role] || employee.role}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>Email: {employee.email}</div>
        <div>Telefon: {employee.phone || "-"}</div>
        <div>Specjalizacja: {employee.specialization || "-"}</div>
        <div className="flex items-center">
          Status:
          <span
            className={`ml-2 px-2 py-1 rounded text-xs ${
              employee.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {employee.isActive ? "Aktywny" : "Nieaktywny"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/employees/${employee._id}`}
          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm transition"
        >
          Szczegóły
        </Link>
        <Link
          href={`/employees/${employee._id}/edit`}
          className="flex-1 text-center bg-primary text-white hover:bg-primary-dark px-3 py-2 rounded text-sm transition"
        >
          Edytuj
        </Link>
      </div>
    </div>
  );
}
