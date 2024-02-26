import axios from "axios";

const serverURL =
  process.env.NODE_ENV == "production"
    ? process.env.REACT_APP_SERVER_URL
    : process.env.REACT_APP_SERVER_LOCAL;

let instanceAxios = axios.create({
  baseURL: serverURL + "/api/",
  timeout: 3000,
  withCredentials: true,
});

export default instanceAxios;
