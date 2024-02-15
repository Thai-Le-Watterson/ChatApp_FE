import { io } from "socket.io-client";

const serverURL = "https://chatapp-a3q1.onrender.com";

const socket = io(serverURL || "http://localhost:8081");

export default socket;
