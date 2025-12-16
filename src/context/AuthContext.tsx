// Auth bootstrap: load stored token once when app starts.
import React, { createContext, useEffect, useState } from "react";
import { clearToken, getToken, saveToken } from "../services/storage";
import { login, logout, me, User } from "../services/auth";
import { setApiToken } from "../services/api";

type AuthContextValue = {
    isLoading: boolean;
    token: string | null;
    user: User | null;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshMe: () => Promise<void>;
};

export var AuthContext = createContext<AuthContextValue>({
    isLoading: true,
    token: null,
    user: null,
    signIn: async function () { },
    signOut: async function () { },
    refreshMe: async function () { },
});

type Props = { children: React.ReactNode };

export function AuthProvider(props: Props): React.JSX.Element {
    var [isLoading, setIsLoading] = useState<boolean>(true);
    var [token, setToken] = useState<string | null>(null);
    var [user, setUser] = useState<User | null>(null);

    useEffect(function () {
        async function bootstrap(): Promise<void> {
            try {
                var stored = await getToken();
                if (stored) {
                    setApiToken(stored);
                    setToken(stored);

                    // optional but recommended: load user details
                    var u = await me();
                    setUser(u);
                }
            } finally {
                setIsLoading(false);
            }
        }

        bootstrap();
    }, []);

    async function signIn(username: string, password: string): Promise<void> {
        setIsLoading(true);

        try {
            var result = await login(username, password); // { token }
            setApiToken(result.token);
            await saveToken(result.token);
            setToken(result.token);

            var currentUser = await me();
            setUser(currentUser);
        } finally {
            setIsLoading(false);
        }
    }

    async function signOut(): Promise<void> {
        setIsLoading(true);
        try {
            await logout();
        } finally {
            await clearToken();
            setApiToken(null);
            setToken(null);
            setUser(null);
            setIsLoading(false);
        }
    }

    async function refreshMe(): Promise<void> {
        var u = await me();
        setUser(u);
    }

    var value: AuthContextValue = {
        isLoading: isLoading,
        token: token,
        user: user,
        signIn: signIn,
        signOut: signOut,
        refreshMe: refreshMe,
    };

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}