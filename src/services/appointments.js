// /services/appointments.js

export async function getAppointments(query = "") {
  const res = await fetch(
    `/api/appointments?search=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Nie udało się pobrać terminów");
  return res.json();
}

export async function getAppointment(id) {
  const res = await fetch(`/api/appointments/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać terminu");
  return res.json();
}

export async function createAppointment(data) {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd dodawania terminu");
  return res.json();
}
