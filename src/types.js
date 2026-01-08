/**
 * @typedef {'Dechets' | 'Fuite' | 'Eclairage'} ReportCategory
 */

/**
 * @typedef {'New' | 'InProgress' | 'Done'} ReportStatus
 */

/**
 * @typedef {'Low' | 'Medium' | 'High'} ReportPriority
 */

/**
 * @typedef {Object} ReportLocation
 * @property {number} lat
 * @property {number} lng
 * @property {string} address
 */

/**
 * @typedef {Object} ReportMapXY
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} ReportAISuggestion
 * @property {ReportCategory} category
 * @property {number} confidence
 */

/**
 * @typedef {Object} ReportTimelineEntry
 * @property {string} at
 * @property {ReportStatus} status
 * @property {string} note
 */

/**
 * @typedef {Object} Report
 * @property {string} id
 * @property {string} title
 * @property {ReportCategory} category
 * @property {ReportStatus} status
 * @property {string} description
 * @property {string} photoUrl
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {ReportLocation} location
 * @property {ReportMapXY} mapXY
 * @property {ReportAISuggestion} aiSuggestion
 * @property {ReportPriority} priority
 * @property {string | undefined} internalNote
 * @property {ReportTimelineEntry[]} timeline
 */

export {};
