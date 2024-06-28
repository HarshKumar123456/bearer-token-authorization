import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({
        user: null,
    });

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if(data){
            const parseData = JSON.parse(data);
            setAuth({...auth,user: parseData.user});
        }
    },[]);
    
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook 
const useAuthSession = () => useContext(AuthContext);

export {useAuthSession,AuthProvider};