# CityCare

CityCare is a React + Vite demo that showcases a civic reporting experience. Residents can submit urban incident reports, browse them on a map or list view, and city staff can triage updates from an admin kanban board.

## Features

- Multi-step report creation with photo preview and map-based location picking
- Map and list views with search, filters, sorting, and pagination
- Report detail view with timeline, status, and priority context
- Admin dashboard with kanban workflow, filters, and internal notes
- Local storage persistence with seeded demo data

## Tech stack

- React 18
- Vite 5
- React Router
- Tailwind CSS
- Leaflet + React Leaflet

## Getting started

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Routes

- `/` landing page
- `/signalements` map feed
- `/signalements/nouveau` report creation wizard
- `/signalements/:reportId` report detail view
- `/admin` admin dashboard

## Data and storage

Reports are stored in `localStorage` under the key `CityCare_reports` and are seeded from `src/data/seedReports.js` on first load. Clear local storage to reset the demo data.
