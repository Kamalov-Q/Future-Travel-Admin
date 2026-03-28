export interface Admin {
    id: string;
    email: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    admin: Admin;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    tokenType: string | null;
    admin: Admin | null;
    isAuthenticated: boolean;
    setAuth: (data: LoginResponse) => void;
    updateTokens: (data: RefreshTokenResponse) => void;
    clearAuth: () => void;
}