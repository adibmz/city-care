/** @typedef {import('../types').Report} Report */

/** @type {Report[]} */
export const seedReports = [
  {
    id: 'rep_seed_01',
    title: 'Tas de déchets près de l’école Jean Moulin',
    category: 'Dechets',
    status: 'New',
    description:
      'Plusieurs sacs et cartons sont déposés sur le trottoir depuis deux jours.',
    photoUrl: 'https://picsum.photos/seed/CityCare-01/800/600',
    createdAt: '2024-10-01T08:15:00.000Z',
    updatedAt: '2024-10-01T08:15:00.000Z',
    location: {
      lat: 48.8566,
      lng: 2.3522,
      address: '12 rue Jean Moulin, 75010 Paris'
    },
    mapXY: { x: 22, y: 38 },
    aiSuggestion: { category: 'Dechets', confidence: 0.72 },
    priority: 'Medium',
    internalNote: undefined,
    timeline: [
      {
        at: '2024-10-01T08:15:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      }
    ]
  },
  {
    id: 'rep_seed_02',
    title: 'Fuite d’eau rue des Lilas',
    category: 'Fuite',
    status: 'InProgress',
    description: 'La chaussée est humide en continu, fuite visible près du caniveau.',
    photoUrl: 'https://picsum.photos/seed/CityCare-02/800/600',
    createdAt: '2024-09-28T06:05:00.000Z',
    updatedAt: '2024-09-28T10:45:00.000Z',
    location: {
      lat: 48.8611,
      lng: 2.376,
      address: '7 rue des Lilas, 75019 Paris'
    },
    mapXY: { x: 54, y: 22 },
    aiSuggestion: { category: 'Fuite', confidence: 0.88 },
    priority: 'High',
    internalNote: 'Coordination avec la régie des eaux.',
    timeline: [
      {
        at: '2024-09-28T06:05:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      },
      {
        at: '2024-09-28T10:45:00.000Z',
        status: 'InProgress',
        note: 'Intervention planifiée.'
      }
    ]
  },
  {
    id: 'rep_seed_03',
    title: 'Lampadaire éteint boulevard Victor Hugo',
    category: 'Eclairage',
    status: 'Done',
    description: 'Le lampadaire côté nord est éteint la nuit depuis une semaine.',
    photoUrl: 'https://picsum.photos/seed/CityCare-03/800/600',
    createdAt: '2024-09-20T19:20:00.000Z',
    updatedAt: '2024-09-23T17:10:00.000Z',
    location: {
      lat: 48.8689,
      lng: 2.308,
      address: 'Boulevard Victor Hugo, 75116 Paris'
    },
    mapXY: { x: 78, y: 30 },
    aiSuggestion: { category: 'Eclairage', confidence: 0.69 },
    priority: 'Medium',
    internalNote: undefined,
    timeline: [
      {
        at: '2024-09-20T19:20:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      },
      {
        at: '2024-09-21T08:10:00.000Z',
        status: 'InProgress',
        note: 'Diagnostic électrique effectué.'
      },
      {
        at: '2024-09-23T17:10:00.000Z',
        status: 'Done',
        note: 'Ampoule remplacée.'
      }
    ]
  },
  {
    id: 'rep_seed_04',
    title: 'Poubelles débordantes au marché central',
    category: 'Dechets',
    status: 'InProgress',
    description: 'Les bacs sont pleins et des déchets se répandent sur la place.',
    photoUrl: 'https://picsum.photos/seed/CityCare-04/800/600',
    createdAt: '2024-09-30T07:30:00.000Z',
    updatedAt: '2024-09-30T09:00:00.000Z',
    location: {
      lat: 48.8535,
      lng: 2.3499,
      address: 'Place du Marché, 75004 Paris'
    },
    mapXY: { x: 34, y: 52 },
    aiSuggestion: { category: 'Dechets', confidence: 0.66 },
    priority: 'Medium',
    internalNote: 'Renfort propreté demandé.',
    timeline: [
      {
        at: '2024-09-30T07:30:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      },
      {
        at: '2024-09-30T09:00:00.000Z',
        status: 'InProgress',
        note: 'Équipe propreté en route.'
      }
    ]
  },
  {
    id: 'rep_seed_05',
    title: 'Fuite d’eau dans le parc de la Villette',
    category: 'Fuite',
    status: 'New',
    description: 'Jet d’eau constant près des jeux pour enfants, risque de glissade.',
    photoUrl: 'https://picsum.photos/seed/CityCare-05/800/600',
    createdAt: '2024-10-02T12:40:00.000Z',
    updatedAt: '2024-10-02T12:40:00.000Z',
    location: {
      lat: 48.8926,
      lng: 2.3932,
      address: 'Parc de la Villette, 75019 Paris'
    },
    mapXY: { x: 63, y: 64 },
    aiSuggestion: { category: 'Fuite', confidence: 0.9 },
    priority: 'High',
    internalNote: undefined,
    timeline: [
      {
        at: '2024-10-02T12:40:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      }
    ]
  },
  {
    id: 'rep_seed_06',
    title: 'Éclairage clignotant place de la Gare',
    category: 'Eclairage',
    status: 'New',
    description: 'Le lampadaire central clignote toute la nuit.',
    photoUrl: 'https://picsum.photos/seed/CityCare-06/800/600',
    createdAt: '2024-09-29T21:15:00.000Z',
    updatedAt: '2024-09-29T21:15:00.000Z',
    location: {
      lat: 48.8443,
      lng: 2.3746,
      address: 'Place de la Gare, 75013 Paris'
    },
    mapXY: { x: 18, y: 70 },
    aiSuggestion: { category: 'Eclairage', confidence: 0.64 },
    priority: 'Medium',
    internalNote: undefined,
    timeline: [
      {
        at: '2024-09-29T21:15:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      }
    ]
  },
  {
    id: 'rep_seed_07',
    title: 'Dépôts sauvages sur la berge',
    category: 'Dechets',
    status: 'Done',
    description: 'Des encombrants ont été laissés près de la berge du canal.',
    photoUrl: 'https://picsum.photos/seed/CityCare-07/800/600',
    createdAt: '2024-09-15T09:05:00.000Z',
    updatedAt: '2024-09-18T15:20:00.000Z',
    location: {
      lat: 48.8724,
      lng: 2.3652,
      address: 'Quai de Valmy, 75010 Paris'
    },
    mapXY: { x: 44, y: 18 },
    aiSuggestion: { category: 'Dechets', confidence: 0.61 },
    priority: 'Low',
    internalNote: undefined,
    timeline: [
      {
        at: '2024-09-15T09:05:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      },
      {
        at: '2024-09-16T11:30:00.000Z',
        status: 'InProgress',
        note: 'Déploiement équipe propreté.'
      },
      {
        at: '2024-09-18T15:20:00.000Z',
        status: 'Done',
        note: 'Zone nettoyée.'
      }
    ]
  },
  {
    id: 'rep_seed_08',
    title: 'Bouche d’égout qui déborde',
    category: 'Fuite',
    status: 'InProgress',
    description: 'Après la pluie, l’eau remonte au niveau de la chaussée.',
    photoUrl: 'https://picsum.photos/seed/CityCare-08/800/600',
    createdAt: '2024-10-01T05:55:00.000Z',
    updatedAt: '2024-10-01T08:25:00.000Z',
    location: {
      lat: 48.8657,
      lng: 2.3206,
      address: 'Rue de Miromesnil, 75008 Paris'
    },
    mapXY: { x: 70, y: 44 },
    aiSuggestion: { category: 'Fuite', confidence: 0.91 },
    priority: 'High',
    internalNote: 'Inspection réseau pluvial.',
    timeline: [
      {
        at: '2024-10-01T05:55:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      },
      {
        at: '2024-10-01T08:25:00.000Z',
        status: 'InProgress',
        note: 'Équipe d’assainissement mobilisée.'
      }
    ]
  },
  {
    id: 'rep_seed_09',
    title: 'Allée sombre quartier Nord',
    category: 'Eclairage',
    status: 'InProgress',
    description:
      'L’éclairage public est insuffisant dans l’allée piétonne principale.',
    photoUrl: 'https://picsum.photos/seed/CityCare-09/800/600',
    createdAt: '2024-09-26T20:10:00.000Z',
    updatedAt: '2024-09-27T09:10:00.000Z',
    location: {
      lat: 48.8955,
      lng: 2.353,
      address: 'Avenue de Clichy, 75017 Paris'
    },
    mapXY: { x: 28, y: 12 },
    aiSuggestion: { category: 'Eclairage', confidence: 0.7 },
    priority: 'Medium',
    internalNote: 'Audit lumineux en cours.',
    timeline: [
      {
        at: '2024-09-26T20:10:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      },
      {
        at: '2024-09-27T09:10:00.000Z',
        status: 'InProgress',
        note: 'Mesures de luminosité lancées.'
      }
    ]
  },
  {
    id: 'rep_seed_10',
    title: 'Déchets volumineux avenue République',
    category: 'Dechets',
    status: 'New',
    description: 'Un vieux canapé bloque le passage piéton.',
    photoUrl: 'https://picsum.photos/seed/CityCare-10/800/600',
    createdAt: '2024-10-03T09:25:00.000Z',
    updatedAt: '2024-10-03T09:25:00.000Z',
    location: {
      lat: 48.8672,
      lng: 2.3876,
      address: 'Avenue de la République, 75011 Paris'
    },
    mapXY: { x: 48, y: 58 },
    aiSuggestion: { category: 'Dechets', confidence: 0.78 },
    priority: 'Medium',
    internalNote: undefined,
    timeline: [
      {
        at: '2024-10-03T09:25:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      }
    ]
  },
  {
    id: 'rep_seed_11',
    title: 'Fuite près d’une bouche incendie',
    category: 'Fuite',
    status: 'Done',
    description: 'Petite fuite continue autour de la bouche incendie.',
    photoUrl: 'https://picsum.photos/seed/CityCare-11/800/600',
    createdAt: '2024-09-10T14:35:00.000Z',
    updatedAt: '2024-09-12T10:15:00.000Z',
    location: {
      lat: 48.8402,
      lng: 2.3001,
      address: 'Rue de Vaugirard, 75015 Paris'
    },
    mapXY: { x: 8, y: 86 },
    aiSuggestion: { category: 'Fuite', confidence: 0.86 },
    priority: 'High',
    internalNote: 'Remplacement joint terminé.',
    timeline: [
      {
        at: '2024-09-10T14:35:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      },
      {
        at: '2024-09-11T09:20:00.000Z',
        status: 'InProgress',
        note: 'Matériel en commande.'
      },
      {
        at: '2024-09-12T10:15:00.000Z',
        status: 'Done',
        note: 'Fuite réparée.'
      }
    ]
  },
  {
    id: 'rep_seed_12',
    title: 'Éclairage cassé au passage piéton',
    category: 'Eclairage',
    status: 'New',
    description: 'La lanterne du passage piéton ne s’allume plus.',
    photoUrl: 'https://picsum.photos/seed/CityCare-12/800/600',
    createdAt: '2024-10-02T18:05:00.000Z',
    updatedAt: '2024-10-02T18:05:00.000Z',
    location: {
      lat: 48.8597,
      lng: 2.3389,
      address: 'Rue de Rivoli, 75001 Paris'
    },
    mapXY: { x: 60, y: 40 },
    aiSuggestion: { category: 'Eclairage', confidence: 0.73 },
    priority: 'Medium',
    internalNote: undefined,
    timeline: [
      {
        at: '2024-10-02T18:05:00.000Z',
        status: 'New',
        note: 'Signalement enregistré.'
      }
    ]
  }
];
