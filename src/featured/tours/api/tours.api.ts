import { axiosInstance } from "@/lib/axios";
import type {
    Tour,
    TourListResponse,
    CreateTourPayload,
    UpdateTourPayload,
    QueryToursParams,
} from "../types/tour.types";

export const toursApi = {
    getAdminTours: async (params: QueryToursParams): Promise<TourListResponse> => {
        const res = await axiosInstance.get("/tours", { params });
        return res.data;
    },

    getTourById: async (id: string): Promise<Tour> => {
        const res = await axiosInstance.get(`/tours/${id}`);
        return res.data;
    },

    createTour: async (payload: CreateTourPayload): Promise<Tour> => {
        const res = await axiosInstance.post("/tours/admin", payload);
        return res.data;
    },

    updateTour: async (id: string, payload: UpdateTourPayload): Promise<Tour> => {
        const res = await axiosInstance.patch(`/tours/admin/${id}`, payload);
        return res.data;
    },

    deleteTour: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/tours/admin/${id}`);
    },
};