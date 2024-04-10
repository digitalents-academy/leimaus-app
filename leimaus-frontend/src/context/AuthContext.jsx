import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => setError(null), 3000);
        return () => {
            clearInterval(interval);
        }
    }, [error]);

    const register = async (name, password) => {
        try {
            await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "content-type": "application/JSON",
                },
                body: JSON.stringify({ name: name, password: password }),
            });
        } catch (e) {
            console.log(e);
        }
    };

    const login = async (name, password) => {
        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "content-type": "application/JSON",
                },
                body: JSON.stringify({ name: name, password: password }),
            });
            const data = await res.json();
            if (data.name) {
                setUser(data.name);
            } else {
                setError(data.error);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const logout = () => {
        setUser(null)
    }

    return <UserContext.Provider value={{ user, error, register, login, logout }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
    return useContext(UserContext);
};