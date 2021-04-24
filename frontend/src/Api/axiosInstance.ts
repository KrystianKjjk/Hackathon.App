import axios from "axios";

const instance = axios.create({
    baseURL: "https://hackathon-backend-application.herokuapp.com/api/",
    timeout: 15000,
});

export default instance;
