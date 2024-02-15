import { BrowserRouter, Routes, Route } from "react-router-dom";

import UsersProvider from "./providers/User";
import MessagesProvider from "./providers/Message";
import Layout from "./layout/Layout";

import Chat from "./pages/Chat";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import socket from "./socket";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <UsersProvider>
      <MessagesProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route path="/:userId/" element={<Chat />} />
              <Route path="/:userId/:idRoom" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MessagesProvider>
    </UsersProvider>
  );
}

export default App;
