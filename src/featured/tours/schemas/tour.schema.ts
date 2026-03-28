import { z } from "zod";

export const tourSchema = z.object({
    destinationUz: z.string().min(1, "Required"),
    descriptionUz: z.string().min(1, "Required"),
    destinationRu: z.string().min(1, "Required"),
    descriptionRu: z.string().min(1, "Required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    rating: z.coerce.number().min(0).max(5, "Rating must be 0–5"),
    info: z.array(z.string().min(1)).min(1, "Add at least one info item"),
    imageUrls: z.array(z.string().url("Must be a valid URL")).min(1, "Add at least one image"),
    isActive: z.boolean(),
});

export type TourFormValues = z.infer<typeof tourSchema>;