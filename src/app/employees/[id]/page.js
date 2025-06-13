"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ScheduleManager from "../components/ScheduleManager";

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (!employee) return <div>Nie znaleziono pracownika.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
            {employee.firstName?.charAt(0)}
            {employee.lastName?.charAt(0)}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-gray-500">{employee.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Informacje podstawowe</h3>
            <div className="space-y-2">
              <div>Email: {employee.email}</div>
              <div>Telefon: {employee.phone || "-"}</div>
              <div>Specjalizacja: {employee.specialization || "-"}</div>
              <div>
                Data zatrudnienia:{" "}
                {employee.hireDate
                  ? new Date(employee.hireDate).toLocaleDateString()
                  : "-"}
              </div>
              <div>Status: {employee.isActive ? "Aktywny" : "Nieaktywny"}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Uprawnienia</h3>
            <div className="space-y-1">
              {employee.permissions?.map((permission) => (
                <div
                  key={permission}
                  className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm"
                >
                  {permission}
                </div>
              )) || <div>Brak uprawnień</div>}
            </div>
          </div>
        </div>
      </div>

      <ScheduleManager employeeId={id} />
    </div>
  );
}
