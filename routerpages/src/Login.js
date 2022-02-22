import React from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
const Login = () => {
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const uname = e.target.elements.username.value;
    const pwd = e.target.elements.password.value;
    if (uname === "admin" && pwd === "admin") {
      console.log("Login");
      history.push("/home");
    } else {
      alert("Wrong Credentials");
    }
  };

  return (
    <Router>
      <div className="signupGrid">
        <div>
          <h1>Login</h1>
        </div>
        <div className="loginform">
          <form onSubmit={handleSubmit}>
            <label>
              Username :
              <input type="text" name="username" />
            </label>
            <br />
            <label>
              Password :
              <input type="password" name="password" />
            </label>
            <br />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Router>
  );
};
export default Login;
