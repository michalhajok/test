// /app/appointments/components/AppointmentStatusBadge.js
const statusLabels = {
  planned: "Zaplanowany",
  confirmed: "Potwierdzony",
  completed: "Zrealizowany",
  cancelled: "Anulowany",
};

const statusColors = {
  planned: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AppointmentStatusBadge({ status }) {
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
