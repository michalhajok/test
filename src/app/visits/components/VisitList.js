// /app/visits/components/VisitList.js
import VisitCard from "./VisitCard";

export default function VisitList({ visits }) {
  if (!visits || visits.length === 0) {
    return <div className="text-gray-500">Brak wizyt do wyświetlenia.</div>;
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {visits.map((visit) => (
        <VisitCard key={visit._id} visit={visit} />
      ))}
    </ul>
  );
}
