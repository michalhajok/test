"use client";

import { useEffect, useState } from "react";
import LogList from "../components/LogList";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then((res) => res.json())
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Logi systemowe</h1>
      {loading ? <div>Ładowanie...</div> : <LogList logs={logs} />}
    </div>
  );
}
