// /app/services/components/ServiceList.js
import ServiceCard from "./ServiceCard";

export default function ServiceList({ services }) {
  if (!services || services.length === 0) {
    return <div className="text-gray-500">Brak usług do wyświetlenia.</div>;
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </ul>
  );
}
