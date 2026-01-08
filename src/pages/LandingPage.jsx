import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReportCard from '../components/ReportCard';
import StatsBar from '../components/StatsBar';
import { useReports } from '../hooks/useReports';
import { useSEO } from '../hooks/useSEO';

export default function LandingPage() {
  const reports = useReports();
  const latest = useMemo(
    () =>
      [...reports]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3),
    [reports]
  );

  useSEO({
    title: 'CityCare | Signalements urbains',
    description:
      'Signalez en quelques secondes les incidents urbains et suivez leur résolution.'
  });

  return (
    <div className="flex flex-col gap-12">
      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Service municipal citoyen
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Signalez, suivez, améliorez votre ville avec CityCare.
          </h1>
          <p className="text-base text-slate-600">
            Une interface simple et rapide pour partager les incidents urbains, de la
            propreté à l’éclairage, et suivre les interventions en temps réel.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/signalements/nouveau"
              className="rounded-full bg-civic-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-civic-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
            >
              Créer un signalement
            </Link>
            <Link
              to="/signalements"
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-civic-400 hover:text-civic-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
            >
              Explorer la carte
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Comment ça marche</h2>
            <ol className="mt-3 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-500" />
                <span>Choisissez une catégorie et décrivez l’incident.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-500" />
                <span>Ajoutez une photo pour faciliter la prise en charge.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-500" />
                <span>Suivez l’avancement depuis la carte publique.</span>
              </li>
            </ol>
          </div>
          <StatsBar reports={reports} />
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">Derniers signalements</h2>
          <Link
            to="/signalements"
            className="text-sm font-semibold text-civic-700 hover:text-civic-800"
          >
            Voir tous les signalements
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {latest.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Un tableau de bord clair</h2>
          <p className="mt-2 text-sm text-slate-600">
            Les équipes municipales priorisent les interventions grâce à la vue Kanban et
            aux priorités automatiques.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Données partagées</h2>
          <p className="mt-2 text-sm text-slate-600">
            Les mises à jour en temps réel assurent une transparence totale pour les
            habitants.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Conçu pour la ville</h2>
          <p className="mt-2 text-sm text-slate-600">
            Un design épuré et accessible, compatible mobile et pensé pour l’usage public.
          </p>
        </div>
      </section>
    </div>
  );
}
