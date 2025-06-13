// /app/admin/components/SettingsForm.js
import { useState } from "react";

export default function SettingsForm({ initialData = {}, onSubmit, error }) {
  const [form, setForm] = useState({
    clinicName: initialData.clinicName || "",
    address: initialData.address || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    rodoRetentionYears: initialData.rodoRetentionYears || 20,
    notificationsEmail: initialData.notificationsEmail || "",
    notificationsSms: initialData.notificationsSms || "",
    vatRate: initialData.vatRate || 8,
    timezone: initialData.timezone || "Europe/Warsaw",
    language: initialData.language || "pl",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
    >
      <div>
        <label className="block mb-1">Nazwa kliniki</label>
        <input
          name="clinicName"
          value={form.clinicName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Adres</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Email kontaktowy</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Telefon kontaktowy</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">
          Liczba lat przechowywania danych (RODO)
        </label>
        <input
          name="rodoRetentionYears"
          type="number"
          min="1"
          value={form.rodoRetentionYears}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Email do powiadomień</label>
        <input
          name="notificationsEmail"
          type="email"
          value={form.notificationsEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Numer telefonu do powiadomień SMS</label>
        <input
          name="notificationsSms"
          value={form.notificationsSms}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Stawka VAT (%)</label>
        <input
          name="vatRate"
          type="number"
          min="0"
          max="23"
          value={form.vatRate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Strefa czasowa</label>
        <input
          name="timezone"
          value={form.timezone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Język</label>
        <input
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        Zapisz ustawienia
      </button>
    </form>
  );
}
