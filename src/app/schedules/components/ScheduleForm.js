// /app/schedules/components/ScheduleForm.js
import { useState, useEffect } from "react";

const daysOfWeek = [
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
  "niedziela",
];

export default function ScheduleForm({
  initialData = {},
  onSubmit,
  error,
  isEdit = false,
}) {
  const [form, setForm] = useState({
    employeeId: initialData.employee?._id || "",
    startDate: initialData.startDate ? initialData.startDate.slice(0, 10) : "",
    endDate: initialData.endDate ? initialData.endDate.slice(0, 10) : "",
    description: initialData.description || "",
    workingHours: initialData.workingHours || {},
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setForm((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value,
        },
      },
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
        <label className="block mb-1">Okres obowiązywania</label>
        <div className="flex gap-2">
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Brak"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1">Opis</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-2">Godziny pracy</label>
        <div className="space-y-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center gap-2">
              <span className="w-24 capitalize">{day}:</span>
              <input
                type="time"
                value={form.workingHours[day]?.start || ""}
                onChange={(e) =>
                  handleWorkingHoursChange(day, "start", e.target.value)
                }
                className="px-2 py-1 border rounded focus:outline-none"
                placeholder="Start"
              />
              <span>-</span>
              <input
                type="time"
                value={form.workingHours[day]?.end || ""}
                onChange={(e) =>
                  handleWorkingHoursChange(day, "end", e.target.value)
                }
                className="px-2 py-1 border rounded focus:outline-none"
                placeholder="Koniec"
              />
            </div>
          ))}
        </div>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        {isEdit ? "Aktualizuj harmonogram" : "Dodaj harmonogram"}
      </button>
    </form>
  );
}
