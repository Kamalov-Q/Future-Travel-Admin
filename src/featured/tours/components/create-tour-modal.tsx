import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema, type TourFormValues } from "../schemas/tour.schema";
import { useCreateTour } from "../hooks/useCreateTour";
import { TourForm } from "./tour-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CreateTourModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateTourModal({ open, onClose }: CreateTourModalProps) {
    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            destinationUz: "", descriptionUz: "",
            destinationRu: "", descriptionRu: "",
            price: 0, rating: 4.5,
            info: [""], imageUrls: [], isActive: true,
        },
    });

    const { mutateAsync, isPending } = useCreateTour(() => {
        form.reset();
        onClose();
    });

    const onSubmit = async (values: TourFormValues) => {
        await mutateAsync(values);
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Tour</DialogTitle>
                </DialogHeader>
                <TourForm form={form} onSubmit={onSubmit} isSubmitting={isPending} />
            </DialogContent>
        </Dialog>
    );
}