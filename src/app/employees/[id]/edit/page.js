"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EmployeeForm from "../../components/EmployeeForm";

export default function EditEmployeePage() {
  const { id } = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form) => {
    setError(null);
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd aktualizacji pracownika");
      }
      router.push(`/employees/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (!employee) return <div>Nie znaleziono pracownika.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edytuj pracownika</h1>
      <EmployeeForm
        initialData={employee}
        onSubmit={handleSubmit}
        error={error}
        isEdit={true}
      />
    </div>
  );
}
