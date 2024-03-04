import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {
  faAddressBook,
  faUser,
  faRightFromBracket,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import authService from "../services/authService";

import "./Sidebar.scss";
import importIcons from "../libraryIcon";

function Sidebar() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

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
        <FontAwesomeIcon icon={faMessage} className="d-inline-block px-2" />
        Message
      </NavLink>
      <NavLink
        to="/contact"
        className="side-item text-decoration-none d-block text-white w-100 m-0 p-2"
      >
        {/* <i className="fa-solid fa-address-book d-inline-block px-2"></i> */}
        <FontAwesomeIcon icon={faAddressBook} className="d-inline-block px-2" />
        Contact
      </NavLink>
      <NavLink
        to="/profile"
        className="side-item text-decoration-none d-block text-white w-100 m-0 p-2"
      >
        {/* <i className="fa-solid fa-user d-inline-block px-2"></i> */}
        <FontAwesomeIcon icon={faUser} className="d-inline-block px-2" />
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
          <FontAwesomeIcon icon={faRightFromBracket} className="px-2" />
        </Button>
      )}
    </nav>
  );
}

export default Sidebar;
