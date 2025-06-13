"use client";

import { useEffect, useState } from "react";
import ServiceList from "./components/ServiceList";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: "", search: "" });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.category) params.append("category", filter.category);
    if (filter.search) params.append("search", filter.search);

    fetch(`/api/services?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .finally(() => setLoading(false));
  }, [filter]);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usługi</h1>
        <a
          href="/services/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Dodaj usługę
        </a>
      </div>
      {/* Filtry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Szukaj po nazwie, kategorii..."
          value={filter.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          placeholder="Filtruj po kategorii..."
          value={filter.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {loading ? <div>Ładowanie...</div> : <ServiceList services={services} />}
    </div>
  );
}
