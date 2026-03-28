import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, LoginResponse, RefreshTokenResponse } from "../types/auth.types";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            tokenType: null,
            admin: null,
            isAuthenticated: false,

            setAuth: (data: LoginResponse) =>
                set({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    tokenType: data.tokenType,
                    admin: data.admin,
                    isAuthenticated: true,
                }),

            updateTokens: (data: RefreshTokenResponse) =>
                set((state) => ({
                    ...state,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    tokenType: data.tokenType,
                })),

            clearAuth: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    tokenType: null,
                    admin: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);