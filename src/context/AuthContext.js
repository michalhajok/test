// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  getProfile,
  login as apiLogin,
  logout as apiLogout,
  refreshToken as apiRefresh,
} from "@/services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    // Spróbuj pobrać usera po odświeżeniu strony
    if (accessToken) {
      getProfile(accessToken)
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, [accessToken]);

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);
    setUser(res.user);
  };

  const logout = async () => {
    await apiLogout(refreshToken);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const refresh = async () => {
    const res = await apiRefresh(refreshToken);
    setAccessToken(res.accessToken);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
