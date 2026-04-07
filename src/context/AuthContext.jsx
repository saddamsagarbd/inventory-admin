import { createContext, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,        // ← This allows cookies to be sent/received
        headers: {
        "Content-Type": "application/json",
        },
    });


    const registration = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const result = await api.post(`/register`, data);

            console.log("Registration successful:", result.data);

            if(result.data.user) setUser(result.data.user);

            return result.data;

        } catch (error) {
            const errorMessage = 
            error.response?.data?.message || 
            error.message || 
            "Registration failed";

            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }

    }

    const login = async (data) => {

        setLoading(true);
        setError(null);

        try {
            const result = await api.post(`/login`, data);

            // await fetchCurrentUser();

            return result.data;

        } catch (error) {
            const errorMessage = 
            error.response?.data?.message || 
            error.message || 
            "Registration failed";

            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }

    }

    const fetchCurrentUser = async () => {
        try {
            const result = await api.get("/me");        // or "/user" or "/profile"
            setUser(result.data.user || result.data);
            return result.data;
        } catch (error) {
            console.error("fetch user error:", error.message);
            setUser(null);
            return null;
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");        // Backend should clear the cookie
        } catch (error) {
            console.error("Logout error:", error.message);
        } finally {
            setUser(null);
        }
    };

    const _loadUser = async () => {
        await fetchCurrentUser();
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                registration,
                login,
                logout,
                fetchCurrentUser,
                loadUser: _loadUser,
                clearError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}