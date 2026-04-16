import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        // Default to JSON - we'll override only when needed
    },
});

// Request Interceptor - Smart Content-Type handling
axiosInstance.interceptors.request.use((config) => {
    // If the request contains FormData (file upload), let the browser set the boundary
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];   // Very Important!
    }
    // Otherwise, axios will automatically set application/json for objects
    return config;
});

// Optional: Response Interceptor (for global error handling)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;