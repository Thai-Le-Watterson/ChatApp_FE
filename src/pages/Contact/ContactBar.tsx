import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ContactBar.scss";

function ContactBar() {
  return (
    <div className="bar-container mh-100vh">
      <NavLink className="contact-option" to={"/contact/friends"}>
        <FontAwesomeIcon icon="user-tag" className="pe-3" />
        Friends
      </NavLink>
      <NavLink className="contact-option" to={"/contact/groups"}>
        <FontAwesomeIcon icon="user-group" className="pe-3" />
        Groups
      </NavLink>
      <NavLink className="contact-option" to={"/contact/add-friend"}>
        <FontAwesomeIcon icon="user-plus" className="pe-3" />
        Add friend
      </NavLink>
      <NavLink className="contact-option" to={"/contact/friend-requests"}>
        <FontAwesomeIcon icon="envelope" className="pe-3" />
        Friend requests
      </NavLink>
    </div>
  );
}

export default ContactBar;
