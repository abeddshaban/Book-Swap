import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import "../stylings/TripplePageStylings/Login.css";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Please enter your eamail");
    }

    if (!password) {
      return alert("Please enter your password");
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            userID: userAuth.user.userID,
            photoURL: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
    history.push("/login");
    // window.location.reload();
  };

  return (
    <>
      <div className="login">
        {/* this is for login  */}
        <h1> login </h1>
        <form>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Password"
            type="password"
          />
          <br />
          <br />
          <button type="submit" onClick={loginToApp}>
            Login
          </button>
        </form>
        <br />
        <h4>
          Don't have an account
          <Link id="link" to="/signup">
            Signup Here!
          </Link>
        </h4>
      </div>
      {/* <footer id="footer"></footer> */}
    </>
  );
}

export default Login;
