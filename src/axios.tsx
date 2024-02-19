import axios from "axios";

const serverURL = "https://chatapp-a3q1.onrender.com/api";
// const serverURL = "";

let instanceAxios = axios.create({
  baseURL: serverURL || "http://localhost:8081/api/",
  timeout: 3000,
  withCredentials: true,
});

export default instanceAxios;
