// /app/admin/components/LogList.js
import { useState } from "react";

const typeLabels = {
  audit: "Audit",
  security: "Bezpieczeństwo",
  error: "Błąd",
  info: "Informacja",
};

const typeColors = {
  audit: "bg-blue-100 text-blue-800",
  security: "bg-red-100 text-red-800",
  error: "bg-orange-100 text-orange-800",
  info: "bg-gray-100 text-gray-800",
};

export default function LogList({ logs }) {
  const [filter, setFilter] = useState("");

  const filteredLogs = filter
    ? logs.filter((log) => log.type === filter)
    : logs;

  return (
    <div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wszystkie typy</option>
          <option value="audit">Audit</option>
          <option value="security">Bezpieczeństwo</option>
          <option value="error">Błąd</option>
          <option value="info">Informacja</option>
        </select>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredLogs.length === 0 && (
          <li className="text-gray-500">Brak logów do wyświetlenia.</li>
        )}
        {filteredLogs.map((log) => (
          <li key={log._id} className="py-3 flex gap-4 items-center">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                typeColors[log.type] || "bg-gray-100 text-gray-800"
              }`}
            >
              {typeLabels[log.type] || log.type}
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {log.message}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {log.timestamp?.slice(0, 16).replace("T", " ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
