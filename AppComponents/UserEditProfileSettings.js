import React, { useState } from "react";
import "../stylings/UserEditProfileSettings.css";
//   Material ui
import { Avatar } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import WarningIcon from "@material-ui/icons/Warning";
//   User
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
// Firebase
import firebase from "firebase";
//   React Router Dom
import { useHistory } from "react-router-dom";
//     Loading screan
import { RingLoader } from "react-spinners";
//     Popup
import LoadingPopup from "../Popups/LoadingPopup";

function UserEditProfileSettings() {
  const user = useSelector(selectUser);
  let history = useHistory();
  const img = document.getElementById("img");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const toggleLoadingPopup = () => {
    setLoading(!loading);
  };

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0]; // get the supplied file
    // if there is a file, set image to that file
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // if there is no file, set image back to null
      setImage(null);
      alert("no image chosen");
    }
  };

  const ClickInput = () => {
    const fileInput = document.getElementById("ChangeProfileImage");
    fileInput.click();
  };

  const ClickButton = () => {
    const button = document.getElementById("close__btn__for__loading");
    button.click();
  };

  const uploadToFirebase = (e) => {
    e.preventDefault();
    toggleLoadingPopup();
    //1.
    if (image) {
      //2.
      const storageRef = firebase.storage().ref("users");
      //3.
      const imageRef = storageRef.child(user.uid + "/profile.jpg");
      //4.
      imageRef
        .put(image)
        //5.

        .then(() => {
          ClickButton();
          // alert(
          //   "Image uploaded successfully, now you can update it ."
          // );
          console.log("Image uploaded successfully.");
        });
      //   add what needed
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .storage()
            .ref("users")
            .child(user.uid + "/profile.jpg")
            .getDownloadURL()
            .then((Url) => {
              img.src = Url;

              user.updateProfile({ photoURL: img.src }).then(function (error) {
                console.log(error);
              });
              console.log("url updated");
            });
        }
      });
      window.location.reload();
    } else {
      ClickButton();

      alert(
        "Please upload an image first by clicking in the pen beside your profile image "
      );
      console.log("Please upload an image first.");
    }
  };

  const GoToProfilePage = () => {
    history.push("/profile");
  };

  return (
    <div className="profileedit__page">
      <ArrowBackIcon id="ArrowBackIcon" onClick={GoToProfilePage} />

      <div className="note">
        <WarningIcon />
        <h3>
          to change the profile image click the pen icon near your profile
          picture. Then the button "change profile image" then the button
          "update".
        </h3>
      </div>
      <div className="profileImage__div">
        <Avatar src={user?.photoURL || ""} className="profile__photo">
          {user?.displayName[0]}
        </Avatar>

        <EditIcon onClick={ClickInput} className="editPen" />
      </div>
      <button id="changeProfileImg__btn" onClick={uploadToFirebase}>
        change profile image
      </button>
      {/* <p>Upload a Photo</p> */}
      <div className="buttons">
        <input
          accept="image/*"
          // accept="image/gif, image/jpeg"
          type="file"
          id="ChangeProfileImage"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
      </div>

      <img id="img" alt="profile" />
      {loading && (
        <LoadingPopup
          content={
            <>
              <div className="popup__header__loading">
                <span>Loading... please wait</span>
              </div>
              <div className="popup__content__loading">
                <RingLoader color="#7198e6" />
              </div>
            </>
          }
          handleClose={toggleLoadingPopup}
        />
      )}
    </div>
  );
}

export default UserEditProfileSettings;
