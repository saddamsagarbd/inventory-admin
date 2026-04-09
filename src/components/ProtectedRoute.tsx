import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const location = useLocation();

    console.log(`ProtectedRoute → isAuthenticated: ${isAuthenticated}, loading: ${loading}`);

    // ←←← MUST WAIT for auth check to finish on refresh
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg">Verifying authentication...</p>
                {/* You can replace this with a nice spinner component */}
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate
            to="/"
            state={{ from: location }}
            replace
        />;
    }

    return <Outlet />;
};

export default ProtectedRoute;