import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { login } from "../../store/slices/userSlice";
import authService from "../../services/authService";
import type { UserStateSlice } from "../../interfaces";
import { useAppDispatch } from "../../hook";

import "./Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    const data = await authService.signUp(email, password, fullName, avatar);
    const userData: UserStateSlice = { user: data?.user, token: data?.token };

    dispatch(login(userData));
    navigate(`/${userData.user?._id}`);
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* <!-- Full Name input --> */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={() => handleSignup()}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <NavLink to="/login" className="link-danger">
                    Login
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
