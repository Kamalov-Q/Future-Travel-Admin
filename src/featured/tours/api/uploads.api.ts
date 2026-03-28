import { axiosInstance } from "@/lib/axios";
import type { UploadImagesResponse, UploadImageResponse } from "../types/tour.types";

export const uploadsApi = {
    uploadImage: async (file: File): Promise<UploadImageResponse> => {
        const form = new FormData();
        form.append("file", file);
        const res = await axiosInstance.post("/upload/image", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    uploadImages: async (files: File[]): Promise<UploadImagesResponse> => {
        const form = new FormData();
        files.forEach((f) => form.append("files", f));
        const res = await axiosInstance.post("/upload/images", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },
};