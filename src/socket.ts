import { io } from "socket.io-client";

const serverURL =
  process.env.REACT_APP_NODE_ENV == "production"
    ? process.env.REACT_APP_SERVER_URL
    : process.env.REACT_APP_SERVER_LOCAL;

const socket = io(serverURL || "");

export default socket;
