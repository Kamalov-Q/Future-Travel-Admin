import { NavLink } from "react-router-dom";
import { LayoutDashboard, Map, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/tours", label: "Tours", icon: Map },
];

export function AppSidebar() {
    return (
        <aside className="flex flex-col w-64 min-h-screen bg-slate-900 text-white border-r border-slate-800">
            <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800">
                <Plane className="w-6 h-6 text-sky-400" />
                <span className="text-lg font-bold tracking-tight">FutureTravel</span>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-sky-500/20 text-sky-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )
                        }
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </NavLink>
                ))}
            </nav>
            <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-500">
                Admin Panel v1.0
            </div>
        </aside>
    );
}