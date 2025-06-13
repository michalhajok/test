// /services/schedules.js

export async function getSchedules(query = "") {
  const res = await fetch(`/api/schedules?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Nie udało się pobrać harmonogramów");
  return res.json();
}

export async function getSchedule(id) {
  const res = await fetch(`/api/schedules/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać harmonogramu");
  return res.json();
}

export async function createSchedule(data) {
  const res = await fetch("/api/schedules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error(
      (await res.json()).message || "Błąd dodawania harmonogramu"
    );
  return res.json();
}
