import { useAppSelector, useAppDispatch } from "../../hook";
import { login, logout } from "../../store/slices/userSlice";

function Profile() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return <div>Profile Page</div>;
}

export default Profile;
