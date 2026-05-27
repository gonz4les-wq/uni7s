import { NavLink, Outlet, useLocation } from "react-router-dom";

const NAV = [
  { to: "/", label: "Start", icon: "🏠", end: true },
  { to: "/explore", label: "Entdecken", icon: "🧭" },
  { to: "/compare", label: "Vergleich", icon: "⚖️" },
  { to: "/dashboard", label: "Profil", icon: "👤" },
];

export default function Layout() {
  const { pathname } = useLocation();
  // Hide the nav inside the quiz flow for full focus.
  const hideNav = pathname.startsWith("/quiz");

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-xl flex-col">
      <main className={`flex-1 px-4 pt-4 ${hideNav ? "pb-4" : "pb-24"}`}>
        <Outlet />
      </main>

      {!hideNav && (
        <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 mx-auto max-w-xl px-4 pb-2">
          <div className="glass flex items-center justify-around rounded-3xl px-2 py-2">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-medium transition ${
                    isActive
                      ? "bg-white/10 text-brand-300"
                      : "text-slate-400 hover:text-slate-200"
                  }`
                }
              >
                <span className="text-lg leading-none">{n.icon}</span>
                {n.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
