// /app/notifications/components/NotificationTypeBadge.js
const typeLabels = {
  "appointment-reminder": "Przypomnienie o wizycie",
  "appointment-confirmation": "Potwierdzenie wizyty",
  welcome: "Powitanie",
  "password-reset": "Reset hasła",
  custom: "Inne",
};

const typeColors = {
  "appointment-reminder": "bg-yellow-100 text-yellow-800",
  "appointment-confirmation": "bg-green-100 text-green-800",
  welcome: "bg-blue-100 text-blue-800",
  "password-reset": "bg-red-100 text-red-800",
  custom: "bg-gray-100 text-gray-800",
};

export default function NotificationTypeBadge({ type }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${
        typeColors[type] || "bg-gray-100 text-gray-800"
      }`}
    >
      {typeLabels[type] || type}
    </span>
  );
}
