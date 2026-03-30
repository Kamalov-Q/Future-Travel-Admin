import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema, type TourFormValues } from "../schemas/tour.schema";
import type { CreateTourPayload, Tour } from "../types/tour.types";
import { useUpdateTour } from "../hooks/useUpdateTour";
import { TourForm } from "./tour-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface EditTourModalProps {
    open: boolean;
    onClose: () => void;
    tour: Tour | null;
}

const emptyDefaults: TourFormValues = {
    destinationUz: "",
    descriptionUz: "",
    destinationRu: "",
    descriptionRu: "",
    price: 0,
    rating: 4.5,
    info: [],
    imageUrls: [],
    isActive: true,
};

export function EditTourModal({
    open,
    onClose,
    tour,
}: EditTourModalProps) {
    const defaultValues = useMemo<TourFormValues>(() => {
        if (!tour) return emptyDefaults;

        return {
            destinationUz: tour.destinationUz ?? "",
            descriptionUz: tour.descriptionUz ?? "",
            destinationRu: tour.destinationRu ?? "",
            descriptionRu: tour.descriptionRu ?? "",
            price:
                typeof tour.price === "string"
                    ? Number.parseFloat(tour.price)
                    : Number(tour.price ?? 0),
            rating: Number(tour.rating ?? 4.5),
            info: Array.isArray(tour.info) ? tour.info : [],
            imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [],
            isActive: Boolean(tour.isActive),
        };
    }, [tour]);

    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourSchema),
        defaultValues: emptyDefaults,
    });

    const { mutateAsync, isPending } = useUpdateTour(() => {
        onClose();
    });

    useEffect(() => {
        if (open && tour) {
            form.reset(defaultValues);
        }

        if (!open) {
            form.reset(emptyDefaults);
        }
    }, [open, tour, defaultValues, form]);

    const onSubmit = async (values: TourFormValues) => {
        if (!tour) return;

        const payload: CreateTourPayload = {
            ...values,
            price: Number(values.price),
            rating: Number(values.rating)
        };

        await mutateAsync({
            id: tour.id,
            payload,
        });
    };

    return (
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Edit Tour {tour ? `— ${tour.destinationUz}` : ""}
                    </DialogTitle>
                </DialogHeader>

                <TourForm
                    form={form}
                    onSubmit={onSubmit}
                    isSubmitting={isPending}
                    submitLabel="Update Tour"
                />
            </DialogContent>
        </Dialog>
    );
}