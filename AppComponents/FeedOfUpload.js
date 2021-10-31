import "../stylings/FeedOfUpload.css";
import React, { useState } from "react";
//  user stuff
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
//  firebase
import firebase from "firebase";
import { storage, db } from "../firebase";
//  material-UI
import { Button } from "@material-ui/core";
// import CreateIcon from "@material-ui/icons/Create";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
//     Popup
import LoadingPopup from "../Popups/LoadingPopup";
//     Loading screan
import { RingLoader } from "react-spinners";
//   React Router Dom
import { useHistory } from "react-router-dom";

function FeedOfUpload() {
  // await function
  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  //   await delay(5000);
  //   console.log("Waited 5s");
  //
  let history = useHistory();
  // post data
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [moneyvalue, setMoneyvalue] = useState("");
  const [booksGrade, setBooksGrade] = useState("");
  const [itemState, setItemState] = useState("");
  const [quality, setQuality] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [phoneNb, setPhoneNb] = useState("");
  // loading
  const [loading, setLoading] = useState(false);

  const toggleLoadingPopup = () => {
    setLoading(!loading);
  };

  const ClickFileInput = () => {
    const fileInput = document.getElementById("imageOfPost");
    fileInput.click();
  };
  // image stuff////////////////
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();

    if (!moneyvalue) {
      return alert("Please choose the type of your item");
    }
    if (!booksGrade) {
      return alert("Please choose the grade level of your book");
    }
    if (!itemState) {
      return alert("Please choose the status of your book");
    }
    if (!quality) {
      return alert("Please choose the quality of your book");
    }
    if (!phoneNb && phoneNb < 10000000) {
      return alert(
        "Please enter your phone number or your number is not equal to 8 digits"
      );
    }
    if (!image) {
      return alert("Please upload an image");
    }
    toggleLoadingPopup();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      // complete function ...
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts")
              .add({
                name: user.displayName,
                description: user.email,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                photoURL: user.photoURL || "",
                price: moneyvalue,
                booksGrade: booksGrade,
                priceStatus: itemState,
                quality: quality,
                schoolName: schoolName || "",
                phoneNb: phoneNb,
                imageUrl: url || "",
                likes: [],
              })
              .then(function (docRef) {
                docRef.set({
                  name: user.displayName,
                  description: user.email,
                  message: input,
                  postId: docRef.id,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  photoURL: user.photoURL || "",
                  price: moneyvalue,
                  booksGrade: booksGrade,
                  priceStatus: itemState,
                  quality: quality,
                  schoolName: schoolName || "",
                  phoneNb: phoneNb,
                  imageUrl: url || "",
                  likes: [],
                });

                console.log(
                  // this is the posts id {so i can delete it }
                  // "Document written with ID: ",
                  // docRef.id,
                  "new post uploaded"
                );
              });
          });
      }
    );

    setInput("");
    setMoneyvalue("");
    setBooksGrade("");
    setItemState("");
    setQuality("");
    setSchoolName("");
    setPhoneNb("");
    setProgress(0);
    setImage(null);

    toggleLoadingPopup();

    history.push("/");
  };
  return (
    <div className="feedOfUpload">
      {!user ? (
        <div>{history.push("/login")}</div>
      ) : (
        <>
          <br />
          <div className="feed__inputOptions">
            <h2>upload a post</h2>
            {/* <InputOptions Icon={ImageIcon} title="upload post" color="lightblue" /> */}
          </div>
          <div className="feed__inputContainer">
            {/* <CreateIcon /> */}

            <label>title:</label>
            <input
              className="post__input"
              placeholder="title"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength="400"
              type="text"
            />
            <br />

            <label>price (in L.L.) :</label>
            <input
              className="post__input"
              value={moneyvalue}
              onChange={(e) => setMoneyvalue(e.target.value)}
              placeholder="money value"
              type="number"
            />
            <br />
            <label>books level:</label>
            <select
              className="post__input"
              onChange={(e) => setBooksGrade(e.target.value)}
              value={booksGrade}
              name=""
              id=""
            >
              <option value="DEFAULT">not specified</option>
              <option value="gr 1">grade 1</option>
              <option value="gr 2">grade 2</option>
              <option value="gr 3">grade 3</option>
              <option value="gr 4">grade 4</option>
              <option value="gr 5">grade 5</option>
              <option value="gr 6">grade 6</option>
              <option value="gr 7">grade 7</option>
              <option value="gr 8">grade 8</option>
              <option value="gr 9">grade 9</option>
              <option value="gr 10">grade 10</option>
              <option value="gr 11">grade 11</option>
              <option value="gr 12">grade 12</option>
            </select>
            <br />

            <label>price tag:</label>
            <select
              className="post__input"
              onChange={(e) => setItemState(e.target.value)}
              value={itemState}
              name=""
              id=""
            >
              <option value="DEFAULT"></option>
              <option value="solid">solid</option>
              <option value="negotiable">negotiable</option>
            </select>
            <br />

            <label>item quality:</label>
            <select
              className="post__input"
              onChange={(e) => setQuality(e.target.value)}
              value={quality}
              name=""
              id=""
            >
              <option value="DEFAULT"></option>
              <option value="new">new</option>
              <option value="used">used</option>
            </select>
            <br />
            <label>school name (optional):</label>
            <select
              className="post__input"
              onChange={(e) => setSchoolName(e.target.value)}
              value={schoolName}
              name=""
              id=""
            >
              <option value="DEFAULT"></option>
              <option value="amjad high school">amjad high school</option>
            </select>

            <br />
            <label>phone number:</label>
            <input
              className="post__input"
              value={phoneNb}
              onChange={(e) => setPhoneNb(e.target.value)}
              min="1000000"
              maxLength="1000000"
              placeholder="phone number"
              type="number"
            />
            <br />
            <img id="imge" alt="nothing here" />

            {/* image uploader */}
            <p>to upload an image click the cloud image</p>
            <hr />
            <br />
            <div className="upload__div">
              <Button
                className="CloudUploadIcon"
                variant="contained"
                color="primary"
                component="span"
                onClick={ClickFileInput}
              >
                Upload
              </Button>
              {/* <CloudUploadIcon
            className="CloudUploadIcon"
            onClick={ClickFileInput}
          /> */}
              <progress
                className="imageupload__progress"
                value={progress}
                max="100"
              ></progress>
              <input id="imageOfPost" type="file" onChange={handleChange} />
            </div>
            <Button onClick={handleUpload} type="submit">
              upload post
            </Button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
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
        </>
      )}
    </div>
  );
}

export default FeedOfUpload;
