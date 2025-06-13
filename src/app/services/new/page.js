"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceForm from "../components/ServiceForm";

export default function NewServicePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd dodawania usługi");
      }
      router.push("/services");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nowa usługa</h1>
      <ServiceForm onSubmit={handleSubmit} error={error} />
    </div>
  );
}
