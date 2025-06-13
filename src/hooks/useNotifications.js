import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useNotifications(onNotification) {
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;
    const ws = new WebSocket(
      `wss://twoj-backend/api/notifications?token=${accessToken}`
    );
    ws.onmessage = (e) => {
      const notification = JSON.parse(e.data);
      onNotification(notification);
    };
    return () => ws.close();
  }, [accessToken, onNotification]);
}
