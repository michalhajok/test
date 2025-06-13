// /app/reports/components/ReportGenerator.js
import { useState } from "react";

export default function ReportGenerator() {
  const [type, setType] = useState("patients");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Opcjonalnie: pobierz listę pracowników do raportów miesięcznych
  // const [employees, setEmployees] = useState([]);
  // useEffect(() => { fetch("/api/employees").then(res => res.json()).then(setEmployees); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          dateFrom,
          dateTo,
          employeeId: type === "employee-monthly" ? employeeId : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd generowania raportu");
      }
      setSuccess("Raport został wygenerowany.");
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
      <h2 className="text-lg font-semibold mb-2">Wygeneruj nowy raport</h2>
      <div>
        <label className="block mb-1">Typ raportu</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="patients">Raport pacjentów</option>
          <option value="visits">Raport wizyt</option>
          <option value="services">Raport usług</option>
          <option value="employee-monthly">Raport miesięczny pracownika</option>
        </select>
      </div>
      {(type === "visits" ||
        type === "services" ||
        type === "employee-monthly") && (
        <div className="flex gap-2">
          <div>
            <label className="block mb-1">Od</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Do</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      )}
      {type === "employee-monthly" && (
        <div>
          <label className="block mb-1">ID pracownika</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          {/* Możesz zamienić na select z listą pracowników */}
        </div>
      )}
      {success && <div className="text-green-600">{success}</div>}
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
      >
        {loading ? "Generowanie..." : "Wygeneruj raport"}
      </button>
    </form>
  );
}
