import { useEffect, useState } from "react";
import {
  getProfile,
  login as apiLogin,
  logout as apiLogout,
  refreshToken as apiRefresh,
} from "@/services/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
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

  return { user, accessToken, refreshToken, login, logout, refresh };
}
