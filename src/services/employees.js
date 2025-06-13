// /services/employees.js

export async function getEmployees(query = "") {
  const res = await fetch(`/api/employees?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Nie udało się pobrać pracowników");
  return res.json();
}

export async function getEmployee(id) {
  const res = await fetch(`/api/employees/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać pracownika");
  return res.json();
}

export async function createEmployee(data) {
  const res = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd dodawania pracownika");
  return res.json();
}
