import { useMemo, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../store/reportStore';

/**
 * @returns {import('../types').Report[]}
 */
export function useReports() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/**
 * @param {string | undefined} reportId
 * @returns {import('../types').Report | undefined}
 */
export function useReport(reportId) {
  const reports = useReports();
  return useMemo(
    () => reports.find((report) => report.id === reportId),
    [reportId, reports]
  );
}
