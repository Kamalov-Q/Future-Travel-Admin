import { useRef } from "react";
import { useUploadTourImages } from "../hooks/useUploadTourImages";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface TourImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
}

export function TourImageUpload({ value, onChange }: TourImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync: upload, isPending } = useUploadTourImages();

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const result = await upload(Array.from(files));
        const urls = result.items.map((i) => i.url);
        onChange([...value, ...urls]);
    };

    const removeImage = (idx: number) => {
        onChange(value.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
                {value.map((url, idx) => (
                    <div key={idx} className="relative group aspect-video rounded-md overflow-hidden bg-slate-100 border">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={() => inputRef.current?.click()}
                className="gap-2"
            >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                {isPending ? "Uploading..." : "Upload Images"}
            </Button>
        </div>
    );
}