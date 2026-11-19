import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/User';
 
type AuthContextType = {
    users: User[];
    currentUser: User | null;
    register: (username: string, email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
};
 
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
type AuthProviderProps = {
    children: ReactNode;
};
 
export function AuthProvider({ children }: AuthProviderProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
 
    const register = (username: string, email: string, password: string) => {
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        const newUser: User = {
            id: Date.now().toString(),
            name: username,
            email: email,
            password: password
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setCurrentUser(newUser);
    };

    const login = (email: string, password: string) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                users,
                currentUser,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}