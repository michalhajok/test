// /services/auth.js

const API_TIMEOUT = 10000; // 10 sekund timeout
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Szczegółowa obsługa błędów
 */
function handleAuthError(error, operation) {
  // Log błędu do systemu monitoringu
  console.error(`Authentication error during ${operation}:`, error);

  // Kategorizacja błędów
  if (error.name === "AbortError") {
    return {
      code: "timeout",
      message: "Przekroczono czas oczekiwania na odpowiedź",
    };
  } else if (error.response) {
    switch (error.response.status) {
      case 400:
        return { code: "validation", message: "Nieprawidłowe dane logowania" };
      case 401:
        return { code: "unauthorized", message: "Brak autoryzacji" };
      case 403:
        return {
          code: "forbidden",
          message: "Brak uprawnień do wykonania tej operacji",
        };
      case 404:
        return { code: "not_found", message: "Nie znaleziono zasobu" };
      case 429:
        return {
          code: "rate_limit",
          message: "Zbyt wiele prób logowania, spróbuj ponownie za chwilę",
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          code: "server_error",
          message: "Problem z serwerem, spróbuj ponownie później",
        };
      default:
        return { code: "unknown", message: "Wystąpił nieznany błąd" };
    }
  }

  return {
    code: "network_error",
    message: "Problem z połączeniem, sprawdź swoje połączenie internetowe",
  };
}

export async function login(email, password) {
  try {
    // Walidacja danych wejściowych
    if (!email || !password) {
      throw new Error("Email i hasło są wymagane");
    }

    const res = await fetchWithRetry("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw { response: res, data: errorData };
    }

    return res.json();
  } catch (error) {
    const friendlyError = handleAuthError(error, "login");
    throw friendlyError;
  }
}

export async function logout(refreshToken) {
  try {
    if (!refreshToken) {
      throw new Error("Token jest wymagany do wylogowania");
    }

    const res = await fetchWithRetry("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw { response: res, data: errorData };
    }
  } catch (error) {
    const friendlyError = handleAuthError(error, "logout");
    throw friendlyError;
  }
}

export async function refreshToken(refreshToken) {
  try {
    // Walidacja tokena
    if (!refreshToken || typeof refreshToken !== "string") {
      throw new Error("Nieprawidłowy token odświeżania");
    }

    const res = await fetchWithRetry("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw { response: res, data: errorData };
    }

    return res.json();
  } catch (error) {
    const friendlyError = handleAuthError(error, "refresh_token");
    throw friendlyError;
  }
}

export async function getProfile(token) {
  try {
    // Walidacja tokena
    if (!token || typeof token !== "string") {
      throw new Error("Token jest wymagany do pobrania profilu");
    }

    const res = await fetchWithRetry("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw { response: res, data: errorData };
    }

    return res.json();
  } catch (error) {
    const friendlyError = handleAuthError(error, "get_profile");
    throw friendlyError;
  }
}
