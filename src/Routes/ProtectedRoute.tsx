import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hook/authUser/useAuth";

interface ProtectedRouteProps {
  allowedRoles: string;   
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { auth } = useAuth();


  if ( auth?.rols === allowedRoles) {
    return <Outlet />;
  }
 
 
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
