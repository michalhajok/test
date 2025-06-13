// /services/settings.js

export async function getUserSettings() {
  const res = await fetch("/api/user/profile");
  if (!res.ok) throw new Error("Nie udało się pobrać ustawień użytkownika");
  return res.json();
}

export async function updateUserSettings(data) {
  const res = await fetch("/api/user/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error(
      (await res.json()).message || "Błąd aktualizacji ustawień użytkownika"
    );
  return res.json();
}

export async function changePassword(currentPassword, newPassword) {
  const res = await fetch("/api/user/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Błąd zmiany hasła");
  return res.json();
}
