import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function AppHeader() {
    const { admin, logout } = useAuth();

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
            <div />
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-sky-600" />
                    </div>
                    <div className="hidden sm:block">
                        <p className="font-medium text-slate-800">{admin?.name}</p>
                        <p className="text-xs text-slate-500">{admin?.email}</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-2 text-slate-600">
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </div>
        </header>
    );
}