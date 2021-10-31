import React from "react";
import "../stylings/PopupsStylings/PostPopupBtn.css";

//    Material-UI

function PostPopupBtn(props) {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
        <button id="closebtn__post" onClick={props.handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PostPopupBtn;
