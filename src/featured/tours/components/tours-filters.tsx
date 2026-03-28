import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface ToursFiltersProps {
    search: string;
    minPrice: string;
    maxPrice: string;
    onSearch: (v: string) => void;
    onMinPrice: (v: string) => void;
    onMaxPrice: (v: string) => void;
    onReset: () => void;
}

export function ToursFilters({
    search,
    minPrice,
    maxPrice,
    onSearch,
    onMinPrice,
    onMaxPrice,
    onReset,
}: ToursFiltersProps) {
    const [localSearch, setLocalSearch] = useState(search);
    const [localMin, setLocalMin] = useState(minPrice);
    const [localMax, setLocalMax] = useState(maxPrice);

    const debouncedSearch = useDebounce(localSearch, 500);
    const debouncedMin = useDebounce(localMin, 500);
    const debouncedMax = useDebounce(localMax, 500);

    useEffect(() => { onSearch(debouncedSearch); }, [debouncedSearch]);
    useEffect(() => { onMinPrice(debouncedMin); }, [debouncedMin]);
    useEffect(() => { onMaxPrice(debouncedMax); }, [debouncedMax]);

    useEffect(() => { setLocalSearch(search); }, [search]);
    useEffect(() => { setLocalMin(minPrice); }, [minPrice]);
    useEffect(() => { setLocalMax(maxPrice); }, [maxPrice]);

    return (
        <div className="flex flex-wrap gap-3 items-end">
            <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    className="pl-9"
                    placeholder="Search tours..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                />
            </div>
            <Input
                className="w-28"
                type="number"
                placeholder="Min $"
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
            />
            <Input
                className="w-28"
                type="number"
                placeholder="Max $"
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
            />
            <Button variant="ghost" size="icon" onClick={onReset}>
                <X className="w-4 h-4" />
            </Button>
        </div>
    );
}