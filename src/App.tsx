import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import importIcons from "./libraryIcon";
import socket from "./socket";

import UsersProvider from "./providers/User";
import MessagesProvider from "./providers/Message";
import Layout from "./layout/Layout";
import Chat from "./pages/Chat";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound/NotFound";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    socket.connect();
    importIcons();

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
              <Route path="/contact">
                <Route index element={<Contact contactLocation="" />} />
                <Route
                  path="/contact/friends"
                  element={<Contact contactLocation="friends" />}
                />
                <Route
                  path="/contact/groups"
                  element={<Contact contactLocation="groups" />}
                />
                <Route
                  path="/contact/add-friend"
                  element={<Contact contactLocation="add-friend" />}
                />
                <Route
                  path="/contact/friend-requests"
                  element={<Contact contactLocation="friend-requests" />}
                />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MessagesProvider>
    </UsersProvider>
  );
}

export default App;
