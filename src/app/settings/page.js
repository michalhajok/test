"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Jeśli użytkownik jest zalogowany, przekieruj na /dashboard
    // W przeciwnym razie na /auth/login
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [user, router]);

  // Możesz wyświetlić krótki loader, jeśli chcesz
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      <style jsx>{`
        .loader {
          border-top-color: #218089;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
