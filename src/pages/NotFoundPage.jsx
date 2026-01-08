import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO({
    title: 'CityCare | Page introuvable',
    description: 'La page demandée est introuvable sur CityCare.'
  });

  return (
    <section className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-semibold text-slate-900">Page introuvable</h1>
      <p className="text-slate-600">
        La page que vous cherchez n’existe plus ou a été déplacée.
      </p>
      <Link
        to="/"
        className="rounded-full bg-civic-700 px-4 py-2 text-sm font-semibold text-white"
      >
        Revenir à l’accueil
      </Link>
    </section>
  );
}
