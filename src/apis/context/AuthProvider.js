import {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";


(function isAuthenticated () {
    if(window.location.pathname !== '/login'){
        return
        // let token = Cookies.get('token')
        // if (token !== undefined) {
        //     let exp = JSON.parse(token).then(res => res.expires);
        //     if(exp  < new Date().getTime()){
        //         return
        //     }
        // }
        window.location = '/login';
    }
})()

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    useEffect(() => {
        Cookies.set('token', auth)
    }, [auth]);
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;