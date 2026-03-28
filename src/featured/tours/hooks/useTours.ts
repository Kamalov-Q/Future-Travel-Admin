import { useQuery } from "@tanstack/react-query";
import { toursApi } from "../api/tours.api";
import type { QueryToursParams } from "../types/tour.types";

export const TOURS_QUERY_KEY = "tours";

export function useTours(params: QueryToursParams) {
    return useQuery({
        queryKey: [TOURS_QUERY_KEY, params],
        queryFn: () => toursApi.getAdminTours(params),
        placeholderData: (prev) => prev,
    });
}