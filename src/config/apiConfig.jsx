import axios from "axios";

export const apiConfig = axios.create({
  baseURL: "https://backend-api-latest-i5gn.onrender.com/api",
  withCredentials: true, 
});

apiConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
      console.log("Token added to header:", config.headers["Authorization"]); // Kiểm tra token
    } else {
      console.log("No token found in localStorage.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);