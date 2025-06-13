"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ScheduleForm from "../../components/ScheduleForm";

export default function EditSchedulePage() {
  const { id } = useParams();
  const router = useRouter();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/schedules/${id}`)
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch(`/api/schedules/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd aktualizacji harmonogramu");
      }
      router.push(`/schedules/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (!schedule) return <div>Nie znaleziono harmonogramu.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edytuj harmonogram</h1>
      <ScheduleForm
        initialData={schedule}
        onSubmit={handleSubmit}
        error={error}
        isEdit={true}
      />
    </div>
  );
}
