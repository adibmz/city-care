import { useCallback, useEffect, useMemo, useState } from 'react';
import CityMap from '../components/CityMap';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import ReportCard from '../components/ReportCard';
import ReportDrawer from '../components/ReportDrawer';
import StatsBar from '../components/StatsBar';
import { useReports } from '../hooks/useReports';
import { useSEO } from '../hooks/useSEO';
import { getStoreError } from '../store/reportStore';
import { getPriorityRank } from '../utils/reportHelpers';

const DEFAULT_CENTER = [31.7917, -7.0926];
const PAGE_SIZE = 20;

export default function MapFeedPage() {
  const reports = useReports();
  const [view, setView] = useState('map');
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    status: '',
    sort: 'newest'
  });
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const storeError = getStoreError();

  useSEO({
    title: 'CityCare | Carte des signalements',
    description:
      'Explorez les signalements urbains en cours, filtrez par catégorie et statut.'
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, view]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePinClick = useCallback((pinId) => {
    setSelectedId(pinId);
  }, []);

  const handlePreview = useCallback((report) => {
    setSelectedId(report.id);
  }, []);

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesQuery = query
        ? report.title.toLowerCase().includes(query) ||
          report.location.address.toLowerCase().includes(query)
        : true;
      const matchesCategory = filters.category
        ? report.category === filters.category
        : true;
      const matchesStatus = filters.status ? report.status === filters.status : true;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [reports, filters]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (filters.sort === 'priority') {
      list.sort((a, b) => {
        const byPriority = getPriorityRank(b.priority) - getPriorityRank(a.priority);
        if (byPriority !== 0) return byPriority;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return list;
    }
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [filtered, filters.sort]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sorted.length / PAGE_SIZE)),
    [sorted.length]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, currentPage]);

  const selectedReport = useMemo(
    () => sorted.find((report) => report.id === selectedId) || null,
    [selectedId, sorted]
  );

  const markers = useMemo(
    () =>
      sorted.map((report) => ({
        id: report.id,
        lat: report.location.lat,
        lng: report.location.lng,
        label: report.title
      })),
    [sorted]
  );

  const mapCenter = useMemo(() => {
    if (selectedReport) {
      return [selectedReport.location.lat, selectedReport.location.lng];
    }
    return DEFAULT_CENTER;
  }, [selectedReport]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Carte des signalements</h1>
        <p className="text-slate-600">
          Visualisez les incidents et suivez leur résolution en temps réel.
        </p>
      </section>

      <StatsBar reports={reports} />

      {storeError && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {storeError}
        </div>
      )}

      <FilterBar
        filters={filters}
        view={view}
        onFilterChange={handleFilterChange}
        onViewChange={setView}
      />

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Chargement des signalements...
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Aucun signalement ne correspond à votre recherche.
        </div>
      ) : view === 'map' ? (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <CityMap
            markers={markers}
            selectedId={selectedId}
            onMarkerClick={handlePinClick}
            center={mapCenter}
            zoom={6}
            ariaLabel="Carte des signalements"
            heightClass="h-80 lg:h-[520px]"
          />
          <div className="flex flex-col gap-3">
            {sorted.slice(0, 6).map((report) => (
              <ReportCard key={report.id} report={report} onPreview={handlePreview} />
            ))}
            {sorted.length > 6 && (
              <p className="text-xs text-slate-500">
                + {sorted.length - 6} autres signalements
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {paginated.map((report) => (
              <ReportCard key={report.id} report={report} onPreview={handlePreview} />
            ))}
          </div>
          <Pagination
            total={sorted.length}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            label="Pagination des signalements"
          />
        </div>
      )}

      <ReportDrawer
        report={selectedReport}
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}