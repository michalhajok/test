"use client";

import { useEffect, useState } from "react";
import AdminStats from "./components/AdminStats";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel administracyjny</h1>
      <AdminStats stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <a
          href="/admin/users"
          className="block bg-white dark:bg-gray-800 rounded shadow p-6 hover:bg-primary/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Użytkownicy</h2>
          <p className="text-gray-500">
            Zarządzaj kontami użytkowników, uprawnieniami i statusem kont.
          </p>
        </a>
        <a
          href="/admin/roles"
          className="block bg-white dark:bg-gray-800 rounded shadow p-6 hover:bg-primary/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Role i uprawnienia</h2>
          <p className="text-gray-500">
            Definiuj role, uprawnienia oraz zarządzaj dostępem do systemu.
          </p>
        </a>
        <a
          href="/admin/settings"
          className="block bg-white dark:bg-gray-800 rounded shadow p-6 hover:bg-primary/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Ustawienia kliniki</h2>
          <p className="text-gray-500">
            Konfiguruj dane kliniki, powiadomienia, RODO i inne opcje.
          </p>
        </a>
        <a
          href="/admin/logs"
          className="block bg-white dark:bg-gray-800 rounded shadow p-6 hover:bg-primary/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Logi systemowe</h2>
          <p className="text-gray-500">
            Przeglądaj logi bezpieczeństwa, audytu i zdarzeń systemowych.
          </p>
        </a>
      </div>
    </div>
  );
}
