import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType, RegisterCredentials } from "../types/auth.types";
import { jwtDecode } from 'jwt-decode';

// Initierar AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

// Interface för Authprovider
export interface AuthProviderProps {
    children: ReactNode
}

// exporterar en komponent med namnet AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    // initierar user
    const [user, setUser] = useState<User | null>(null);

    // Funktion för inloggning, tar in parameter för inloggningsuppgifter
    const login = async (credentials: LoginCredentials) => {

        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) {
                throw new Error("Inloggning misslyckades");
            }

            // Datan lagras med user samt access_token
            const data = await res.json() as AuthResponse;

            // Avkodar användare från jwt
            const decoded: User = jwtDecode(data.access_token);

            // Lagrar jwt i localstorage
            localStorage.setItem("trespasser", data.access_token);

            // Deklarerar setUser utifrån avkodad jwt
            setUser({
                email: decoded.email,
                name: decoded.name,
                isAdmin: decoded.isAdmin,
            });

        } catch (error) {
            throw error;
        }
    }

    // Funktion för registrering, tar in parameter för registrering
    const register = async (credentials: RegisterCredentials) => {

        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) {
                throw new Error("Registrering misslyckades");
            }

        } catch (error) {
            throw error;
        }
    }

    // Kontrollerar om användaren har en giltig token
    const checkToken = async () => {
        const token = localStorage.getItem("trespasser");

        if (!token) {
            return;
        }
        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (res.ok) {
                const decoded: User = jwtDecode(token);
                setUser({
                    email: decoded.email,
                    name: decoded.name,
                    isAdmin: decoded.isAdmin,
                });
            }

        } catch (error) {
            localStorage.removeItem("trespasser");
            setUser(null);
            console.log("Error: " + error);
        }
    }

    // Loggar ut användare
    const logout = () => {
        localStorage.removeItem("trespasser");
        setUser(null);
    }

    // Vid start av sidor som använder AuthContext kontrolleras användaren
    useEffect(() => {
        checkToken();
    }, [])

    //Returnerar Context med funktioner samt data
    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

//Exporterar Context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider")
    }

    return context;
}

