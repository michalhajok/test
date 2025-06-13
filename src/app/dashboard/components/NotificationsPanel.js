// /app/dashboard/components/NotificationsPanel.js
export default function NotificationsPanel({ notifications }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Powiadomienia</h2>
      {(!notifications || notifications.length === 0) && (
        <div className="text-gray-500">Brak powiadomień.</div>
      )}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {notifications &&
          notifications.map((n) => (
            <li key={n._id} className="py-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    n.status === "unread" ? "bg-primary" : "bg-gray-400"
                  }`}
                  aria-label={
                    n.status === "unread" ? "Nieprzeczytane" : "Przeczytane"
                  }
                />
                <span className="font-medium">
                  {n.title || "Powiadomienie"}
                </span>
              </div>
              <div className="text-sm text-gray-500">{n.message}</div>
              <div className="text-xs text-gray-400">
                {n.createdAt?.slice(0, 16).replace("T", " ")}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
