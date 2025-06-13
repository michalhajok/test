// /app/dashboard/components/RecentVisits.js
export default function RecentVisits({ visits }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Ostatnie wizyty</h2>
      {(!visits || visits.length === 0) && (
        <div className="text-gray-500">Brak wizyt do wyświetlenia.</div>
      )}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {visits &&
          visits.map((visit) => (
            <li
              key={visit._id}
              className="py-3 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">
                  {visit.patient?.fullName || "Pacjent"}
                </div>
                <div className="text-sm text-gray-500">
                  {visit.date?.slice(0, 10)}
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {visit.status}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
