// /app/notifications/components/NotificationList.js
import NotificationCard from "./NotificationCard";

export default function NotificationList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-gray-500">Brak powiadomień do wyświetlenia.</div>
    );
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {notifications.map((notification) => (
        <NotificationCard key={notification._id} notification={notification} />
      ))}
    </ul>
  );
}
