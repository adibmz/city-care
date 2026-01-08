import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '../utils/reportHelpers';

/**
 * @param {{
 *  filters: { query: string, category: string, status: string, sort: string },
 *  view: 'map' | 'list',
 *  onFilterChange: (name: string, value: string) => void,
 *  onViewChange: (view: 'map' | 'list') => void
 * }} props
 */
export default function FilterBar(props) {
  const { filters, view, onFilterChange, onViewChange } = props;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onViewChange('map')}
          aria-pressed={view === 'map'}
          className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600 ${
            view === 'map'
              ? 'bg-civic-700 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Carte
        </button>
        <button
          type="button"
          onClick={() => onViewChange('list')}
          aria-pressed={view === 'list'}
          className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600 ${
            view === 'list'
              ? 'bg-civic-700 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Liste
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col text-sm text-slate-600">
          Recherche
          <input
            name="query"
            value={filters.query}
            onChange={(event) => onFilterChange(event.target.name, event.target.value)}
            placeholder="Titre, rue, quartier"
            className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
          />
        </label>
        <label className="flex flex-col text-sm text-slate-600">
          Catégorie
          <select
            name="category"
            value={filters.category}
            onChange={(event) => onFilterChange(event.target.name, event.target.value)}
            className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
          >
            <option value="">Toutes</option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm text-slate-600">
          Statut
          <select
            name="status"
            value={filters.status}
            onChange={(event) => onFilterChange(event.target.name, event.target.value)}
            className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
          >
            <option value="">Tous</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm text-slate-600">
          Trier
          <select
            name="sort"
            value={filters.sort}
            onChange={(event) => onFilterChange(event.target.name, event.target.value)}
            className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
          >
            <option value="newest">Plus récents</option>
            <option value="priority">Priorité</option>
          </select>
        </label>
      </div>
    </section>
  );
}
