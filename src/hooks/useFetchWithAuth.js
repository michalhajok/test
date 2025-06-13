import { useAuth } from "./useAuth";

export function useFetchWithAuth() {
  const { accessToken, refresh, logout } = useAuth();

  return async (url, options = {}, retry = true) => {
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
      return useFetchWithAuth()(url, options, false);
    }
    if (res.status === 403) {
      logout();
      throw new Error("Brak uprawnień.");
    }
    return res.json();
  };
}
