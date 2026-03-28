import { axiosInstance } from "@/lib/axios";
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from "../types/auth.types";

export const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const res = await axiosInstance.post("/auth/login", data);
        return res.data;
    },

    refresh: async (refreshToken: string): Promise<RefreshTokenResponse> => {
        const res = await axiosInstance.post("/auth/refresh", { refreshToken });
        return res.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post("/auth/logout");
    },
};