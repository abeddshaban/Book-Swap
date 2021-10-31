import React, { useEffect, useState } from "react";
import "../stylings/Profile.css";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";
import Post from "./Post";
//   React-Router-Dom
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//   Material-UI
import { Avatar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function Profile() {
  const user = useSelector(selectUser);
  let history = useHistory();
  const [posts, setPosts] = useState([]);

  let x = user?.email;
  useEffect(() => {
    if (user) {
      db.collection("posts")
        .where("description", "==", x)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      return null;
    }
  }, [user, x]);

  return (
    <div className="profile__page">
      {!user ? (
        <div>{history.push("/login")}</div>
      ) : (
        <>
          <header className="profile__header">
            <Link to="/profile/settingspage">
              <SettingsIcon className="profile__settingsicon" />
            </Link>
          </header>
          <form className="profile__info">
            <Avatar src={user?.photoURL || ""} className="profile__image">
              {user?.displayName[0]}
            </Avatar>

            {/* <Link to="/profile/edit-profile">
          <button id="editProfile__btn">Edit Profile</button>
        </Link> */}

            {/* name */}
            <label>Full Name:</label>
            <h4>{user?.displayName}</h4>
            {/* email */}
            <label>email:</label>
            <h4>{user?.email}</h4>
          </form>
          <br />
          <FlipMove>
            {posts.map(
              ({
                id,
                data: {
                  name,
                  description,
                  message,
                  photoURL,
                  postId,
                  imageUrl,
                  booksGrade,
                  price,
                  priceStatus,
                  phoneNb,
                  quality,
                  // timestamp,
                },
              }) => (
                <Post
                  postId={postId}
                  key={id}
                  name={name}
                  description={description}
                  message={message}
                  photoURL={photoURL}
                  imageUrl={imageUrl}
                  booksGrade={booksGrade}
                  price={price}
                  priceStatus={priceStatus}
                  phoneNb={phoneNb}
                  quality={quality}
                  // timestamp={timestamp}
                />
              )
            )}
          </FlipMove>
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default Profile;
