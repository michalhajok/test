"use client";

import { useEffect, useState } from "react";
import SettingsForm from "../components/SettingsForm";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ustawienia kliniki</h1>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <SettingsForm initialData={settings} />
      )}
    </div>
  );
}
