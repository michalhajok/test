"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReportDetailsPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/reports/${id}`)
      .then((res) => res.json())
      .then(setReport)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (!report) return <div>Nie znaleziono raportu.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Raport: {report.type}</h1>
      <div className="mb-2">
        Utworzony: {report.createdAt?.slice(0, 16).replace("T", " ")}
      </div>
      {report.employee && (
        <div className="mb-2">
          Pracownik: {report.employee.firstName} {report.employee.lastName}
        </div>
      )}
      {(report.dateFrom || report.dateTo) && (
        <div className="mb-2">
          Zakres: {report.dateFrom?.slice(0, 10)} -{" "}
          {report.dateTo?.slice(0, 10)}
        </div>
      )}
      <div className="mt-6">
        <a
          href={report.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Pobierz PDF
        </a>
      </div>
      <div className="mt-8">
        <iframe
          src={report.pdfUrl}
          title="Podgląd PDF"
          width="100%"
          height="600px"
          className="border rounded"
        />
      </div>
    </div>
  );
}
