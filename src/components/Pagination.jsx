/**
 * @param {{
 *  total: number,
 *  pageSize: number,
 *  currentPage: number,
 *  onPageChange: (page: number) => void,
 *  label?: string
 * }} props
 */
export default function Pagination(props) {
  const { total, pageSize, currentPage, onPageChange, label = 'Pagination' } = props;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3" aria-label={label}>
      <p className="text-xs text-slate-500">
        Page {currentPage} sur {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={!canPrev}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Précédent
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={!canNext}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </nav>
  );
}
