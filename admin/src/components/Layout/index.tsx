import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, HeartHandshake } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      to: "/dashboard/donation-cta",
      label: "Donation CTA",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1f3a] text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-lg font-semibold tracking-wide">
            Bato Foundation
          </h1>
          <p className="text-xs text-white/60 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="m-3 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-red-500/20 hover:text-red-200 transition"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <h2 className="text-sm text-slate-500">Welcome back, Admin</h2>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
