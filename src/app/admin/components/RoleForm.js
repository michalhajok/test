// /app/admin/components/RoleForm.js
import { useState } from "react";

const allPermissions = [
  "admin:read",
  "admin:write",
  "admin:delete",
  "employees:read",
  "employees:write",
  "employees:delete",
  "patients:read",
  "patients:write",
  "visits:read",
  "visits:write",
  "visits:cancel",
  "reports:read",
  "reports:generate",
];

export default function RoleForm({
  initialData = {},
  onSubmit,
  error,
  isEdit = false,
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    displayName: initialData.displayName || "",
    permissions: initialData.permissions || [],
    isActive: initialData.isActive !== undefined ? initialData.isActive : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePermissionToggle = (permission) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
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
      <div>
        <label className="block mb-1">Nazwa systemowa</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Nazwa wyświetlana</label>
        <input
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-2">Uprawnienia</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded p-3">
          {allPermissions.map((permission) => (
            <label key={permission} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={form.permissions.includes(permission)}
                onChange={() => handlePermissionToggle(permission)}
                className="mr-2"
              />
              <span className="text-sm">{permission}</span>
            </label>
          ))}
        </div>
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
          Rola aktywna
        </label>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        {isEdit ? "Aktualizuj rolę" : "Dodaj rolę"}
      </button>
    </form>
  );
}
