// src/auth/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        // можешь вернуть спиннер, если хочешь
        return null;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
