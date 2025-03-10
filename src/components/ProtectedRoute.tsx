import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

//Prop för att ta in component
interface ProtectedRouteProps {
    children: ReactNode
}

//Används för att skydda routes. Kontrollerar om användaren är inloggad
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    //Om användare inte går att läsa in dirigeras användaren till login-sidan
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute