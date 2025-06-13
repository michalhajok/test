"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => setPatient(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (!patient) return <div>Nie znaleziono pacjenta.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {patient.firstName} {patient.lastName}
      </h1>
      <div className="mb-2">
        PESEL: <span className="font-mono">{patient.pesel}</span>
      </div>
      <div className="mb-2">Email: {patient.email || "-"}</div>
      <div className="mb-2">Telefon: {patient.phone || "-"}</div>
      <div className="mb-2">Data urodzenia: {patient.birthDate || "-"}</div>
      <div className="mb-2">Płeć: {patient.gender || "-"}</div>
      <div className="mb-2">
        Zgoda na przetwarzanie danych: {patient.consentGiven ? "TAK" : "NIE"}
      </div>
      <div className="mb-2">Alergie: {patient.allergies || "-"}</div>
      <div className="mb-2">
        Choroby przewlekłe: {patient.chronicDiseases || "-"}
      </div>
      <div className="mb-2">
        Historia medyczna: {patient.medicalHistory || "-"}
      </div>
      {/* Możesz rozbudować o kolejne sekcje, np. wizyty, badania, dokumentację */}
    </div>
  );
}
