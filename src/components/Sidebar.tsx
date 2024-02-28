// import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { User } from "../interfaces";
// import { UsersContext } from "../providers";
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
        {/* <i className="fa-solid fa-message d-inline-block px-2"></i> */}
        <FontAwesomeIcon icon="message" className="d-inline-block px-2" />
        Message
      </NavLink>
      <NavLink
        to="/friends"
        className="side-item text-decoration-none d-block text-white w-100 m-0 p-2"
      >
        {/* <i className="fa-solid fa-address-book d-inline-block px-2"></i> */}
        <FontAwesomeIcon icon="address-book" className="d-inline-block px-2" />
        Friends
      </NavLink>
      <NavLink
        to="/profile"
        className="side-item text-decoration-none d-block text-white w-100 m-0 p-2"
      >
        {/* <i className="fa-solid fa-user d-inline-block px-2"></i> */}
        <FontAwesomeIcon icon="user" className="d-inline-block px-2" />
        Profile
      </NavLink>
      {user && (
        <Button
          className="button button_logout d-block w-100 m-0 p-2 d-sm-none d-none d-md-block"
          variant="info"
          onClick={() => {
            authService.logout();
            dispatch(logout());
          }}
        >
          Logout
          {/* <i className="fa-solid fa-right-from-bracket px-2"></i> */}
          <FontAwesomeIcon icon="right-from-bracket" className="px-2" />
        </Button>
      )}
    </nav>
  );
}

export default Sidebar;
