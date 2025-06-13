"use client";

import { useEffect, useState } from "react";
import StatsCards from "./components/StatsCards";
import RecentVisits from "./components/RecentVisits";
import NotificationsPanel from "./components/NotificationsPanel";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentVisits, setRecentVisits] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [statsRes, visitsRes, notifRes] = await Promise.all([
          fetch("/api/reports/summary"),
          fetch("/api/visits?limit=5&sort=-date"),
          fetch("/api/notifications?limit=5"),
        ]);
        setStats(await statsRes.json());
        setRecentVisits(await visitsRes.json());
        setNotifications(await notifRes.json());
      } catch (e) {
        // obsługa błędów
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Ładowanie...</div>;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Panel główny
      </h1>
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentVisits visits={recentVisits} />
        <NotificationsPanel notifications={notifications} />
      </div>
    </div>
  );
}
