"use client";

import { useEffect, useState } from "react";
import PatientList from "./components/PatientList";

export default function PatientsPage() {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/patients?search=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pacjenci</h1>
        <a
          href="/patients/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Dodaj pacjenta
        </a>
      </div>
      <input
        type="text"
        placeholder="Szukaj po imieniu, nazwisku lub PESEL..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {loading ? <div>Ładowanie...</div> : <PatientList patients={patients} />}
    </div>
  );
}
