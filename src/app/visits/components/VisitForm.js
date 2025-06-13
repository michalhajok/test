// /app/visits/components/VisitForm.js
import { useState, useEffect } from "react";

export default function VisitForm({ onSubmit, error }) {
  const [form, setForm] = useState({
    patientId: "",
    employeeId: "",
    serviceId: "",
    date: "",
    notes: "",
  });
  const [patients, setPatients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then(setPatients);
    fetch("/api/employees")
      .then((res) => res.json())
      .then(setEmployees);
    fetch("/api/services")
      .then((res) => res.json())
      .then(setServices);
  }, []);

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
        <label className="block mb-1">Pacjent</label>
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wybierz pacjenta</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Pracownik</label>
        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wybierz pracownika</option>
          {employees.map((e) => (
            <option key={e._id} value={e._id}>
              {e.firstName} {e.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Usługa</label>
        <select
          name="serviceId"
          value={form.serviceId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wybierz usługę</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Data i godzina</label>
        <input
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Notatki</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        Zapisz wizytę
      </button>
    </form>
  );
}
