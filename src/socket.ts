import { io } from "socket.io-client";

// const serverURL = "https://chatapp-a3q1.onrender.com";
const serverURL =
  process.env.NODE_ENV == "production" ? process.env.REACT_APP_SERVER_URL : "";

const socket = io(serverURL || "http://localhost:8081");

export default socket;
