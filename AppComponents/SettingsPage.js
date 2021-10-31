import React from "react";
import "../stylings/SettingsPage.css";
import { logout } from "../features/userSlice";
//   Firebase
import { auth } from "../firebase";
// react-router-dom
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
//   Material-UI
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function SettingsPage() {
  let history = useHistory();
  // const GoToProfilePage = () => {
  //   history.push("/profile");
  // };

  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
    history.push("/welcomePage");
  };

  return (
    <>
      <div className="SettingsPage">
        <div className="group">
          <Link to="/profile/">
            <button className="ArrowBackIcon">
              <ArrowBackIcon />
            </button>
          </Link>
          <p>you canot change your profile picture up till now</p>
          <Link
          // to="/profile/edit-profile"
          >
            <button className="group__btn">
              <EditIcon className="group__btn__icon" />
              <div className="group__btn__text">
                <h3>edit profile</h3>
              </div>
              <ArrowForwardIosIcon id="arrowIcon" />
            </button>
          </Link>
        </div>
        <div className="group">
          <button id="logout__btn" className="group__btn" onClick={logoutOfApp}>
            <ExitToAppIcon className="group__btn__icon" />
            <div className="group__btn__text">
              <h3>log out</h3>
            </div>
            <ArrowForwardIosIcon id="arrowIcon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
