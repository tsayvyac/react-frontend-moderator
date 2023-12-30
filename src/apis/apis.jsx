import axios from "axios";

const API_BASE = "https://bettercity.mikita.dev/api/v1"

const getAxiosInstance = (token) => {
    return axios.create({
        baseURL: API_BASE,
        timeout: 20000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
})};

export {
    API_BASE,
    getAxiosInstance
}
