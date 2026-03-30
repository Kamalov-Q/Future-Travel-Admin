import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema, type TourFormValues } from "../schemas/tour.schema";
import type { CreateTourPayload } from "../types/tour.types";
import { useCreateTour } from "../hooks/useCreateTour";
import { TourForm } from "./tour-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CreateTourModalProps {
    open: boolean;
    onClose: () => void;
}

const defaultValues: TourFormValues = {
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

export function CreateTourModal({
    open,
    onClose,
}: CreateTourModalProps) {
    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourSchema),
        defaultValues,
    });

    const { mutateAsync, isPending } = useCreateTour(() => {
        form.reset(defaultValues);
        onClose();
    });

    useEffect(() => {
        if (!open) {
            form.reset(defaultValues);
        }
    }, [open, form]);

    const onSubmit = async (values: TourFormValues) => {
        const payload: CreateTourPayload = {
            ...values,
            price: Number(values.price),
            rating: Number(values.rating),
        };

        await mutateAsync(payload);
    };

    return (
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Tour</DialogTitle>
                </DialogHeader>

                <TourForm
                    form={form}
                    onSubmit={onSubmit}
                    isSubmitting={isPending}
                    submitLabel="Create Tour"
                />
            </DialogContent>
        </Dialog>
    );
}