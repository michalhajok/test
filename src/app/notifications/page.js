"use client";

import { useEffect, useState } from "react";
import NotificationList from "./components/NotificationList";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", type: "" });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.status) params.append("status", filter.status);
    if (filter.type) params.append("type", filter.type);

    fetch(`/api/notifications?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .finally(() => setLoading(false));
  }, [filter]);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Powiadomienia</h1>
      {/* Filtry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          value={filter.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wszystkie statusy</option>
          <option value="unread">Nieprzeczytane</option>
          <option value="read">Przeczytane</option>
        </select>
        <select
          value={filter.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wszystkie typy</option>
          <option value="appointment-reminder">Przypomnienie o wizycie</option>
          <option value="appointment-confirmation">Potwierdzenie wizyty</option>
          <option value="welcome">Powitanie</option>
          <option value="password-reset">Reset hasła</option>
          <option value="custom">Inne</option>
        </select>
      </div>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </div>
  );
}
