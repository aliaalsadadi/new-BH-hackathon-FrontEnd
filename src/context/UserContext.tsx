import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    email: string;
    fullname?: string;
    progress?: Record<string, Record<number, { completed: boolean; score: number }>>;
}

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchProgress: (email: string) => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const fetchProgress = async (email: string) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASEURL}/api/progress/${email}`);
            if (res.ok) {
                const data = await res.json();
                setUser((prevUser) => (prevUser ? { ...prevUser, progress: data.progress } : null));
            } else {
                console.error('Failed to fetch progress');
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, fetchProgress, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};