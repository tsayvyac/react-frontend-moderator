import axios from "axios";

const API_BASE = "https://bettercity.mikita.dev/api/v1"
const GEO_BASE = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const GEO_TOKEN = 'pk.eyJ1IjoiaGVyYXNreXJwbSIsImEiOiJjbHIzam80cmoxYThqMmtvMXRoMnFucW1rIn0.-WSVCiwfjWwlylIx_tGXPA'

const getAxiosInstance = (token) => {
    return axios.create({
        baseURL: API_BASE,
        timeout: 20000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
})};

const getAddress = (long, lat) => {
    return axios.get(`${GEO_BASE}${long},${lat}.json?access_token=${GEO_TOKEN}`);
}

export {
    API_BASE,
    getAxiosInstance,
    getAddress
}
