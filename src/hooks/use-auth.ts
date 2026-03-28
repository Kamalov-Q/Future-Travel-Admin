import { authApi } from "@/featured/auth/api/auth.api";
import { useAuthStore } from "@/featured/auth/store/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useAuth() {
    const store = useAuthStore();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await authApi.logout();
        } catch {
            // ignore
        } finally {
            store.clearAuth();
            navigate("/login");
            toast.success("Logged out");
        }
    };

    return { ...store, logout };
}