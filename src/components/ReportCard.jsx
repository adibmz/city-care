import { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/format';
import { getCategoryLabel, getPriorityLabel, getStatusLabel } from '../utils/reportHelpers';

/**
 * @param {{ report: import('../types').Report, onPreview?: (report: import('../types').Report) => void }} props
 */
function ReportCard(props) {
  const { report, onPreview } = props;

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {getCategoryLabel(report.category)} · {getStatusLabel(report.status)}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">{report.title}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            report.priority === 'High'
              ? 'bg-rose-100 text-rose-700'
              : report.priority === 'Medium'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {getPriorityLabel(report.priority)}
        </span>
      </div>
      <p className="text-sm text-slate-600 line-clamp-3">{report.description}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{report.location.address}</span>
        <span>{formatDate(report.createdAt)}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {onPreview && (
          <button
            type="button"
            onClick={() => onPreview(report)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-civic-500 hover:text-civic-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
          >
            Aperçu rapide
          </button>
        )}
        <Link
          to={`/signalements/${report.id}`}
          className="rounded-full bg-civic-700 px-3 py-1 text-xs font-semibold text-white hover:bg-civic-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
        >
          Voir les détails
        </Link>
      </div>
    </article>
  );
}

export default memo(ReportCard);
