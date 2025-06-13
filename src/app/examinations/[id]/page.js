"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ExaminationStatusBadge from "../components/ExaminationStatusBadge";

export default function ExaminationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [examination, setExamination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/examinations/${id}`)
      .then((res) => res.json())
      .then((data) => setExamination(data))
      .catch(() => setError("Nie znaleziono badania."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;
  if (!examination) return <div>Nie znaleziono badania.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Badanie: {examination.patient?.firstName}{" "}
        {examination.patient?.lastName}
      </h1>
      <div className="mb-2 flex items-center gap-2">
        <ExaminationStatusBadge status={examination.status} />
      </div>
      <div className="mb-2">
        Wizyta: {examination.visit?.date?.slice(0, 16).replace("T", " ") || "-"}
      </div>
      <div className="mb-2">
        Pracownik: {examination.employee?.firstName}{" "}
        {examination.employee?.lastName}
      </div>
      <div className="mb-2">
        Data badania: {examination.date?.slice(0, 16).replace("T", " ")}
      </div>
      <div className="mb-2">
        Główna dolegliwość: {examination.mainComplaint || "-"}
      </div>
      <div className="mb-2">
        Skala bólu:{" "}
        {typeof examination.painLevel === "number"
          ? examination.painLevel
          : "-"}
      </div>
      <div className="mb-2">Diagnoza: {examination.diagnosis || "-"}</div>
      <div className="mb-2">Notatki: {examination.notes || "-"}</div>
      {/* Możesz rozbudować o workflow weryfikacji, historię zmian, pliki */}
      {examination.status === "completed" && (
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={async () => {
              await fetch(`/api/examinations/${id}/review`, { method: "POST" });
              router.refresh();
            }}
          >
            Zweryfikuj badanie
          </button>
        </div>
      )}
      <div className="mt-6">
        <a
          href={`/examinations/${id}/edit`}
          className="bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Edytuj badanie
        </a>
      </div>
    </div>
  );
}
