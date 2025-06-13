// utils/fetchWithAuth.js
import { useAuth } from "@/context/AuthContext";

export async function fetchWithAuth(url, options = {}, retry = true) {
  const { accessToken, refresh, logout } = useAuth();
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401 && retry) {
    await refresh();
    return fetchWithAuth(url, options, false);
  }
  if (res.status === 403) {
    logout();
    throw new Error("Brak uprawnień.");
  }
  return res.json();
}
