import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Map, CheckCircle2, DollarSign, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useTours } from "@/featured/tours/hooks/useTours";

export function DashboardPage() {
    const { data, isLoading } = useTours({ page: 1, limit: 5 });
    const { data: allData } = useTours({ page: 1, limit: 100 });

    const items = allData?.items ?? [];
    const total = allData?.meta.totalItems ?? 0;
    const active = items.filter((t) => t.isActive).length;
    const avgPrice = (items.length
        ? items.reduce((acc, t) => acc + parseFloat(t.price), 0) / items.length
        : 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

    const stats = [
        { label: "Total Tours", value: total, icon: Map, color: "text-sky-600", bg: "bg-sky-50" },
        { label: "Active Tours", value: active, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Avg. Price", value: avgPrice, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Dashboard" description="Welcome to FutureTravel Admin" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color, bg }) => (
                    <Card key={label} className="border-0 shadow-sm">
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                                <Icon className={`w-6 h-6 ${color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">{label}</p>
                                <p className="text-2xl font-bold text-slate-900">{value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Recent Tours</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="space-y-3">
                            {data?.items.map((tour) => (
                                <div key={tour.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                    {tour.imageUrls[0] && (
                                        <img src={tour.imageUrls[0]} alt="" className="w-12 h-9 object-cover rounded-md flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-800 truncate">{tour.destinationUz}</p>
                                        <p className="text-xs text-slate-500">{formatDate(tour.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <span className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                                            <Star className="w-3.5 h-3.5 fill-current" />{tour.rating}
                                        </span>
                                        <span className="font-semibold text-sky-700 text-sm">{tour.price}</span>
                                        <StatusBadge isActive={tour.isActive} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}