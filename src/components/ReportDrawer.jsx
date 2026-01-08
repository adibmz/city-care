import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/format';
import {
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel
} from '../utils/reportHelpers';

/**
 * @param {{ report: import('../types').Report | null, isOpen: boolean, onClose: () => void }} props
 */
export default function ReportDrawer(props) {
  const { report, isOpen, onClose } = props;

  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/20"
      />
      <aside
        className="relative z-50 flex h-full w-full max-w-md flex-col gap-4 overflow-y-auto bg-white p-6 shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-label="Détails du signalement"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {getCategoryLabel(report.category)} · {getStatusLabel(report.status)}
            </p>
            <h2 className="text-xl font-semibold text-slate-900">{report.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
          >
            Fermer
          </button>
        </div>

        <img
          src={report.photoUrl}
          alt={`Photo du signalement: ${report.title}`}
          className="h-48 w-full rounded-2xl object-cover"
          loading="lazy"
        />

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

        <p className="text-sm text-slate-600">{report.description}</p>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Chronologie récente</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            {report.timeline.slice(-3).map((entry) => (
              <li key={`${entry.at}-${entry.status}`} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-civic-600" />
                <span>
                  <strong>{formatDateTime(entry.at)}</strong> · {entry.note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <Link
            to={`/signalements/${report.id}`}
            className="rounded-full bg-civic-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-civic-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
          >
            Voir les détails
          </Link>
          <p className="text-xs text-slate-500">Adresse: {report.location.address}</p>
        </div>
      </aside>
    </div>
  );
}
