import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import CityMap from '../components/CityMap';
import { useReport } from '../hooks/useReports';
import { useSEO } from '../hooks/useSEO';
import { formatDateTime } from '../utils/format';
import {
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel
} from '../utils/reportHelpers';

export default function ReportDetailPage() {
  const { reportId } = useParams();
  const report = useReport(reportId);

  useSEO({
    title: report ? `CityCare | ${report.title}` : 'CityCare | Signalement',
    description: report
      ? report.description
      : 'Consultez le détail d’un signalement urbain sur CityCare.'
  });

  if (!report) {
    return (
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-slate-900">Signalement introuvable</h1>
        <p className="text-slate-600">
          Le signalement demandé n’existe pas ou a été supprimé.
        </p>
        <Link
          to="/signalements"
          className="rounded-full bg-civic-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Revenir à la carte
        </Link>
      </section>
    );
  }

  const markers = [
    {
      id: report.id,
      lat: report.location.lat,
      lng: report.location.lng,
      label: report.title
    }
  ];

  const mapCenter = useMemo(
    () => [report.location.lat, report.location.lng],
    [report.location.lat, report.location.lng]
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {getCategoryLabel(report.category)} · {getStatusLabel(report.status)}
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">{report.title}</h1>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            {getCategoryLabel(report.category)}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            {getStatusLabel(report.status)}
          </span>
          <span
            className={`rounded-full px-3 py-1 ${
              report.priority === 'High'
                ? 'bg-rose-100 text-rose-700'
                : report.priority === 'Medium'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            Priorité {getPriorityLabel(report.priority)}
          </span>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          <img
            src={report.photoUrl}
            alt={`Photo du signalement: ${report.title}`}
            className="h-72 w-full rounded-3xl object-cover"
            loading="lazy"
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Description</h2>
            <p className="mt-2 text-sm text-slate-600">{report.description}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Chronologie</h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-600">
              {report.timeline.map((entry) => (
                <li key={`${entry.at}-${entry.status}`} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-civic-600" />
                  <span>
                    <strong>{formatDateTime(entry.at)}</strong> · {entry.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Localisation</h2>
            <p className="mt-2 text-sm text-slate-600">{report.location.address}</p>
            <CityMap
              markers={markers}
              selectedId={report.id}
              center={mapCenter}
              zoom={14}
              ariaLabel="Carte de localisation"
              heightClass="h-60"
            />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Suggestion IA</h2>
            <p className="mt-2">
              Catégorie proposée: {getCategoryLabel(report.aiSuggestion.category)}
            </p>
            <p>Confiance: {(report.aiSuggestion.confidence * 100).toFixed(0)}%</p>
          </div>
          <Link
            to="/signalements"
            className="rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-600 hover:border-civic-400 hover:text-civic-700"
          >
            Retour à la carte
          </Link>
        </aside>
      </section>
    </div>
  );
}
