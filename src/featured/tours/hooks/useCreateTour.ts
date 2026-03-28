import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toursApi } from "../api/tours.api";
import type { CreateTourPayload } from "../types/tour.types";
import { TOURS_QUERY_KEY } from "./useTours";

export function useCreateTour(onSuccess?: () => void) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateTourPayload) => toursApi.createTour(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: [TOURS_QUERY_KEY] });
            toast.success("Tour created successfully");
            onSuccess?.();
        },
        onError: () => toast.error("Failed to create tour"),
    });
}