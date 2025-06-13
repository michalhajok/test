"use client";

import { useEffect, useState } from "react";
import ReportList from "./components/ReportList";
import ReportGenerator from "./components/ReportGenerator";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then(setReports)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Raporty</h1>
      <ReportGenerator />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Wygenerowane raporty</h2>
        {loading ? <div>Ładowanie...</div> : <ReportList reports={reports} />}
      </div>
    </div>
  );
}
