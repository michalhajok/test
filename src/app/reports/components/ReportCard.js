// /app/reports/components/ReportCard.js
export default function ReportCard({ report }) {
  const typeLabels = {
    patients: "Raport pacjentów",
    visits: "Raport wizyt",
    services: "Raport usług",
    "employee-monthly": "Raport miesięczny pracownika",
  };

  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">
          {typeLabels[report.type] || report.type}
        </div>
        <div className="text-sm text-gray-500">
          Utworzony: {report.createdAt?.slice(0, 16).replace("T", " ")}
        </div>
        {report.employee && (
          <div className="text-sm text-gray-400">
            Pracownik: {report.employee.firstName} {report.employee.lastName}
          </div>
        )}
        {(report.dateFrom || report.dateTo) && (
          <div className="text-xs text-gray-400">
            Zakres: {report.dateFrom?.slice(0, 10)} -{" "}
            {report.dateTo?.slice(0, 10)}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <a
          href={report.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Pobierz PDF
        </a>
      </div>
    </li>
  );
}
