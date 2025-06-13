"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ExaminationForm from "../../components/ExaminationForm";

export default function EditExaminationPage() {
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
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch(`/api/examinations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd aktualizacji badania");
      }
      router.push(`/examinations/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (!examination) return <div>Nie znaleziono badania.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edytuj badanie</h1>
      <ExaminationForm
        initialData={examination}
        onSubmit={handleSubmit}
        error={error}
        isEdit={true}
      />
    </div>
  );
}
