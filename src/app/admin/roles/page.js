"use client";

import { useEffect, useState } from "react";
import RoleList from "../components/RoleList";

export default function AdminRolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/roles")
      .then((res) => res.json())
      .then(setRoles)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Role i uprawnienia</h1>
      <a
        href="/admin/roles/new"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition mb-4 inline-block"
      >
        Dodaj rolę
      </a>
      {loading ? <div>Ładowanie...</div> : <RoleList roles={roles} />}
    </div>
  );
}
