// /app/admin/components/UserForm.js
import { useState } from "react";

export default function UserForm({
  initialData = {},
  onSubmit,
  error,
  isEdit = false,
}) {
  const [form, setForm] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    role: initialData.role || "employee",
    isActive: initialData.isActive !== undefined ? initialData.isActive : true,
    ...(isEdit ? {} : { password: "" }),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Imię</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block mb-1">Nazwisko</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {!isEdit && (
        <div>
          <label className="block mb-1">Hasło</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}
      <div>
        <label className="block mb-1">Rola</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="employee">Pracownik</option>
          <option value="physio">Fizjoterapeuta</option>
          <option value="admin">Administrator</option>
        </select>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          Konto aktywne
        </label>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        {isEdit ? "Aktualizuj użytkownika" : "Dodaj użytkownika"}
      </button>
    </form>
  );
}
