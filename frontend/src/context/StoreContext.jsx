import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "https://finance-tracker-3-akbj.onrender.com";
    const [token, setToken] = useState(localStorage.getItem("token") || ""); // Initialize with localStorage value

    useEffect(() => {
        const loadData = () => {    
            const storedToken = localStorage.getItem("token");
            if (storedToken && storedToken !== token) {
                console.log("Token found in localStorage:", storedToken);
                setToken(storedToken);
            }
        };
        loadData();
    }, []); 

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token); // Store token in localStorage when it updates
        }
    }, [token]);

    const contextValue = { url, token, setToken };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
