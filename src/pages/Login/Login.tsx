import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hook";
import { login } from "../../store/slices/userSlice";
import authService from "../../services/authService";

import "./Login.scss";
import { UserStateSlice } from "../../interfaces";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const data = await authService.login(email, password);
    const userData: UserStateSlice = { user: data?.user, token: data?.token };

    dispatch(login(userData));
    navigate(`/${userData.user?._id}`);
  };

  console.log("ok");

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              {/* // Email input  */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* // Password input  */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <NavLink to="#">Forgot password?</NavLink>
              </div>

              {/* // Submit button  */}
              <button
                type="button"
                onClick={() => handleLogin()}
                className="btn btn-primary btn-lg btn-block mx-auto d-block"
              >
                Sign in
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0 text-center">
                Don't have an account?{" "}
                <NavLink to="/register" className="link-danger">
                  Register
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
