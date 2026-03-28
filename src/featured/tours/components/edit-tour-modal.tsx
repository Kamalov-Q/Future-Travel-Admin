import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema, type TourFormValues } from "../schemas/tour.schema";
import { useUpdateTour } from "../hooks/useUpdateTour";
import { TourForm } from "./tour-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Tour } from "../types/tour.types";

interface EditTourModalProps {
    open: boolean;
    onClose: () => void;
    tour: Tour | null;
}

export function EditTourModal({ open, onClose, tour }: EditTourModalProps) {
    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            destinationUz: "", descriptionUz: "",
            destinationRu: "", descriptionRu: "",
            price: 0, rating: 4.5,
            info: [""], imageUrls: [], isActive: true,
        },
    });

    const { mutateAsync, isPending } = useUpdateTour(() => onClose());

    useEffect(() => {
        if (tour) {
            form.reset({
                destinationUz: tour.destinationUz,
                descriptionUz: tour.descriptionUz,
                destinationRu: tour.destinationRu,
                descriptionRu: tour.descriptionRu,
                price: parseFloat(tour.price),
                rating: tour.rating,
                info: tour.info.length > 0 ? tour.info : [""],
                imageUrls: tour.imageUrls,
                isActive: tour.isActive,
            });
        }
    }, [tour, form]);

    const onSubmit = async (values: TourFormValues) => {
        if (!tour) return;
        await mutateAsync({ id: tour.id, payload: values });
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Tour — {tour?.destinationUz}</DialogTitle>
                </DialogHeader>
                <TourForm form={form} onSubmit={onSubmit} isSubmitting={isPending} />
            </DialogContent>
        </Dialog>
    );
}