/** @typedef {import('../types').ReportCategory} ReportCategory */
/** @typedef {import('../types').ReportPriority} ReportPriority */
/** @typedef {import('../types').ReportStatus} ReportStatus */

export const CATEGORY_OPTIONS = [
  { value: 'Dechets', label: 'Déchets' },
  { value: 'Fuite', label: 'Fuite' },
  { value: 'Eclairage', label: 'Éclairage' }
];

export const STATUS_OPTIONS = [
  { value: 'New', label: 'Nouveau' },
  { value: 'InProgress', label: 'En cours' },
  { value: 'Done', label: 'Résolu' }
];

export const PRIORITY_OPTIONS = [
  { value: 'High', label: 'Haute' },
  { value: 'Medium', label: 'Moyenne' },
  { value: 'Low', label: 'Basse' }
];

const priorityRank = {
  High: 3,
  Medium: 2,
  Low: 1
};

const categoryLabelMap = CATEGORY_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, /** @type {Record<ReportCategory, string>} */ ({}));

const statusLabelMap = STATUS_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, /** @type {Record<ReportStatus, string>} */ ({}));

const priorityLabelMap = PRIORITY_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, /** @type {Record<ReportPriority, string>} */ ({}));

/**
 * @param {ReportCategory} category
 * @returns {string}
 */
export function getCategoryLabel(category) {
  return categoryLabelMap[category] || category;
}

/**
 * @param {ReportStatus} status
 * @returns {string}
 */
export function getStatusLabel(status) {
  return statusLabelMap[status] || status;
}

/**
 * @param {ReportPriority} priority
 * @returns {string}
 */
export function getPriorityLabel(priority) {
  return priorityLabelMap[priority] || priority;
}

/**
 * @param {ReportPriority} priority
 * @returns {number}
 */
export function getPriorityRank(priority) {
  return priorityRank[priority] || 0;
}

/**
 * @param {{ category: ReportCategory, description: string }} input
 * @returns {import('../types').ReportAISuggestion}
 */
export function generateAiSuggestion(input) {
  const offset = input.description ? input.description.length % 20 : 8;
  const confidence = Math.min(0.95, 0.6 + offset / 100);
  return {
    category: input.category,
    confidence: Number(confidence.toFixed(2))
  };
}

/**
 * @param {{ category: ReportCategory, description: string }} input
 * @returns {ReportPriority}
 */
export function determinePriority(input) {
  if (input.category === 'Fuite') {
    return 'High';
  }
  if (input.category === 'Eclairage') {
    return input.description.length > 120 ? 'High' : 'Medium';
  }
  return input.description.length > 80 ? 'Medium' : 'Low';
}

/**
 * @param {ReportStatus} status
 * @returns {string}
 */
export function getStatusTimelineNote(status) {
  if (status === 'New') return 'Signalement enregistré.';
  if (status === 'InProgress') return 'Intervention planifiée.';
  return 'Incident résolu.';
}

/**
 * @param {string} prefix
 * @returns {string}
 */
export function createId(prefix = 'rep') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
