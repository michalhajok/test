// /services/examinations.js

export async function getExaminations(query = "") {
  const res = await fetch(
    `/api/examinations?search=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Nie udało się pobrać badań");
  return res.json();
}

export async function getExamination(id) {
  const res = await fetch(`/api/examinations/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać badania");
  return res.json();
}

export async function createExamination(data) {
  const res = await fetch("/api/examinations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd dodawania badania");
  return res.json();
}
