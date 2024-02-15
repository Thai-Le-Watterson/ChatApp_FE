import axios from "axios";

let instanceAxios = axios.create({
  baseURL: "http://localhost:8081/api/",
  timeout: 3000,
  withCredentials: true,
});

export default instanceAxios;
