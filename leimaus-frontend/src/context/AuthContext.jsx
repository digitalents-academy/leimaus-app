import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (name, password) => {
        try {
            await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "content-type": "application/JSON",
                },
                body: JSON.stringify({ name: name, password: password }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const login = async (name, password) => {
        console.log("login test frontend")
        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "content-type": "application/JSON",
                },
                body: JSON.stringify({ name: name, password: password }),
            });
            const data = await res.json();
            setUser(data.name);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(null)
    }

    return <UserContext.Provider value={{ user, register, login, logout }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
    return useContext(UserContext);
};