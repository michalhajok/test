"use client";

import { useEffect, useState } from "react";
import ExaminationList from "./components/ExaminationList";

export default function ExaminationsPage() {
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", search: "" });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.status) params.append("status", filter.status);
    if (filter.search) params.append("search", filter.search);

    fetch(`/api/examinations?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setExaminations(data))
      .finally(() => setLoading(false));
  }, [filter]);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Badania</h1>
        <a
          href="/examinations/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Dodaj badanie
        </a>
      </div>
      {/* Filtry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Szukaj po pacjencie, pracowniku, wizycie..."
          value={filter.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={filter.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wszystkie statusy</option>
          <option value="draft">Szkic</option>
          <option value="in-progress">W trakcie</option>
          <option value="completed">Zakończone</option>
          <option value="reviewed">Zweryfikowane</option>
        </select>
      </div>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <ExaminationList examinations={examinations} />
      )}
    </div>
  );
}
