import type { Tour } from "../types/tour.types";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ToursTableProps {
    tours: Tour[];
    onEdit: (tour: Tour) => void;
    onDelete: (tour: Tour) => void;
}

export function ToursTable({ tours, onEdit, onDelete }: ToursTableProps) {
    return (
        <div className="rounded-lg border bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="w-16">Image</TableHead>
                        <TableHead>Destination (UZ)</TableHead>
                        <TableHead>Destination (RU)</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tours.map((tour) => (
                        <TableRow key={tour.id} className="hover:bg-slate-50/50">
                            <TableCell>
                                {tour.imageUrls[0] ? (
                                    <img src={tour.imageUrls[0]} alt={tour.destinationUz} className="w-12 h-9 object-cover rounded-md" />
                                ) : (
                                    <div className="w-12 h-9 bg-slate-100 rounded-md" />
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{tour.destinationUz}</TableCell>
                            <TableCell className="text-slate-600">{tour.destinationRu}</TableCell>
                            <TableCell className="font-semibold text-sky-700">{tour.price}</TableCell>
                            <TableCell>
                                <span className="flex items-center gap-1 text-amber-500 font-medium">
                                    <Star className="w-3.5 h-3.5 fill-current" /> {tour.rating}
                                </span>
                            </TableCell>
                            <TableCell><StatusBadge isActive={tour.isActive} /></TableCell>
                            <TableCell className="text-slate-500 text-sm">{formatDate(tour.createdAt)}</TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(tour)}>
                                        <Edit2 className="w-4 h-4 text-sky-600" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onDelete(tour)}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}