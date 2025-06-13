"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ServiceForm from "../../components/ServiceForm";

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd aktualizacji usługi");
      }
      router.push(`/services/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (!service) return <div>Nie znaleziono usługi.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edytuj usługę</h1>
      <ServiceForm
        initialData={service}
        onSubmit={handleSubmit}
        error={error}
        isEdit={true}
      />
    </div>
  );
}
