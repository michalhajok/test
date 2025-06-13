"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VisitStatusBadge from "../components/VisitStatusBadge";

export default function VisitDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/visits/${id}`)
      .then((res) => res.json())
      .then((data) => setVisit(data))
      .catch(() => setError("Nie znaleziono wizyty."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;
  if (!visit) return <div>Nie znaleziono wizyty.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Wizyta: {visit.patient?.firstName} {visit.patient?.lastName}
      </h1>
      <div className="mb-2 flex items-center gap-2">
        <VisitStatusBadge status={visit.status} />
      </div>
      <div className="mb-2">
        Pracownik: {visit.employee?.firstName} {visit.employee?.lastName}
      </div>
      <div className="mb-2">
        Data: {visit.date?.slice(0, 16).replace("T", " ")}
      </div>
      <div className="mb-2">Usługa: {visit.service?.name || "-"}</div>
      <div className="mb-2">Notatki: {visit.notes || "-"}</div>
      <div className="mb-2">
        Cena: {visit.price ? `${visit.price} zł` : "-"}
      </div>
      <div className="mb-2">
        Czas trwania: {visit.duration ? `${visit.duration} min` : "-"}
      </div>
      <div className="mb-2">Status płatności: {visit.paymentStatus || "-"}</div>
      {/* Możesz rozbudować o badania, pliki, historię zmian */}
      {visit.status === "planned" && (
        <div className="mt-6 flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={async () => {
              await fetch(`/api/visits/${id}/start`, { method: "POST" });
              router.refresh();
            }}
          >
            Rozpocznij wizytę
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={async () => {
              await fetch(`/api/visits/${id}/cancel`, { method: "POST" });
              router.push("/visits");
            }}
          >
            Anuluj wizytę
          </button>
        </div>
      )}
      {visit.status === "in-progress" && (
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={async () => {
              await fetch(`/api/visits/${id}/complete`, { method: "POST" });
              router.refresh();
            }}
          >
            Zakończ wizytę
          </button>
        </div>
      )}
    </div>
  );
}
