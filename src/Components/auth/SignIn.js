import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import login from "../../svg/login.svg";
import AlertContext from "../../context/alerts/alertContext";
import { loginApp } from "../../utils/simpleLogin";

const SignIn = (props) => {
  //Context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  //State
  const [user, saveUser] = useState({
    email: "",
    password: "",
  });

  //get from user
  const { email, password } = user;

  //history to route
  const history = useHistory();

  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //submit
  const onSubmit = (e) => {
    e.preventDefault();

    //validation
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Email and password are required", "alert-error");
      return;
    }

    let localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser === null) {
      showAlert("Oops! you need to register before starting", "alert-error");
      return;
    }

    if (email === localUser.email && password === localUser.password) {
      //use a simple login
      loginApp();
      //redirect
      history.push("/me/google");
    } else {
      showAlert(
        "Email and password are not valid, Try again...",
        "alert-error"
      );
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-lg-6 background-light d-flex align-middle justify-content-center">
          <div className="d-flex justify-content-center">
            <img src={login} alt="login" width="80%" />
          </div>
        </div>
        <div className="col-lg-6 background-dark d-flex justify-content-center">
          <div className="col-lg-8 p-4 align-self-center">
            <h3 className="mb-4">Welcome!</h3>
            <p className="mb-4 font-weight-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              magnam officiis.
            </p>
            <p className="t-grape mb-2"> Login </p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={onChange}
                  value={password}
                  placeholder="Password"
                />
              </div>
              {alert ? (
                <div className={`alert ${alert.category}`}>{alert.msg}</div>
              ) : null}
              <div className="form-group">
                <button type="submit" className="btn mb-2 b-grape">
                  Sign In
                </button>
              </div>
            </form>
            <div>
              <p className="mb-0 col-lg-12 p-0">
                Or login with
                <Link className="google" to="/me/google">
                  {" "}
                  Google
                </Link>
              </p>
              <p className="mb-0 col-lg-12 p-0">
                Don't you have an account? <Link to={"/signup"}> Sign Up </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
