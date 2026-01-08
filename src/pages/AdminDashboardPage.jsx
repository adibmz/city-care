import { useCallback, useEffect, useMemo, useState } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import StatsBar from '../components/StatsBar';
import { useReports } from '../hooks/useReports';
import { useSEO } from '../hooks/useSEO';
import {
  getStoreError,
  updateCategory,
  updateInternalNote,
  updateStatus
} from '../store/reportStore';
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from '../utils/reportHelpers';

export default function AdminDashboardPage() {
  const reports = useReports();
  const storeError = getStoreError();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    priority: '',
    status: ''
  });

  useSEO({
    title: 'CityCare | Tableau de bord',
    description:
      'Tableau de bord municipal pour organiser les signalements et suivre les interventions.'
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = useCallback((id, status) => {
    updateStatus(id, status, 'Mise à jour du statut par l’équipe municipale.');
  }, []);

  const handleCategoryChange = useCallback((id, category) => {
    updateCategory(id, category);
  }, []);

  const handleInternalNoteChange = useCallback((id, note) => {
    updateInternalNote(id, note);
  }, []);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ query: '', category: '', priority: '', status: '' });
  }, []);

  const filteredReports = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesQuery = query
        ? report.title.toLowerCase().includes(query) ||
          report.location.address.toLowerCase().includes(query)
        : true;
      const matchesCategory = filters.category
        ? report.category === filters.category
        : true;
      const matchesPriority = filters.priority
        ? report.priority === filters.priority
        : true;
      const matchesStatus = filters.status ? report.status === filters.status : true;
      return matchesQuery && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [reports, filters]);

  const hasFilters = Boolean(
    filters.query || filters.category || filters.priority || filters.status
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-600">
          Priorisez les interventions et suivez les mises à jour en temps réel.
        </p>
        <p className="text-xs text-slate-500">
          Glissez-déposez les cartes ou utilisez le menu Statut pour mettre à jour.
        </p>
      </section>

      <StatsBar reports={filteredReports} />
      <p className="text-xs text-slate-500">
        Affichage: {filteredReports.length} / {reports.length} signalements
      </p>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-700">Filtres</h2>
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Réinitialiser
          </button>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col text-sm text-slate-600">
            Recherche
            <input
              name="query"
              value={filters.query}
              onChange={(event) => handleFilterChange(event.target.name, event.target.value)}
              placeholder="Titre, adresse"
              className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
            />
          </label>
          <label className="flex flex-col text-sm text-slate-600">
            Catégorie
            <select
              name="category"
              value={filters.category}
              onChange={(event) => handleFilterChange(event.target.name, event.target.value)}
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
            Priorité
            <select
              name="priority"
              value={filters.priority}
              onChange={(event) => handleFilterChange(event.target.name, event.target.value)}
              className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
            >
              <option value="">Toutes</option>
              {PRIORITY_OPTIONS.map((option) => (
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
              onChange={(event) => handleFilterChange(event.target.name, event.target.value)}
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
        </div>
      </section>

      {storeError && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {storeError}
        </div>
      )}

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Chargement du tableau de bord...
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Aucun signalement disponible.
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Aucun signalement pour ces filtres.
        </div>
      ) : (
        <KanbanBoard
          reports={filteredReports}
          pageSize={20}
          onStatusChange={handleStatusChange}
          onCategoryChange={handleCategoryChange}
          onInternalNoteChange={handleInternalNoteChange}
        />
      )}
    </div>
  );
}
