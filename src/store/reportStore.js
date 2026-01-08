/** @typedef {import('../types').Report} Report */
/** @typedef {import('../types').ReportStatus} ReportStatus */

import { seedReports } from '../data/seedReports';
import { createId, getStatusTimelineNote } from '../utils/reportHelpers';

const STORAGE_KEY = 'CityCare_reports';
const listeners = new Set();
const noteTimers = new Map();
let reports = null;
let storeError = null;

/**
 * @returns {Report[]}
 */
function cloneSeed() {
  if (typeof structuredClone === 'function') {
    return structuredClone(seedReports);
  }
  return JSON.parse(JSON.stringify(seedReports));
}

/**
 * @returns {Report[]}
 */
function loadReports() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    storeError = 'Impossible de lire le stockage local. Données réinitialisées.';
  }
  return cloneSeed();
}

function ensureInit() {
  if (!reports) {
    reports = loadReports();
    persist();
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    storeError = 'Enregistrement local indisponible. Les modifications ne sont pas sauvegardées.';
  }
}

/**
 * @param {() => void} listener
 * @returns {() => void}
 */
export function subscribe(listener) {
  ensureInit();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * @returns {Report[]}
 */
export function getSnapshot() {
  ensureInit();
  return reports;
}

/**
 * @returns {string | null}
 */
export function getStoreError() {
  return storeError;
}

/**
 * @param {Report} report
 * @returns {Report}
 */
export function addReport(report) {
  ensureInit();
  reports = [report, ...reports];
  persist();
  notify();
  return report;
}

/**
 * @param {string} id
 * @param {Partial<Report> | ((report: Report) => Report)} updater
 * @param {{ persistNow?: boolean }} [options]
 * @returns {Report | null}
 */
export function updateReport(id, updater, options = {}) {
  ensureInit();
  const { persistNow = true } = options;
  let updated = null;

  reports = reports.map((report) => {
    if (report.id !== id) return report;
    const next = typeof updater === 'function' ? updater(report) : { ...report, ...updater };
    if (next === report) return report;
    updated = next;
    return next;
  });

  if (updated) {
    if (persistNow) persist();
    notify();
  }

  return updated;
}

/**
 * @param {string} id
 * @param {ReportStatus} status
 * @param {string} [note]
 * @returns {Report | null}
 */
export function updateStatus(id, status, note) {
  return updateReport(id, (report) => {
    if (report.status === status) {
      return report;
    }
    const at = new Date().toISOString();
    const entryNote = note || getStatusTimelineNote(status);
    return {
      ...report,
      status,
      updatedAt: at,
      timeline: [...report.timeline, { at, status, note: entryNote }]
    };
  });
}

/**
 * @param {string} id
 * @param {Report['category']} category
 * @returns {Report | null}
 */
export function updateCategory(id, category) {
  return updateReport(id, (report) => {
    if (report.category === category) return report;
    const at = new Date().toISOString();
    return { ...report, category, updatedAt: at };
  });
}

/**
 * @param {string} id
 * @param {string} note
 * @returns {Report | null}
 */
export function updateInternalNote(id, note) {
  const updated = updateReport(
    id,
    (report) => ({
      ...report,
      internalNote: note,
      updatedAt: new Date().toISOString()
    }),
    { persistNow: false }
  );

  if (updated) {
    if (noteTimers.has(id)) {
      clearTimeout(noteTimers.get(id));
    }
    noteTimers.set(
      id,
      setTimeout(() => {
        persist();
        noteTimers.delete(id);
      }, 700)
    );
  }

  return updated;
}

/**
 * @param {Partial<Report>} input
 * @returns {Report}
 */
export function createDraftReport(input) {
  const now = new Date().toISOString();
  return {
    id: createId('rep'),
    title: input.title || 'Signalement',
    category: input.category || 'Dechets',
    status: 'New',
    description: input.description || '',
    photoUrl: input.photoUrl || 'https://picsum.photos/seed/citycare-new/800/600',
    createdAt: now,
    updatedAt: now,
    location: input.location || {
      lat: 48.8566,
      lng: 2.3522,
      address: 'Adresse non renseignée'
    },
    mapXY: input.mapXY || { x: 50, y: 50 },
    aiSuggestion: input.aiSuggestion || { category: 'Dechets', confidence: 0.6 },
    priority: input.priority || 'Low',
    internalNote: input.internalNote,
    timeline: input.timeline || [{ at: now, status: 'New', note: 'Signalement enregistré.' }]
  };
}
