// /app/admin/components/RoleCard.js
import Link from "next/link";

export default function RoleCard({ role }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {role.displayName || role.name}
        </div>
        <div className="text-sm text-gray-500">{role.name}</div>
        <div className="text-xs text-gray-400">
          Uprawnienia: {role.permissions?.length || 0}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/roles/${role._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
        <Link
          href={`/admin/roles/${role._id}/edit`}
          className="bg-gray-200 text-gray-900 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Edytuj
        </Link>
      </div>
    </li>
  );
}
