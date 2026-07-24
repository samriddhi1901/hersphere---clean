import axios from "axios";

const API = axios.create({
    baseURL: "https://hersphere-backend.onrender.com/api",
});

export default API;
