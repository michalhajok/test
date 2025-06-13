"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeForm from "../components/EmployeeForm";

export default function NewEmployeePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd dodawania pracownika");
      }
      router.push("/employees");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nowy pracownik</h1>
      <EmployeeForm onSubmit={handleSubmit} error={error} />
    </div>
  );
}
