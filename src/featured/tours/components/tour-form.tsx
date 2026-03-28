import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { TourFormValues } from "../schemas/tour.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TourImageUpload } from "./tour-image-upload";
import { Plus, Trash2 } from "lucide-react";

interface TourFormProps {
    form: UseFormReturn<TourFormValues>;
    onSubmit: (values: TourFormValues) => void;
    isSubmitting: boolean;
}

export function TourForm({ form, onSubmit, isSubmitting }: TourFormProps) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "info",
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="destinationUz" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Destination (UZ)</FormLabel>
                            <FormControl><Input placeholder="Antaliya" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="destinationRu" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Destination (RU)</FormLabel>
                            <FormControl><Input placeholder="Анталия" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="descriptionUz" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (UZ)</FormLabel>
                            <FormControl><Textarea rows={3} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="descriptionRu" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (RU)</FormLabel>
                            <FormControl><Textarea rows={3} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl><Input type="number" min={0} step={0.01} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="rating" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating (0–5)</FormLabel>
                            <FormControl><Input type="number" min={0} max={5} step={0.1} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="isActive" render={({ field }) => (
                        <FormItem className="flex flex-col justify-center">
                            <FormLabel>Active</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>

                {/* Info items */}
                <div>
                    <FormLabel>Info Items</FormLabel>
                    <div className="space-y-2 mt-2">
                        {fields.map((field, idx) => (
                            <div key={field.id} className="flex gap-2">
                                <FormField control={form.control} name={`info.${idx}` as const} render={({ field }) => (
                                    <FormItem className="flex-1 mb-0">
                                        <FormControl><Input placeholder="e.g. Aviachipta" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(idx)}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => append("")} className="gap-2">
                            <Plus className="w-4 h-4" /> Add Info Item
                        </Button>
                    </div>
                    {form.formState.errors.info && (
                        <p className="text-sm text-red-500 mt-1">{form.formState.errors.info.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <FormField control={form.control} name="imageUrls" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                            <TourImageUpload value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Tour"}
                </Button>
            </form>
        </Form>
    );
}