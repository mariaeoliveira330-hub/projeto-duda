import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000/object',
})

export default api;
