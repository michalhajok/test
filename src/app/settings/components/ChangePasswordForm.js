// /app/settings/components/ChangePasswordForm.js
"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (form.newPassword !== form.confirmPassword) {
      setError("Nowe hasła nie są identyczne.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd zmiany hasła");
      }
      setSuccess("Hasło zostało zmienione.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded shadow p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold mb-2">Zmień hasło</h2>
      <div>
        <label className="block mb-1">Aktualne hasło</label>
        <input
          name="currentPassword"
          type="password"
          value={form.currentPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Nowe hasło</label>
        <input
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Potwierdź nowe hasło</label>
        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {success && <div className="text-green-600">{success}</div>}
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
      >
        {loading ? "Zmienianie..." : "Zmień hasło"}
      </button>
    </form>
  );
}
