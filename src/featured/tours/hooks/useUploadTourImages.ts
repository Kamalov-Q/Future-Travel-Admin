import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadsApi } from "../api/uploads.api";

export function useUploadTourImages() {
    return useMutation({
        mutationFn: (files: File[]) => uploadsApi.uploadImages(files),
        onError: () => toast.error("Image upload failed"),
    });
}