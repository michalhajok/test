// /app/dashboard/components/StatsCards.js
export default function StatsCards({ stats }) {
  if (!stats) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Dzisiejsze wizyty</span>
        <span className="text-3xl font-bold">{stats.todayVisits || 0}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Pacjenci</span>
        <span className="text-3xl font-bold">{stats.patientsCount || 0}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Przychód (miesiąc)</span>
        <span className="text-3xl font-bold">
          {stats.monthlyRevenue || 0} zł
        </span>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Śr. czas wizyty</span>
        <span className="text-3xl font-bold">
          {stats.avgVisitTime || 0} min
        </span>
      </div>
    </div>
  );
}
