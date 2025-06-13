// /services/visits.js

export async function getVisits(query = "") {
  const res = await fetch(`/api/visits?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Nie udało się pobrać wizyt");
  return res.json();
}

export async function getVisit(id) {
  const res = await fetch(`/api/visits/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać wizyty");
  return res.json();
}

export async function createVisit(data) {
  const res = await fetch("/api/visits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd dodawania wizyty");
  return res.json();
}
