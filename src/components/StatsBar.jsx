import { useMemo } from 'react';
import { getStatusLabel } from '../utils/reportHelpers';

/**
 * @param {{ reports: import('../types').Report[] }} props
 */
export default function StatsBar(props) {
  const { reports } = props;

  const stats = useMemo(() => {
    const base = {
      total: reports.length,
      New: 0,
      InProgress: 0,
      Done: 0,
      High: 0
    };
    reports.forEach((report) => {
      base[report.status] += 1;
      if (report.priority === 'High') base.High += 1;
    });
    return base;
  }, [reports]);

  return (
    <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-soft sm:grid-cols-5">
      <div>
        <p className="text-slate-500">Total</p>
        <p className="text-xl font-semibold text-slate-900">{stats.total}</p>
      </div>
      <div>
        <p className="text-slate-500">{getStatusLabel('New')}</p>
        <p className="text-xl font-semibold text-slate-900">{stats.New}</p>
      </div>
      <div>
        <p className="text-slate-500">{getStatusLabel('InProgress')}</p>
        <p className="text-xl font-semibold text-slate-900">{stats.InProgress}</p>
      </div>
      <div>
        <p className="text-slate-500">{getStatusLabel('Done')}</p>
        <p className="text-xl font-semibold text-slate-900">{stats.Done}</p>
      </div>
      <div>
        <p className="text-slate-500">Priorité haute</p>
        <p className="text-xl font-semibold text-slate-900">{stats.High}</p>
      </div>
    </section>
  );
}
