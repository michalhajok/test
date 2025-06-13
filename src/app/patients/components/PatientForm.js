// /app/patients/components/PatientForm.js
import { useState } from "react";

function validatePesel(pesel) {
  if (!/^\d{11}$/.test(pesel)) return false;
  // Opcjonalnie: sprawdzenie cyfry kontrolnej
  return true;
}

export default function PatientForm({ onSubmit, error }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    pesel: "",
    email: "",
    phone: "",
    consentGiven: false,
  });
  const [peselError, setPeselError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "pesel") {
      setPeselError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePesel(form.pesel)) {
      setPeselError("Nieprawidłowy numer PESEL");
      return;
    }
    if (!form.consentGiven) {
      setPeselError("Wymagana zgoda na przetwarzanie danych.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
    >
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
      <div>
        <label className="block mb-1">PESEL</label>
        <input
          name="pesel"
          value={form.pesel}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {peselError && <div className="text-red-600 text-sm">{peselError}</div>}
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1">Telefon</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="consentGiven"
            checked={form.consentGiven}
            onChange={handleChange}
            className="mr-2"
          />
          Wyrażam zgodę na przetwarzanie danych osobowych (RODO)
        </label>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        Zapisz pacjenta
      </button>
    </form>
  );
}
