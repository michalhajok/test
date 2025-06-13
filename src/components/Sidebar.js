"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

// Menu definiowane poza komponentem
const MENU_ITEMS = [
  {
    href: "/dashboard",
    label: "Panel",
    roles: ["admin", "employee", "physio"],
    ariaLabel: "Przejdź do panelu głównego",
  },
  {
    href: "/patients",
    label: "Pacjenci",
    roles: ["admin", "employee", "physio"],
    ariaLabel: "Zarządzanie pacjentami",
  },
  {
    href: "/visits",
    label: "Wizyty",
    roles: ["admin", "employee", "physio"],
    ariaLabel: "Zarządzanie wizytami",
  },
  {
    href: "/appointments",
    label: "Terminy",
    roles: ["admin", "employee"],
    ariaLabel: "Zarządzanie terminami",
  },
  {
    href: "/employees",
    label: "Pracownicy",
    roles: ["admin"],
    ariaLabel: "Zarządzanie pracownikami",
  },
  {
    href: "/admin",
    label: "Administracja",
    roles: ["admin"],
    ariaLabel: "Panel administracyjny",
  },
];

export default function Sidebar() {
  const { user, isLoading, error } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const pathname = usePathname();

  // Pobierz uprawnienia z serwera
  useEffect(() => {
    async function fetchMenuItems() {
      if (!user) return;

      try {
        // Zamiast filtrować po stronie klienta, pobierz dozwolone menu z serwera
        const response = await fetch("/api/user/permissions");
        if (!response.ok) throw new Error("Nie udało się pobrać uprawnień");

        const { allowedRoutes } = await response.json();

        // Filtruj menu na podstawie uprawnień otrzymanych z serwera
        const serverFilteredMenu = MENU_ITEMS.filter((item) =>
          allowedRoutes.includes(item.href)
        );

        setMenuItems(serverFilteredMenu);
      } catch (err) {
        console.error("Błąd podczas pobierania uprawnień:", err);
        // Awaryjnie filtruj lokalnie (tylko jako fallback)
        const clientFilteredMenu = MENU_ITEMS.filter(
          (item) => user && item.roles.includes(user.role)
        );
        setMenuItems(clientFilteredMenu);
      }
    }

    fetchMenuItems();
  }, [user]);

  // Stan ładowania
  if (isLoading) {
    return (
      <aside className="w-64 bg-white dark:bg-gray-900 h-full fixed">
        <div className="flex justify-center items-center h-full">
          <span className="animate-pulse">Ładowanie menu...</span>
        </div>
      </aside>
    );
  }

  // Stan błędu
  if (error || !user) {
    return (
      <aside className="w-64 bg-white dark:bg-gray-900 h-full fixed">
        <div className="flex flex-col justify-center items-center h-full">
          <span className="text-red-500 mb-2">
            Wystąpił błąd podczas ładowania menu
          </span>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            aria-label="Odśwież stronę"
          >
            Odśwież
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="w-64 bg-white dark:bg-gray-900 h-full fixed"
      aria-label="Menu nawigacyjne"
    >
      <nav className="mt-8" aria-label="Menu główne">
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
