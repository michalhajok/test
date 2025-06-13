// /app/employees/components/EmployeeList.js
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ employees }) {
  if (!employees || employees.length === 0) {
    return (
      <div className="text-gray-500">Brak pracowników do wyświetlenia.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <EmployeeCard key={employee._id} employee={employee} />
      ))}
    </div>
  );
}
