"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ExaminationForm from "../components/ExaminationForm";

export default function NewExaminationPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch("/api/examinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd dodawania badania");
      }
      router.push("/examinations");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nowe badanie</h1>
      <ExaminationForm onSubmit={handleSubmit} error={error} />
    </div>
  );
}
