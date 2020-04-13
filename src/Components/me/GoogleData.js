import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import GoogleLogin from "react-google-login";

const Google = () => {
  const [userGoogle, setUserGoogle] = useState({
    picture: "",
    name: "",
    email: "",
  });

  const [response, setResponse] = useState(false);

  const { picture, name, email } = userGoogle;

  useEffect(() => {
    if (response) {
      setUserGoogle(userGoogle);
    }
  }, [response]);

  const responseGoogle = (res) => {
    let responseProfile = {
      picture: res.profileObj.imageUrl,
      name: res.profileObj.name,
      email: res.profileObj.email,
    };

    setUserGoogle(responseProfile);
    setResponse(true);
  };

  const { loading, user } = useAuth0();

  return (
    <Fragment>
      {loading || !user ? (
        <div>
          <h1 className="display-4 col-lg-12">Google Data</h1>
          <div className={`col-lg-12 ${response ? "hide_profile" : ""}`}>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <p className="lead">
                  It seems that you did not log in with google, it is necessary
                  to show you your information, press the button and wait ...
                </p>
                <GoogleLogin
                  clientId="397062016864-us5mjm4b0jpbf4f95dr9uqd79s0dkmas.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </div>
           <div className={`card col-10 col-sm-6 col-lg-3 ${response ? "" : "hide_profile"}`}>
            <img src={picture} className="card-img-top" alt="profile"/>
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{email}</p>
              </div>
            </div>
        </div>
      ) : (
        <div  className="card col-10 col-sm-6 col-lg-3">
          <img src={user.picture} className="card-img-top" alt="profile"/>
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
              </div>
          </div>
      )}
    </Fragment>
  );
};

export default Google;
