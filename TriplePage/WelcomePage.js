/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import "../stylings/TripplePageStylings/WelcomePage.css";
import "../stylings/TripplePageStylings/Login.css";
import WelcomeLogo from "../images/logo 800x800px.png";
// import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import PersonIcon from "@material-ui/icons/PermIdentity";
import MailIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
// import TodayIcon from "@material-ui/icons/Today";

function WelcomePage() {
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
    history.push("/WelcomePage");
    // window.location.reload();
  };

  // this is for the signup page

  const [fullName, setFullName] = useState("");
  // const [birthDate, setBirthDate] = useState("");
  const [
    profilePic,
    // setProfilePic
  ] = useState("");

  const register = (e) => {
    e.preventDefault();
    if (!fullName) {
      return alert("Please enter your Full Name");
    }

    if (!email) {
      return alert("Please enter your eamail");
    }

    if (!password) {
      return alert("Please enter your password");
    }
    // if (!profilePic) {
    //   return alert(
    //     "Please select a profile picture"
    //   );
    // }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            // never change displayName since it is an element
            displayName: fullName,
            photoURL: profilePic,
          })
          .catch((error) => alert(error))
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: fullName,
                photoURL: profilePic,
              })
            );
          });
      })

      .catch((error) => alert(error));

    history.push("/home");
  };
  return (
    <div className="page">
      <section className="section">
        <div className="title">
          <h1 className="title__text">
            welcome To
            <span id="app__name"> Project 2117</span>
          </h1>
          <div className="image1">
            <img
              id="FirstImage"
              src={WelcomeLogo}
              alt="The best website for exchanging books."
            />
          </div>
        </div>
        <div className="text__h3">
          <h3>
            Now login to your Project 2117 account. Don't have an accout?
            {/* <Link id="link" to="/signup"> */}
            <a id="link" href="#signup__div">
              signup now!
            </a>
            {/* </Link> */}
          </h3>
        </div>
        <div className="navigation">
          {/* <Link id="signup" to="/signup"> */}
          <a id="signup" href="#signup__div">
            <button id="signup__btn">Signup</button>
          </a>
          {/* </Link> */}
          <br />
          {/* <Link id="login" to="/login"> */}
          <a id="login" href="#login__div">
            <button id="login__btn">Login</button>
          </a>
          {/* </Link> */}
        </div>

        <div className="login" id="login__div">
          {/* this is for login  */}
          <h1> login </h1>
          <form>
            <div className="input__ui">
              <MailIcon id="input__icon" />
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="input__ui">
              <LockOpenIcon id="input__icon" />
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="7"
                placeholder=" Password"
                type="password"
              />
            </div>
            <br />
            <br />
            <button type="submit" onClick={loginToApp}>
              Login
            </button>
          </form>
          <h4>
            Don't have an account
            {/* <Link id="link" to="/signup"> */}
            <a id="link" href="#signup__div">
              Signup Here!
            </a>
            {/* </Link> */}
          </h4>
        </div>
        <br />
        <br />
        <br />
        <br />
        {/* this is for signup  */}

        <div className="login" id="signup__div">
          <h1>Signup</h1>
          <form>
            <div className="input__ui">
              <PersonIcon id="input__icon" />
              <input
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                type="text"
              />
            </div>
            <div className="input__ui">
              <MailIcon id="input__icon" />
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="input__ui">
              <LockOpenIcon id="input__icon" />
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="7"
                placeholder=" Password"
                type="password"
              />
            </div>
            {/* <div className="input__ui">
              <TodayIcon id="input__icon" />
              <input
                className="input"
                value={birthDate}
                onChange={(e) =>
                  setBirthDate(e.target.value)
                }
                placeholder="Birth date"
                type="date"
              />
            </div> */}
            {/* <input
            type="file"
            onChange={(e) => {
               onImageChange(e);
            }}
          /> */}
            {/* <input
            className="input"
            value={profilePic}
            onChange={(e) =>
              setProfilePic(e.target.value)
            }
            placeholder="profile pic url (optioonal)"
            // i changed text to file
            type="text"
          /> */}
            {/* <input
              className="input"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
              placeholder="Phone number (optional)"
              type="tel"
            /> */}
            {/* <label>role:</label>
          <select name="" id="" className="in">
            <option value="student">
              student
            </option>
            <option value="teacher">
              teacher
            </option>
            <option value="others">others</option>
          </select>  */}
            <br />
            <br />
            <button type="submit" onClick={register}>
              Signup
            </button>
          </form>
          <h4>
            you have an account?
            {/* <Link id="link" to="/login"> */}
            <a id="link" href="#login__div">
              Login
            </a>
            {/* </Link> */}
          </h4>
        </div>
      </section>
      <footer id="footer">
        <section>
          <li>Let Us Help You</li>
          <li>
            <a href="mailto:contactus.business301@gmail.com?Subject=User-Need-Help">
              Contact-us
            </a>
          </li>
        </section>
      </footer>
    </div>
  );
}

export default WelcomePage;
