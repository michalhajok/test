// /app/admin/components/UserCard.js
import Link from "next/link";

const roleLabels = {
  admin: "Administrator",
  employee: "Pracownik",
  physio: "Fizjoterapeuta",
};

export default function UserCard({ user }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-sm text-gray-500">{user.email}</div>
        <div className="text-sm text-gray-400">
          {roleLabels[user.role] || user.role}
        </div>
        <div className="text-xs mt-1">
          Status:{" "}
          <span
            className={`px-2 py-1 rounded text-xs ${
              user.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {user.isActive ? "Aktywny" : "Nieaktywny"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/users/${user._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
        <Link
          href={`/admin/users/${user._id}/edit`}
          className="bg-gray-200 text-gray-900 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Edytuj
        </Link>
      </div>
    </li>
  );
}
