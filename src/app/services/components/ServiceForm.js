// /app/services/components/ServiceForm.js
import { useState } from "react";

export default function ServiceForm({
  initialData = {},
  onSubmit,
  error,
  isEdit = false,
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    category: initialData.category || "",
    duration: initialData.duration || "",
    price: initialData.price || "",
    currency: initialData.currency || "PLN",
    requirements: initialData.requirements || "",
    procedures: initialData.procedures || "",
    cptCode: initialData.cptCode || "",
    icd10Code: initialData.icd10Code || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        <label className="block mb-1">Nazwa usługi</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Opis</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          rows={2}
        />
      </div>
      <div>
        <label className="block mb-1">Kategoria</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Czas trwania (min)</label>
        <input
          name="duration"
          type="number"
          min="1"
          value={form.duration}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Cena</label>
        <input
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Waluta</label>
        <input
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Wymagania</label>
        <input
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Procedury</label>
        <input
          name="procedures"
          value={form.procedures}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Kod CPT</label>
        <input
          name="cptCode"
          value={form.cptCode}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Kod ICD-10</label>
        <input
          name="icd10Code"
          value={form.icd10Code}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        {isEdit ? "Aktualizuj usługę" : "Dodaj usługę"}
      </button>
    </form>
  );
}
