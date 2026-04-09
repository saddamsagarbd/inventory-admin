import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from '../config/axiosConfig';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Axios interceptor
    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                if (token) config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (err) => Promise.reject(err)
        );
        return () => api.interceptors.request.eject(interceptor);
    }, [token]);

    // Run auth check on app start / refresh
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const response = await api.get('/auth/verify');

            console.log("🔍 /auth/verify response:", response.data);

            if (response.data?.isAuthenticated && response.data?.user) {
                setIsAuthenticated(true);
                setUser(response.data.user);
                if (response.data.token) {
                    setToken(response.data.token);
                }
            } else {
                resetAuth();
            }
        } catch (err) {
            console.error("Auth check failed:", err.response?.data || err.message);
            resetAuth();
        } finally {
            setLoading(false);
        }
    };

    const resetAuth = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
    };

    const login = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.post("/login", data);
            if (result.data?.token && result.data?.user) {
                setToken(result.data.token);
                setUser(result.data.user);
                setIsAuthenticated(true);
                return result.data;
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Login failed";
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (err) {
            console.error(err);
        } finally {
            resetAuth();
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                token,
                loading,
                error,
                login,
                logout,
                clearError,
                checkAuthStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};