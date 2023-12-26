import axios from "axios";
import AuthContext from "./context/AuthProvider";
import Cookies from "js-cookie";

export const API_BASE = "https://bettercity.mikita.dev/api/v1/admin"

export const instance = (path) => axios.create({
    baseURL: path,
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`
    }
});

