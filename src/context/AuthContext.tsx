import React, {createContext, useContext, useEffect, useState} from "react";
import {User} from "../types/interfaces/User";
import {useAuth0} from "@auth0/auth0-react";
import API from "../api/axiosWrapper";

export interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const {loginWithRedirect, logout} = useAuth0();

    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const location = window.location.pathname;

    useEffect(() => {
        if (isAuthenticated && location !== '/signup' && location !== '/home') {
            getAccessTokenSilently()
                .then((response) => {
                    localStorage.setItem('auth0token', response);
                    try {
                        API.post(`/user/login`, {});
                        if (!user) {
                            API.get(`/user/by/token`).then((response2) => {
                                setUser(response2.data);
                            });
                        }
                    } catch (e) {
                        console.log(e);
                        logout();
                    }
                })
                .catch(console.log);

        }
    }, [isAuthenticated, getAccessTokenSilently, location, user]);

    return (
        <AuthContext.Provider
            value={{user, isAuthenticated}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};