"use client";

import { useEffect, useState } from "react";
import UserList from "../components/UserList";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Użytkownicy</h1>
      <a
        href="/admin/users/new"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition mb-4 inline-block"
      >
        Dodaj użytkownika
      </a>
      {loading ? <div>Ładowanie...</div> : <UserList users={users} />}
    </div>
  );
}
