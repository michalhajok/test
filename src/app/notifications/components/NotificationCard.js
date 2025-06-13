// /app/notifications/components/NotificationCard.js
import Link from "next/link";
import NotificationTypeBadge from "./NotificationTypeBadge";

export default function NotificationCard({ notification }) {
  return (
    <li
      className={`py-4 flex justify-between items-center ${
        notification.status === "unread" ? "bg-blue-50 dark:bg-blue-950" : ""
      }`}
    >
      <div>
        <div className="font-medium text-lg flex items-center gap-2">
          {notification.title || "Powiadomienie"}
          <NotificationTypeBadge type={notification.type} />
        </div>
        <div className="text-sm text-gray-500">{notification.message}</div>
        <div className="text-xs text-gray-400">
          {notification.createdAt?.slice(0, 16).replace("T", " ")}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            notification.status === "unread" ? "bg-primary" : "bg-gray-400"
          }`}
        />
        <Link
          href={`/notifications/${notification._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
      </div>
    </li>
  );
}
