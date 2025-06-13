"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (!service) return <div>Nie znaleziono usługi.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{service.name}</h1>
      <div className="mb-2">Kategoria: {service.category || "-"}</div>
      <div className="mb-2">Opis: {service.description || "-"}</div>
      <div className="mb-2">Czas trwania: {service.duration} min</div>
      <div className="mb-2">Cena: {service.price} zł</div>
      <div className="mb-2">Waluta: {service.currency || "PLN"}</div>
      <div className="mb-2">Wymagania: {service.requirements || "-"}</div>
      <div className="mb-2">Procedury: {service.procedures || "-"}</div>
      <div className="mb-2">Kod CPT: {service.cptCode || "-"}</div>
      <div className="mb-2">Kod ICD-10: {service.icd10Code || "-"}</div>
      <div className="mt-6">
        <a
          href={`/services/${service._id}/edit`}
          className="bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Edytuj usługę
        </a>
      </div>
    </div>
  );
}
