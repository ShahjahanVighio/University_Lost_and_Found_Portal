import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean; // 👈 Ye batana zaroori hai
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { token, loading, user } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;

  // Agar page admin ka hai aur user admin nahi hai, toh bahar nikalo
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; 
};
export default ProtectedRoute;