import { z } from "zod";

const numberField = z.preprocess(
  (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
  z.number({ message: "Must be a number" })
) as unknown as z.ZodNumber;

export const tourInfoItemSchema = z.object({
  uz: z.string().min(1, "UZ is required"),
  ru: z.string().min(1, "RU is required")
})

export const tourSchema = z.object({
  destinationUz: z.string().min(1, "Required"),
  descriptionUz: z.string().min(1, "Required"),
  destinationRu: z.string().min(1, "Required"),
  descriptionRu: z.string().min(1, "Required"),
  price: numberField.pipe(z.number().min(0, "Price must be positive")),
  rating: numberField.pipe(z.number().min(0).max(5, "Rating must be 0–5")),
  info: z.array(tourInfoItemSchema),
  imageUrls: z.array(z.string().url("Must be a valid URL")),
  isActive: z.boolean(),
});

export type TourFormValues = z.infer<typeof tourSchema>;