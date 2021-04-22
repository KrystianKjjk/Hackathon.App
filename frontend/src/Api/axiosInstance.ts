import axios from "axios";

const instance = axios.create({
    baseURL: "url",
    timeout: 15000,
});

export default instance;
