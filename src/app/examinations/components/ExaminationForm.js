// /app/examinations/components/ExaminationForm.js
import { useState, useEffect } from "react";

export default function ExaminationForm({
  initialData = {},
  onSubmit,
  error,
  isEdit = false,
}) {
  const [form, setForm] = useState({
    patientId: initialData.patient?._id || "",
    employeeId: initialData.employee?._id || "",
    visitId: initialData.visit?._id || "",
    date: initialData.date ? initialData.date.slice(0, 16) : "",
    mainComplaint: initialData.mainComplaint || "",
    painLevel:
      typeof initialData.painLevel === "number" ? initialData.painLevel : "",
    diagnosis: initialData.diagnosis || "",
    notes: initialData.notes || "",
  });
  const [patients, setPatients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then(setPatients);
    fetch("/api/employees")
      .then((res) => res.json())
      .then(setEmployees);
    fetch("/api/visits")
      .then((res) => res.json())
      .then(setVisits);
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
        <label className="block mb-1">Wizyta</label>
        <select
          name="visitId"
          value={form.visitId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Powiąż z wizytą</option>
          {visits.map((v) => (
            <option key={v._id} value={v._id}>
              {v.patient?.firstName} {v.patient?.lastName} -{" "}
              {v.date?.slice(0, 16).replace("T", " ")}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Data badania</label>
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
        <label className="block mb-1">Główna dolegliwość</label>
        <input
          name="mainComplaint"
          value={form.mainComplaint}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Skala bólu (0-10)</label>
        <input
          name="painLevel"
          type="number"
          min="0"
          max="10"
          value={form.painLevel}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Diagnoza</label>
        <input
          name="diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
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
        Zapisz badanie
      </button>
    </form>
  );
}
