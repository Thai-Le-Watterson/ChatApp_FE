import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { User } from "../interfaces";
import { UsersContext } from "../providers";
import { logout } from "../store/slices/userSlice";

import "./Sidebar.scss";
import { useAppDispatch, useAppSelector } from "../hook";
import { Button } from "react-bootstrap";
import authService from "../services/authService";

function Sidebar() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <nav className="bg-secondary pt-md-4 vh-md-100 sidebar-container">
      <div
        className="avatar mx-auto d-sm-none d-none d-md-block"
        style={{ backgroundImage: `url(${user?.avatar})` }}
      ></div>
      <NavLink
        to={`/${user?._id}`}
        className="side-item text-decoration-none d-block text-white w-100 m-0 p-2"
      >
        <i className="fa-solid fa-message d-inline-block px-2"></i>
        Message
      </NavLink>
      <NavLink
        to="/profile"
        className="side-item text-decoration-none d-block text-white w-100 m-0 p-2"
      >
        <i className="fa-solid fa-user d-inline-block px-2"></i>
        Profile
      </NavLink>
      {(user && (
        <Button
          className="button button_logout d-block w-100 m-0 p-2 d-sm-none d-none d-md-block"
          variant="info"
          onClick={() => {
            authService.logout();
            dispatch(logout());
          }}
        >
          Logout
          <i className="fa-solid fa-right-from-bracket px-2"></i>
        </Button>
      )) || (
        <Button
          className="button button_login d-block w-100 m-0 p-2"
          variant="info"
          onClick={() => navigate("/login")}
        >
          Login
          <i className="fa-solid fa-right-to-bracket px-2"></i>
        </Button>
      )}
    </nav>
  );
}

export default Sidebar;
