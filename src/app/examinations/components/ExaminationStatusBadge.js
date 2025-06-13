// /app/examinations/components/ExaminationStatusBadge.js
const statusLabels = {
  draft: "Szkic",
  "in-progress": "W trakcie",
  completed: "Zakończone",
  reviewed: "Zweryfikowane",
};

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  reviewed: "bg-blue-100 text-blue-800",
};

export default function ExaminationStatusBadge({ status }) {
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
