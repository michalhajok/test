"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppointmentStatusBadge from "../components/AppointmentStatusBadge";

export default function AppointmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch(() => setError("Nie znaleziono terminu."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;
  if (!appointment) return <div>Nie znaleziono terminu.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Termin: {appointment.patient?.firstName} {appointment.patient?.lastName}
      </h1>
      <div className="mb-2 flex items-center gap-2">
        <AppointmentStatusBadge status={appointment.status} />
      </div>
      <div className="mb-2">
        Pracownik: {appointment.employee?.firstName}{" "}
        {appointment.employee?.lastName}
      </div>
      <div className="mb-2">
        Data: {appointment.date?.slice(0, 16).replace("T", " ")}
      </div>
      <div className="mb-2">Usługa: {appointment.service?.name || "-"}</div>
      <div className="mb-2">Notatki: {appointment.notes || "-"}</div>
      <div className="mb-2">
        Status płatności: {appointment.paymentStatus || "-"}
      </div>
      {/* Możesz rozbudować o powiązania z wizytą, pliki, historię zmian */}
      {appointment.status === "planned" && (
        <div className="mt-6 flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={async () => {
              await fetch(`/api/appointments/${id}/confirm`, {
                method: "POST",
              });
              router.refresh();
            }}
          >
            Potwierdź termin
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={async () => {
              await fetch(`/api/appointments/${id}/cancel`, { method: "POST" });
              router.push("/appointments");
            }}
          >
            Anuluj termin
          </button>
        </div>
      )}
    </div>
  );
}
