"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NotificationTypeBadge from "../components/NotificationTypeBadge";

export default function NotificationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/notifications/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNotification(data);
        // Oznacz jako przeczytane jeśli nieprzeczytane
        if (data.status === "unread") {
          fetch(`/api/notifications/${id}/read`, { method: "POST" });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (!notification) return <div>Nie znaleziono powiadomienia.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        {notification.title || "Powiadomienie"}
        <NotificationTypeBadge type={notification.type} />
      </h1>
      <div className="mb-2">{notification.message}</div>
      <div className="mb-2 text-sm text-gray-500">
        Data: {notification.createdAt?.slice(0, 16).replace("T", " ")}
      </div>
      <div className="mb-2 text-sm text-gray-500">
        Status:{" "}
        {notification.status === "unread" ? "Nieprzeczytane" : "Przeczytane"}
      </div>
      <div className="mt-6">
        <a
          href="/notifications"
          className="bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Powrót do listy
        </a>
      </div>
    </div>
  );
}
