import React, { useEffect, useState } from "react";
import "./Signin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

function Signin() {
  const location = useLocation();
  const navigate = useNavigate();
  const goHomepage = () => {
    navigate("/");
  };
  const [isSignIn, setIsSignIn] = useState(
    location.state !== null && location.state.isSignIn === true
  );
  const [seePassword, setSeePassword] = useState(false);
  const toggleSeePassword = () => {
    const loginPassword = document.querySelector(".login-signup-password");
    loginPassword.type =
      loginPassword.type === "password" ? "text" : "password";
    setSeePassword((seePassword) => !seePassword);
  };
  const signInPage = () => {
    setIsSignIn(true);
  };
  const signUpPage = () => {
    setIsSignIn(false);
  };
  return (
    <div id="login-signup-page">
      <img
        className="square-logo"
        onClick={goHomepage}
        src="../../../img/logo_17_square.png"
        alt=""
      />
      {isSignIn ? (
        <div id="login-page">
          <div className="login-signup-form">
            <div className="login-signup-tabs">
              <div
                onClick={signInPage}
                className={`login-tab ${!isSignIn ? "selected" : ""}`}
              >
                <h2 className="login-title">Sign in</h2>
              </div>
              <div
                onClick={signUpPage}
                className={`signup-tab ${isSignIn ? "selected" : ""}`}
              >
                <h2 className="login-title">Sign up</h2>
              </div>
            </div>
            <div className="field-holder">
              <h4 className="field-title">Email</h4>
              <input type="text" name="email" id="login-email" required />
              <label htmlFor="login-email">example@domain.com</label>
            </div>
            <div className="field-holder">
              <h4 className="field-title">Password</h4>
              <input
                type="password"
                name="password"
                className="login-signup-password"
                required
              />
              {seePassword ? (
                <FontAwesomeIcon
                  className="see-password"
                  title="Hide password"
                  onClick={toggleSeePassword}
                  icon={faEye}
                />
              ) : (
                <FontAwesomeIcon
                  className="see-password"
                  title="Show password"
                  onClick={toggleSeePassword}
                  icon={faEyeSlash}
                />
              )}
            </div>
            <button id="forgot-password">Forgot your password?</button>
            <button id="submit-login">Sign in</button>
            <div className="other-login-options">
              <div className="login-with-other-options">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                    fill="#542811"
                  ></path>{" "}
                </svg>
                <div className="login-others-text">
                  <p>Login with</p>
                  <p>Facebook</p>
                </div>
              </div>
              <div className="login-with-other-options">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                    fill="#542811"
                  ></path>{" "}
                </svg>
                <div className="login-others-text">
                  <p>Login with</p>
                  <p>Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="signup-page">
          <div className="login-signup-form signup">
            <div className="login-signup-tabs">
              <div
                onClick={signInPage}
                className={`login-tab ${!isSignIn ? "selected" : ""}`}
              >
                <h2 className="login-title">Sign in</h2>
              </div>
              <div
                onClick={signUpPage}
                className={`signup-tab ${isSignIn ? "selected" : ""}`}
              >
                <h2 className="login-title">Sign up</h2>
              </div>
            </div>
            <div className="field-holder">
              <h4 className="field-title">Your Name</h4>
              <input
                placeholder="First and Last name"
                type="text"
                name="text"
                required
              />
            </div>
            <div className="field-holder">
              <h4 className="field-title">Email</h4>
              <input type="text" name="email" id="signup-email" required />
              <label htmlFor="signup-email">example@domain.com</label>
            </div>
            <div className="field-holder">
              <h4 className="field-title">Password</h4>
              <input
                className="login-signup-password"
                type="password"
                name="password"
                required
              />
              {seePassword ? (
                <FontAwesomeIcon
                  className="see-password"
                  title="Hide password"
                  onClick={toggleSeePassword}
                  icon={faEye}
                />
              ) : (
                <FontAwesomeIcon
                  className="see-password"
                  title="Show password"
                  onClick={toggleSeePassword}
                  icon={faEyeSlash}
                />
              )}
            </div>
            <button id="submit-signup">Sign up</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signin;
