import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

export function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AppHeader />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}