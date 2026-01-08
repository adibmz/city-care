import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/signalements', label: 'Carte & liste' },
  { to: '/signalements/nouveau', label: 'Créer un signalement' },
  { to: '/admin', label: 'Tableau admin' }
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-slate-200">
            <img
              src="/citycare-icon.svg"
              alt="Logo CityCare"
              className="h-9 w-9"
              width="36"
              height="36"
            />
          </div>
          <div>
            <p className="font-serif text-xl">CityCare</p>
            <p className="text-xs text-slate-500">Signalements urbains</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm" aria-label="Navigation principale">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600 ${
                  isActive
                    ? 'bg-civic-700 text-white'
                    : 'text-slate-600 hover:bg-civic-50 hover:text-civic-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
