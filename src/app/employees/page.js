"use client";

import { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ role: "", search: "" });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.role) params.append("role", filter.role);
    if (filter.search) params.append("search", filter.search);

    fetch(`/api/employees?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .finally(() => setLoading(false));
  }, [filter]);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pracownicy</h1>
        <a
          href="/employees/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Dodaj pracownika
        </a>
      </div>

      {/* Filtry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Szukaj po imieniu, nazwisku lub specjalizacji..."
          value={filter.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={filter.role}
          onChange={(e) => handleFilterChange("role", e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wszystkie role</option>
          <option value="admin">Administrator</option>
          <option value="employee">Pracownik</option>
          <option value="physio">Fizjoterapeuta</option>
        </select>
      </div>

      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <EmployeeList employees={employees} />
      )}
    </div>
  );
}
