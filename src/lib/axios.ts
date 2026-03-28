import { useAuthStore } from "@/featured/auth/store/auth.store";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Track if we're currently refreshing to avoid loops
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: string) => void;
    reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token!);
    });
    failedQueue = [];
}

/** 401 on login means bad credentials — must not run refresh / full-page redirect to /login */
function isAuthLoginRequest(url: string | undefined): boolean {
    if (!url) return false;
    return /\/auth\/login(\?|$)/.test(url) || url.endsWith("/auth/login");
}

// Request interceptor — attach access token
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { accessToken, tokenType } = useAuthStore.getState();
        if (accessToken && config.headers) {
            config.headers["Authorization"] = `${tokenType ?? "Bearer"} ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle 401 + refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            isAuthLoginRequest(originalRequest.url)
        ) {
            return Promise.reject(error);
        }

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        const { refreshToken, updateTokens, clearAuth } = useAuthStore.getState();

        if (!refreshToken) {
            clearAuth();
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
            const data = response.data;
            updateTokens(data);
            processQueue(null, data.accessToken);
            originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            clearAuth();
            window.location.href = "/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);