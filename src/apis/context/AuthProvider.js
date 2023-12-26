import {createContext, useContext, useState} from "react";
import Cookies from "js-cookie";




const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const CheckAuth = () => {
        let token = Cookies.get('token')
        let exp = Cookies.get('exp')
        if(window.location.pathname === '/') {
            return
        }

        if (token !== undefined && exp !== undefined) {
            exp = JSON.parse(exp)
            if(exp  < new Date().getTime()){
                Cookies.set('token', undefined)
                Cookies.set('exp', undefined)
                window.location = '/'
            }
            else {
                if(auth === null){
                    setAuth({token, exp})
                }
            }
        }

    }
    CheckAuth();
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext;


