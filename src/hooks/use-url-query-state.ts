import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlQueryState() {
    const [searchParams, setSearchParams] = useSearchParams();

    const getParam = useCallback(
        (key: string, fallback = "") => searchParams.get(key) ?? fallback,
        [searchParams]
    );

    const setParam = useCallback(
        (updates: Record<string, string | number | boolean | undefined>) => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                Object.entries(updates).forEach(([key, val]) => {
                    if (val === undefined || val === "") next.delete(key);
                    else next.set(key, String(val));
                });
                return next;
            });
        },
        [setSearchParams]
    );

    return { getParam, setParam, searchParams };
}