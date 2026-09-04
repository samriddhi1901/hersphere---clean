import axios from "axios";

const API = axios.create({
    baseURL: "https://herspherebackend.onrender.com/api",
});

export default API;