// /app/admin/components/AdminStats.js
export default function AdminStats({ stats }) {
  if (!stats) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Użytkownicy</span>
        <span className="text-3xl font-bold">{stats.users || 0}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Role</span>
        <span className="text-3xl font-bold">{stats.roles || 0}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Logi audytu</span>
        <span className="text-3xl font-bold">{stats.auditLogs || 0}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Logi bezpieczeństwa</span>
        <span className="text-3xl font-bold">{stats.securityLogs || 0}</span>
      </div>
    </div>
  );
}
