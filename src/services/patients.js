// /services/patients.js

export async function getPatients(query = "") {
  const res = await fetch(`/api/patients?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Nie udało się pobrać pacjentów");
  return res.json();
}

export async function getPatient(id) {
  const res = await fetch(`/api/patients/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać pacjenta");
  return res.json();
}

export async function createPatient(data) {
  const res = await fetch("/api/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd dodawania pacjenta");
  return res.json();
}
