import { useEffect, useMemo, useState } from 'react';
import Pagination from './Pagination';
import { formatDate } from '../utils/format';
import {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel
} from '../utils/reportHelpers';

const columns = STATUS_OPTIONS;

/**
 * @param {{
 *  reports: import('../types').Report[],
 *  onStatusChange: (id: string, status: import('../types').ReportStatus) => void,
 *  onCategoryChange: (id: string, category: import('../types').ReportCategory) => void,
 *  onInternalNoteChange: (id: string, note: string) => void,
 *  pageSize?: number
 * }} props
 */
export default function KanbanBoard(props) {
  const {
    reports,
    onStatusChange,
    onCategoryChange,
    onInternalNoteChange,
    pageSize = 20
  } = props;

  const grouped = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.value] = reports.filter((report) => report.status === column.value);
      return acc;
    }, {});
  }, [reports]);

  const totalPages = useMemo(() => {
    return columns.reduce((acc, column) => {
      const total = grouped[column.value].length;
      acc[column.value] = Math.max(1, Math.ceil(total / pageSize));
      return acc;
    }, {});
  }, [grouped, pageSize]);

  const [pageByStatus, setPageByStatus] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.value] = 1;
      return acc;
    }, {})
  );

  useEffect(() => {
    setPageByStatus((prev) => {
      let changed = false;
      const next = { ...prev };
      columns.forEach((column) => {
        const maxPage = totalPages[column.value] || 1;
        if (!next[column.value]) {
          next[column.value] = 1;
          changed = true;
        } else if (next[column.value] > maxPage) {
          next[column.value] = maxPage;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [totalPages]);

  const handlePageChange = (status, page) => {
    setPageByStatus((prev) => ({ ...prev, [status]: page }));
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => {
        const status = column.value;
        const currentPage = pageByStatus[status] || 1;
        const start = (currentPage - 1) * pageSize;
        const visible = grouped[status].slice(start, start + pageSize);
        const totalForStatus = grouped[status].length;

        return (
          <section
            key={status}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              const reportId = event.dataTransfer.getData('text/plain');
              if (reportId) {
                onStatusChange(reportId, status);
              }
            }}
          >
            <header className="flex items-center justify-between px-2">
              <h2 className="text-sm font-semibold text-slate-700">
                {getStatusLabel(status)}
              </h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                {totalForStatus}
              </span>
            </header>

            {totalForStatus === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500">
                Aucun signalement
              </div>
            ) : (
              visible.map((report) => (
                <article
                  key={report.id}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('text/plain', report.id);
                  }}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {getCategoryLabel(report.category)}
                      </p>
                      <h3 className="font-semibold text-slate-900">{report.title}</h3>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
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

                  <p className="text-xs text-slate-500">{report.location.address}</p>

                  <div className="grid gap-2">
                    <label className="text-xs text-slate-500">
                      Catégorie
                      <select
                        value={report.category}
                        onChange={(event) =>
                          onCategoryChange(report.id, event.target.value)
                        }
                        className="mt-1 w-full rounded-xl border border-slate-200 px-2 py-1 text-xs text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                      >
                        {CATEGORY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-xs text-slate-500">
                      Statut (clavier)
                      <select
                        value={report.status}
                        onChange={(event) => onStatusChange(report.id, event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-2 py-1 text-xs text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-xs text-slate-500">
                      Note interne
                      <textarea
                        value={report.internalNote || ''}
                        onChange={(event) =>
                          onInternalNoteChange(report.id, event.target.value)
                        }
                        rows={2}
                        placeholder="Ajouter une note interne..."
                        className="mt-1 w-full rounded-xl border border-slate-200 px-2 py-1 text-xs text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                      />
                    </label>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Mis à jour: {formatDate(report.updatedAt)}
                  </p>
                </article>
              ))
            )}

            <Pagination
              total={totalForStatus}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={(page) => handlePageChange(status, page)}
              label={`Pagination ${getStatusLabel(status)}`}
            />
          </section>
        );
      })}
    </div>
  );
}