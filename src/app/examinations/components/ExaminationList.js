// /app/examinations/components/ExaminationList.js
import ExaminationCard from "./ExaminationCard";

export default function ExaminationList({ examinations }) {
  if (!examinations || examinations.length === 0) {
    return <div className="text-gray-500">Brak badań do wyświetlenia.</div>;
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {examinations.map((exam) => (
        <ExaminationCard key={exam._id} examination={exam} />
      ))}
    </ul>
  );
}
