// /services/notifications.js

export async function getNotifications(query = "") {
  const res = await fetch(
    `/api/notifications?search=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Nie udało się pobrać powiadomień");
  return res.json();
}

export async function getNotification(id) {
  const res = await fetch(`/api/notifications/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać powiadomienia");
  return res.json();
}

export async function markAsRead(id) {
  const res = await fetch(`/api/notifications/${id}/read`, { method: "POST" });
  if (!res.ok)
    throw new Error("Nie udało się oznaczyć powiadomienia jako przeczytane");
}
