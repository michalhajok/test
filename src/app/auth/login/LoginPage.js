"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd logowania");
      }
      // Po udanym logowaniu przekieruj do dashboardu
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Logowanie
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
        >
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <a
          href="/auth/forgot-password"
          className="underline hover:text-primary"
        >
          Nie pamiętasz hasła?
        </a>
      </div>
      <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Nie masz konta?{" "}
        <a href="/auth/register" className="underline hover:text-primary">
          Zarejestruj się
        </a>
      </div>
    </>
  );
}
