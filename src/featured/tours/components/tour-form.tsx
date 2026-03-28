import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { TourFormValues } from "../schemas/tour.schema";
import { TourImageUpload } from "./tour-image-upload";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface TourFormProps {
    form: UseFormReturn<TourFormValues>;
    onSubmit: (values: TourFormValues) => Promise<void> | void;
    isSubmitting?: boolean;
    submitLabel?: string;
}

export function TourForm({
    form,
    onSubmit,
    isSubmitting = false,
    submitLabel = "Save",
}: TourFormProps) {
    const infoFieldArray = useFieldArray({
        control: form.control,
        name: "info",
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="destinationUz"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination (UZ)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Antaliya" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="destinationRu"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination (RU)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Анталия" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="descriptionUz"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (UZ)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="O'zbekcha tavsif..."
                                    className="min-h-28"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="descriptionRu"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (RU)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Русское описание..."
                                    className="min-h-28"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        inputMode="decimal"
                                        min={0}
                                        step="0.01"
                                        placeholder="1200"
                                        {...field}
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) =>
                                            field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)
                                        }
                                    />
                                </FormControl>
                                <FormDescription>Example: 1200</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        inputMode="decimal"
                                        min={0}
                                        max={5}
                                        step="0.1"
                                        placeholder="4.5"
                                        {...field}
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) =>
                                            field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)
                                        }
                                    />
                                </FormControl>
                                <FormDescription>Value from 0 to 5</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium">Info Items</h3>
                            <p className="text-sm text-muted-foreground">
                                Add included services or short details.
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => infoFieldArray.append({ text: "" })}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Info
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {infoFieldArray.fields.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                                No info rows yet.
                            </div>
                        ) : (
                            infoFieldArray.fields.map((item, index) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name={`info.${index}.text`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Aviachipta"
                                                        {...field}
                                                        value={field.value ?? ""}
                                                    />
                                                </FormControl>

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => infoFieldArray.remove(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))
                        )}
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="imageUrls"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <TourImageUpload
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-1">
                                <FormLabel>Active</FormLabel>
                                <FormDescription>
                                    Inactive tours will be hidden from public users.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={Boolean(field.value)}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : submitLabel}
                    </Button>
                </div>
            </form>
        </Form>
    );
}