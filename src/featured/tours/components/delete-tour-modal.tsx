import { useDeleteTour } from "../hooks/useDeleteTour";
import type { Tour } from "../types/tour.types";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteTourDialogProps {
    open: boolean;
    onClose: () => void;
    tour: Tour | null;
}

export function DeleteTourDialog({ open, onClose, tour }: DeleteTourDialogProps) {
    const { mutateAsync, isPending } = useDeleteTour(onClose);

    return (
        <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Tour</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <strong>{tour?.destinationUz}</strong>? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={async () => { if (tour) await mutateAsync(tour.id); }}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}