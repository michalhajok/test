// /services/services.js

export async function getServices(query = "") {
  const res = await fetch(`/api/services?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Nie udało się pobrać usług");
  return res.json();
}

export async function getService(id) {
  const res = await fetch(`/api/services/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać usługi");
  return res.json();
}

export async function createService(data) {
  const res = await fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd dodawania usługi");
  return res.json();
}
