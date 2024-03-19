import axios from "axios";

const api = axios.create({
  baseURL: "https://vesta.etetis.com.br/app",
  headers: {
    "x-app-token": "9be1902126b85421b69873b6fafaf1cc",
  },
});

export default api;
