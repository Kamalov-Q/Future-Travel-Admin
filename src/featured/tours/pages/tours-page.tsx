import { useState } from "react";
import { useTours } from "../hooks/useTours";
import { ToursTable } from "../components/tours-table";
import { ToursFilters } from "../components/tours-filters";
import { CreateTourModal } from "../components/create-tour-modal";
import { EditTourModal } from "../components/edit-tour-modal";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useUrlQueryState } from "@/hooks/use-url-query-state";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import type { Tour } from "../types/tour.types";
import { DeleteTourDialog } from "../components/delete-tour-modal";

export function ToursPage() {
    const { getParam, setParam } = useUrlQueryState();
    const [createOpen, setCreateOpen] = useState(false);
    const [editTour, setEditTour] = useState<Tour | null>(null);
    const [deleteTour, setDeleteTour] = useState<Tour | null>(null);

    const page = parseInt(getParam("page", "1"));
    const search = getParam("search");
    const minPrice = getParam("minPrice");
    const maxPrice = getParam("maxPrice");

    const params = {
        page,
        limit: 10,
        ...(search && { search }),
        ...(minPrice && { minPrice: parseFloat(minPrice) }),
        ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
    };

    const { data, isLoading, isError } = useTours(params);

    const resetFilters = () => setParam({ search: undefined, minPrice: undefined, maxPrice: undefined, isActive: undefined, sortBy: undefined, sortOrder: undefined, page: "1" });

    return (
        <div className="space-y-5">
            <PageHeader
                title="Tours"
                description="Manage all travel tours"
                action={
                    <Button onClick={() => setCreateOpen(true)} className="gap-2 bg-sky-500 hover:bg-sky-600">
                        <Plus className="w-4 h-4" /> Create Tour
                    </Button>
                }
            />

            <div className="bg-white rounded-lg border p-4">
                <ToursFilters
                    search={search}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onSearch={(v) => setParam({ search: v, page: "1" })}
                    onMinPrice={(v) => setParam({ minPrice: v, page: "1" })}
                    onMaxPrice={(v) => setParam({ maxPrice: v, page: "1" })}
                    onReset={resetFilters}
                />
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : isError ? (
                <div className="text-center py-12 text-red-500">Failed to load tours</div>
            ) : !data?.items.length ? (
                <EmptyState message="No tours found" />
            ) : (
                <>
                    <ToursTable
                        tours={data.items}
                        onEdit={setEditTour}
                        onDelete={setDeleteTour}
                    />

                    {/* Pagination */}
                    <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>
                            Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, data.meta.totalItems)} of {data.meta.totalItems} tours
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline" size="sm"
                                disabled={!data.meta.hasPreviousPage}
                                onClick={() => setParam({ page: String(page - 1) })}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded font-medium">
                                {page} / {data.meta.totalPages}
                            </span>
                            <Button
                                variant="outline" size="sm"
                                disabled={!data.meta.hasNextPage}
                                onClick={() => setParam({ page: String(page + 1) })}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </>
            )}

            <CreateTourModal open={createOpen} onClose={() => setCreateOpen(false)} />
            <EditTourModal open={!!editTour} onClose={() => setEditTour(null)} tour={editTour} />
            <DeleteTourDialog open={!!deleteTour} onClose={() => setDeleteTour(null)} tour={deleteTour} />
        </div>
    );
}