// /app/admin/components/UserList.js
import UserCard from "./UserCard";

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-gray-500">Brak użytkowników do wyświetlenia.</div>
    );
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </ul>
  );
}
