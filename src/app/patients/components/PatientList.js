// /app/patients/components/PatientList.js
import PatientCard from "./PatientCard";

export default function PatientList({ patients }) {
  if (!patients || patients.length === 0) {
    return <div className="text-gray-500">Brak pacjentów do wyświetlenia.</div>;
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {patients.map((patient) => (
        <PatientCard key={patient._id} patient={patient} />
      ))}
    </ul>
  );
}
