import axios from "axios";

const API = axios.create({
  baseURL: "https://job-protal-1-bwud.onrender.com", // Correct backend
  timeout: 60000,
  // No need for credentials if public API
});

export default API;
