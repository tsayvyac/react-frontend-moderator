import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'exp']);
    const nav = useNavigate()

    const checkAuth = () => {
        if(window.location.pathname === '/login') {
            return
        }

        const { token, exp } = cookies;
        if (token && exp) {
            const expirationTime = JSON.parse(exp);
            if (expirationTime < new Date().getTime()) {
                removeCookie('token', { path: '/' });
                removeCookie('exp', { path: '/' });
                nav('/login');
            }
        }
        else {
            nav("/login")
        }
    }

    const setTokenAndCookie = (exp, newToken) => {
        setCookie('exp', exp, { path: '/' });
        setCookie('token', newToken, { path: '/' });
    };

    const getToken = () => {
        return cookies.token
    }

    useEffect(() => {
        checkAuth()
    }, []);

    return (
        <AuthContext.Provider value={{getToken, setTokenAndCookie}}>
            {children}
        </AuthContext.Provider>
    )

}




export default AuthContext;


