/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef, useState } from "react";
import "../stylings/Post.css";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
//    Popups
import PostPopupBtn from "../Popups/PostPopupBtn";
//    Firebase
import firebase from "firebase";
import { db } from "../firebase";
//    Material-UI
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SchoolIcon from "@material-ui/icons/School";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PopupPostDelete from "../Popups/PopupPostDelete";
// import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
// import HeartIcon from "@material-ui/icons/FavoriteBorder";
import SharePopup from "../Popups/SharePopup";
//  share buttons
import { WhatsappShareButton } from "react-share";
import { WhatsappIcon } from "react-share";
import { Link } from "react-router-dom";

const Post = forwardRef(
  (
    {
      name,
      message,
      postId,
      email,
      description,
      photoURL,
      likesCount,
      likes,
      uid,
      // these are for the item details
      imageUrl,
      quality,
      priceStatus,
      booksGrade,
      price,
      phoneNb,
      // timestamp,
    },
    ref
  ) => {
    const user = useSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
    const [postPopupBtn, setPostPopupBtn] = useState(false);
    const togglePostPopupBtn = () => {
      setPostPopupBtn(!postPopupBtn);
    };
    const [sharePopup, setSharePopup] = useState(false);
    const toggleSharePopup = () => {
      setSharePopup(!sharePopup);
    };
    const pressTheWhatsappLink = () => {
      const aTag = document.getElementById("displayNone");
      aTag.click();
    };
    const updateProfileUrl = (e) => {
      e.preventDefault();
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .storage()
            .ref("users")
            .child(user.uid + "/profile.jpg")
            .getDownloadURL()
            .then((Url) => {
              console.error();
            });
        }
      });
    };
    const deletePost = () => {
      db.collection("posts")
        .doc(postId)
        .delete()
        .catch((error) => {
          console.error("Error removing document: ", error);
        })
        .then(() => {
          console.log("Document successfully deleted!");
        });
    };
    // const addUserIdToPost = (e) => {
    //   e.preventDefault();
    //   // let xUserEmail = user.email;

    //   let likesPath = db
    //     .collection("posts")
    //     .doc(postId)
    //     .collection("user-emails")
    //     .doc();

    //   likesPath.set({ name: user.email }, { merge: true });
    //   console.log("done");

    //   // likesPath.set(
    //   //   {
    //   //     likes: [],
    //   //   },
    //   //   { merge: true }
    //   // );
    //   console.log("likes field was open ");

    //   if (user) {
    //     // if (!user?.email == null) {
    //     // likesPath.set(
    //     //   {
    //     //     likes: [user?.email],
    //     //   },
    //     //   { merge: true }
    //     // );
    //     console.log("like was added");

    //     // } else {
    //     // likesPath.remove(
    //     //   {
    //     //     likes: [user?.email],
    //     //   },
    //     //   { merge: true }
    //     // );
    //     // console.log("like was removed");
    //     // }
    //   } else {
    //     alert("sign in ");
    //   }
    // };

    // const addUserIdToPost = (e) => {
    //   e.preventDefault();

    //   if (user) {
    //     let likesPath = db.collection("posts").doc(postId);

    //     // let getLikes = db.collection("posts").doc(postId).get("likes");

    //     if (!user.email) {
    //       console.log("email is in the likes");
    //     } else {
    //       console.log("no email found");
    //       likesPath.set(
    //         {
    //           likes: [user?.email],
    //         },
    //         { merge: true }
    //       );
    //     }
    //   } else {
    //     alert("sign in ");
    //   }
    // };

    // const newTo = {
    //   pathname: `/post/${postId}`,
    //   param1: "Par1",
    // };
    // link to the "location"
    // see (https://reacttraining.com/react-router/web/api/location)
    // <Link to={newTo}> </Link>;

    // In your Category Component, you can access the data like this
    // this.props.match.params.catId; // this is 595212758daa6810cbba4104
    // this.props.location.param1; // this is Par1

    return (
      <div onLoad={updateProfileUrl} ref={ref} className="post">
        <div className="post__header">
          {description === user?.email ? (
            <Avatar className="post__img" src={user?.photoURL || ""}>
              {name[0]}
            </Avatar>
          ) : (
            <Avatar className="post__img" src={photoURL || ""}>
              {name[0]}
            </Avatar>
          )}

          <div className="post__info">
            <Link
              to={{
                pathname: `/post/${postId}`,
              }}
              className="linkOfPost"
            >
              <h4> {name} </h4>
            </Link>
          </div>

          <div className="post__header__rightSide">
            <MoreHorizIcon id="threeDots__post" onClick={togglePostPopupBtn} />
          </div>
        </div>
        <div className="div__post__body__img">
          <img className="post__body__img" src={imageUrl} alt="" />
        </div>
        <div className="post__footer">
          {/* title */}
          <h4 className="post__details__title">{message}</h4>
          <section className="section1__details">
            <span className="value">
              {/* grade */}

              <label>
                <SchoolIcon className="detailIcon__grade" />
                grade level: {booksGrade}
              </label>
            </span>
            {/* quality */}
            <span className="value">
              <label>
                <MenuBookIcon className="detailIcon__book" />
                item quality: {quality}
              </label>
            </span>
          </section>
          <section className="section2__details">
            <span className="value2">
              {/* price */}
              <label>
                <AttachMoneyIcon className="detailIcon__money" /> price:
                <span className="bold"> {price}</span> L.L. | {priceStatus}
              </label>
            </span>
            <a
              id="displayNone"
              className="displayNone"
              target="_blank"
              rel="noreferrer"
              href={
                "https://api.whatsapp.com/send?phone=961" +
                phoneNb +
                "&text=hi,i want to ask about the " +
                message +
                " you are selling"
              }
            >
              hi
            </a>

            <button className="body__button" onClick={pressTheWhatsappLink}>
              <span className="spanOfButtonPost">
                <WhatsAppIcon />
                contact user
              </span>
            </button>
          </section>

          <br />
        </div>
        {/* post interactions */}
        <div className="post__interactions">
          <button onClick={toggleSharePopup} className="interactions__button">
            <ShareIcon />
            <h3>share</h3>
          </button>
          {/* <button className="interactions__button">
            <CommentIcon />
            <h3>comments</h3>
          </button> */}
          {/* <button className="interactions__button">
            <h3 id="likes">{likesCount}</h3>
            <HeartIcon
              //  onClick={addUserIdToPost}
              id="like__btn"
            />
          </button> */}
        </div>

        {postPopupBtn && (
          <PostPopupBtn
            content={
              <>
                {description === user?.email ? (
                  <div className="postPopup__btn">
                    <button className="no__frame" onClick={togglePopup}>
                      <DeleteIcon id="DeleteIcon" />
                      <span id="post__btn__element">delete</span>
                    </button>
                  </div>
                ) : null}
              </>
            }
            handleClose={togglePostPopupBtn}
          />
        )}
        {isOpen && (
          <PopupPostDelete
            deleteBTN={
              <button id="delete__btn" onClick={deletePost}>
                Delete
              </button>
            }
            handleClose={togglePopup}
          />
        )}
        {sharePopup && (
          <SharePopup
            content={
              <>
                <WhatsappShareButton
                  url={"https://project2117.ml/post/" + postId}
                  title={
                    message +
                    "\n" +
                    "books grade: " +
                    booksGrade +
                    "\n" +
                    "price: " +
                    price +
                    "\n" +
                    "\n"
                  }
                >
                  <WhatsappIcon logoFillColor="white" round={true} />
                </WhatsappShareButton>
              </>
            }
            handleClose={toggleSharePopup}
          />
        )}
      </div>
    );
  }
);

export default Post;
