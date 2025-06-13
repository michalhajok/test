// components/Sidebar.js
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const menu = [
  {
    href: "/dashboard",
    label: "Panel",
    roles: ["admin", "employee", "physio"],
  },
  {
    href: "/patients",
    label: "Pacjenci",
    roles: ["admin", "employee", "physio"],
  },
  { href: "/visits", label: "Wizyty", roles: ["admin", "employee", "physio"] },
  { href: "/appointments", label: "Terminy", roles: ["admin", "employee"] },
  { href: "/employees", label: "Pracownicy", roles: ["admin"] },
  { href: "/admin", label: "Administracja", roles: ["admin"] },
];

export default function Sidebar() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 h-full fixed">
      <nav className="mt-8">
        {menu
          .filter((item) => item.roles.includes(user.role))
          .map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {item.label}
            </Link>
          ))}
      </nav>
    </aside>
  );
}
