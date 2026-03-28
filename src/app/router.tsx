import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LoginForm } from "@/featured/auth/components/login-form";
import { ProtectedRoute } from "@/featured/auth/components/protected-route";
import { DashboardPage } from "@/featured/dashboard/pages/dashboard-page";
import { ToursPage } from "@/featured/tours/pages/tours-page";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginForm />,
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <Navigate to="/dashboard" replace /> },
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "tours", element: <ToursPage /> },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);