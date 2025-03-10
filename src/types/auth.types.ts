//Interface för användare
export interface User {
    email: string,
    name: string,
    isAdmin: boolean
}

//Interface för att logga in
export interface LoginCredentials {
    email: string,
    password: string
}

//Interface för att registrera användare
export interface RegisterCredentials {
    name: string,
    email: string,
    password: string
}

//Interface med användare samt JWT
export interface AuthResponse {
    user: User,
    access_token: string
}

//Interface för att dela AuthContext med dess metoder och interfaces till sidor och komponenter
export interface AuthContextType {
    user: User | null,
    login: (Credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    register: (Credentials: RegisterCredentials) => Promise<void>;
}

