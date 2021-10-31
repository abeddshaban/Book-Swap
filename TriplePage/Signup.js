import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import "../stylings/TripplePageStylings/Signup.css";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/PermIdentity";
import MailIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import TodayIcon from "@material-ui/icons/Today";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // const [phoneNumber, setPhoneNumber] =
  //   useState("");
  const [
    profilePic,
    // setProfilePic
  ] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

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
    <>
      <div className="login">
        {/* this is for signup  */}
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
              placeholder=" Password"
              type="password"
            />
          </div>
          <div className="input__ui">
            <TodayIcon id="input__icon" />
            <input
              className="input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="Birth date"
              type="date"
            />
          </div>
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
        </form>
        {/* this is for sign up under me  */}
        <form>
          <button type="submit" onClick={register}>
            Signup
          </button>
        </form>
        <br />
        <h4>
          you have an account?
          <Link id="link" to="/login">
            Login
          </Link>
        </h4>
      </div>
    </>
  );
}

export default Signup;
