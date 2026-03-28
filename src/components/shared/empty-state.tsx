import { PackageOpen } from "lucide-react";

export function EmptyState({ message = "No results found" }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <PackageOpen className="w-12 h-12 mb-3" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}