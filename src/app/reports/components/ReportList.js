// /app/reports/components/ReportList.js
import ReportCard from "./ReportCard";

export default function ReportList({ reports }) {
  if (!reports || reports.length === 0) {
    return <div className="text-gray-500">Brak wygenerowanych raportów.</div>;
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {reports.map((report) => (
        <ReportCard key={report._id} report={report} />
      ))}
    </ul>
  );
}
