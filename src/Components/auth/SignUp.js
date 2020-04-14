import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import register from "../../svg/register.svg";

const SignUp = () => {
  //Context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  //State
  const [user, saveUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  //get from user
  const { firstname, lastname, email, password, retypePassword } = user;

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
    //validations
    if (
      firstname.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      retypePassword.trim() === ""
    ) {
      showAlert(
        "First name, email, password and retype password are required",
        "alert-error"
      );
      return;
    }

    if (password.length < 6) {
      showAlert("Password must be min 6 characters", "alert-error");
      return;
    }

    if (password !== retypePassword) {
      showAlert("Make sure your passwords match", "alert-error");
      return;
    }

    //save in localstorage
    localStorage.setItem("user", JSON.stringify(user));

    //go to login
    history.push("/");
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-lg-6 background-light d-flex align-middle justify-content-center">
          <div className="d-flex justify-content-center">
            <img src={register} alt="register" width="80%" />
          </div>
        </div>
        <div className="col-lg-6 background-dark d-flex justify-content-center">
          <div className="col-lg-8 p-4 align-self-center">
            <h3 className="mb-4">Lorem ipsum, dolor sit amet consectetur.</h3>
            <p className="mb-4 font-weight-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              magnam officiis.
            </p>
            <p className="t-grape mb-2"> Sign Up </p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  onChange={onChange}
                  value={firstname}
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  onChange={onChange}
                  value={lastname}
                  placeholder="Last Name"
                />
              </div>
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="retypePassword"
                  name="retypePassword"
                  onChange={onChange}
                  value={retypePassword}
                  placeholder="Retype Password"
                />
              </div>
              {alert ? (
                <div className={`alert ${alert.category}`}>{alert.msg}</div>
              ) : null}
              <div className="form-group">
                <button type="submit" className="btn b-grape mb-2">
                  Create Account
                </button>
              </div>
            </form>
            <p className="mb-0 col-lg-12 p-0">
              {" "}
              Already have an account? <Link to={"/buildTest"}>Sign In</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
