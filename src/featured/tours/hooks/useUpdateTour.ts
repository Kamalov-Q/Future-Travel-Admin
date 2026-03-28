import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toursApi } from "../api/tours.api";
import type { UpdateTourPayload } from "../types/tour.types";
import { TOURS_QUERY_KEY } from "./useTours";

export function useUpdateTour(onSuccess?: () => void) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateTourPayload }) =>
            toursApi.updateTour(id, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: [TOURS_QUERY_KEY] });
            toast.success("Tour updated successfully");
            onSuccess?.();
        },
        onError: () => toast.error("Failed to update tour"),
    });
}