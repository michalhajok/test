// /services/reports.js

export async function getReports() {
  const res = await fetch("/api/reports");
  if (!res.ok) throw new Error("Nie udało się pobrać raportów");
  return res.json();
}

export async function getReport(id) {
  const res = await fetch(`/api/reports/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać raportu");
  return res.json();
}

export async function generateReport(data) {
  const res = await fetch("/api/reports/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd generowania raportu");
  return res.json();
}
