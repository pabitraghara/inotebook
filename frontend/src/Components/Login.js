import "./Login.css";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate(); // useNavigate replaces useHistory

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_HOST}api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Login Successfully", " success");
      navigate("/"); // use navigate instead of history.push
    } else {
      props.showAlert("Invalid credentials ", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-login">
        <div className="wrapper">
          <h1 className="title">Login</h1>
          <form className="loginform" onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={credential.email}
                name="email"
                id="email"
                placeholder="Enter Email Address"
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={credential.password}
                name="password"
                placeholder="Enter Password"
                id="password"
                onChange={onChange}
              />
            </div>
            <div className="field">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member?<Link to="/signup"> Signup now</Link>
            </div>

            <div className="optionSocalMedia">Or Connect With Socal Media</div>
            <div className="twitter">
              <a target="_blank" href="http://www.twitter.com">
                <i className="fab fa-twitter"></i>Login With Twitter
              </a>
            </div>
            <div className="facebook">
              <a target="_blank" href="http://www.facebook.com">
                <i className="fab fa-facebook-f"></i>Login With Facebook
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
