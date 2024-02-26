import { Container, Button } from "react-bootstrap";

import { useAppSelector, useAppDispatch } from "../../hook";
import { login, logout } from "../../store/slices/userSlice";
import authService from "../../services/authService";

import "./Profile.scss";

function Profile() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  console.log(user.user?.avatar);
  return (
    <Container className="profile_container text-center d-flex flex-column justify-content-between">
      <div className="user_infor">
        <div
          className="avatar mx-auto mt-3 mb-2"
          style={{ backgroundImage: `url('${user?.user?.avatar}')` }}
        ></div>
        <div className="user_name">{user.user?.fullName}</div>
      </div>
      <Button
        className="button button_logout d-block mx-0 mb-3 p-2 d-sm-block d-block d-md-none"
        variant="info"
        onClick={() => {
          authService.logout();
          dispatch(logout());
        }}
      >
        Logout
        <i className="fa-solid fa-right-from-bracket px-2"></i>
      </Button>
    </Container>
  );
}

export default Profile;
