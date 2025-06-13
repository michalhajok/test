// /app/services/components/ServiceCard.js
import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <div className="font-medium text-lg">{service.name}</div>
        <div className="text-sm text-gray-500">
          Kategoria: {service.category || "-"}
        </div>
        <div className="text-sm text-gray-400">
          Czas: {service.duration} min | Cena: {service.price} zł
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={`/services/${service._id}`}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
        >
          Szczegóły
        </Link>
        <Link
          href={`/services/${service._id}/edit`}
          className="bg-gray-200 text-gray-900 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Edytuj
        </Link>
      </div>
    </li>
  );
}
