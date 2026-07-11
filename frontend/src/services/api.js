import axios from "axios";

const API = axios.create({
  baseURL: "https://codealpha-projectmanagement-backend.onrender.com/api",
});

export default API;