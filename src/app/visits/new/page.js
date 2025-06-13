"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VisitForm from "../components/VisitForm";

export default function NewVisitPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd dodawania wizyty");
      }
      router.push("/visits");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nowa wizyta</h1>
      <VisitForm onSubmit={handleSubmit} error={error} />
    </div>
  );
}
