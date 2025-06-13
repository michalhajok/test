// /app/visits/components/VisitStatusBadge.js
const statusLabels = {
  planned: "Zaplanowana",
  "in-progress": "W trakcie",
  completed: "Zakończona",
  cancelled: "Anulowana",
};

const statusColors = {
  planned: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function VisitStatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${
        statusColors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
