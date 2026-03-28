import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toursApi } from "../api/tours.api";
import { TOURS_QUERY_KEY } from "./useTours";

export function useDeleteTour(onSuccess?: () => void) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => toursApi.deleteTour(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: [TOURS_QUERY_KEY] });
            toast.success("Tour deleted");
            onSuccess?.();
        },
        onError: () => toast.error("Failed to delete tour"),
    });
}