import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 60 * 2,
            refetchOnWindowFocus: false,
        },
        mutations: {
            onError: (error: unknown) => {
                const msg =
                    error instanceof Error ? error.message : "Something went wrong";
                toast.error(msg);
            },
        },
    },
});