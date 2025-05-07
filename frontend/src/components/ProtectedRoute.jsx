import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== role) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;