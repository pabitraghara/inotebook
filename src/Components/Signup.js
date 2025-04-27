import "./Signup.css";
import { useState } from "react";
import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
export const Signup = (props) => {
  const [credential, setCredential] = useState({ name: "", email: "", password: "", confrimpassword: "" });
  let navigate = useNavigate(); // useNavigate replaces useHistory
  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
    // Save the auth token and redirect
    localStorage.setItem('token', json.authtoken);
    props.showAlert("Account Created Successfully", "success");
    navigate("/"); // use navigate instead of history.push
    } 
    else {
      props.showAlert("Invalid Datails ", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container-signup">
        <div className="wrapper">
          <h1 className="title">Signup</h1>
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name :</label>
              <input type="text" className="form-control" id="name" name='name' placeholder='Enter Your Name' onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email :</label>
              <input type="email" className="form-control" id="email" name='email' placeholder='pabitraghara@gmail.com' onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password :</label>
              <input type="password" className="form-control" name='password' placeholder='Ex:-Pabitra@1234' onChange={onChange} id="password" />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="confrimpassword" className="form-label">Re-Password :</label>
              <input type="password" className="form-control" name='confrimpassword' placeholder='Ex:-Pabitra@1234' onChange={onChange} id="confrimpassword" />
            </div> */}
             <div className="field">
                            <input type="submit" value="Signup" />
                        </div>
            <div className="login-link">
              Alredy Signup? <Link to="/login"> login now</Link>
            </div>
            <div className="optionSocalMedia">
              Or Connect With Socal Media
            </div>
            <div className="twitter">
              <a target="_blank" href="http://www.twitter.com"><i className="fab fa-twitter"></i>Sign in With Twitter</a>
            </div>
            <div className="facebook">
              <a target="_blank" href="http://www.facebook.com"><i className="fab fa-facebook-f"></i>Sign in With Facebook</a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
