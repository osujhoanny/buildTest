import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";
import logo from "../../svg/logo.svg";
import { logoutApp, isLogin } from "../../utils/simpleLogin";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/me/google">
          <img src={logo} alt="logo" width="40px" />
        </Link>
        <div className="row justify-content-between" id="navbarNav">
          {(isAuthenticated || isLogin) && (
            <ul className="navbar-nav">
              <li className="nav-item pr-2">
                <Link className="nav-link" to="/me/google">
                  Google
                </Link>
              </li>
              <li className="nav-item pr-2">
                <Link className="nav-link" to="/me/github">
                  Github
                </Link>
              </li>
            </ul>
          )}
          <ul className="navbar-nav">
            {(isAuthenticated || isLogin) &&
              (isAuthenticated ? (
                <li className="nav-item  pr-2">
                  {isAuthenticated && (
                    <Link className="nav-link" onClick={() => logout()}>
                      Log out
                    </Link>
                  )}
                </li>
              ) : (
                <li className="nav-item  pr-2">
                  {isLogin && (
                    <Link
                      className="nav-link"
                      onClick={() => logoutApp()}
                      to="/"
                    >
                      Log out
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
