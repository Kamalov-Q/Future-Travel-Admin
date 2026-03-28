import { Badge } from "@/components/ui/badge";

export function StatusBadge({ isActive }: { isActive: boolean }) {
    return (
        <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}