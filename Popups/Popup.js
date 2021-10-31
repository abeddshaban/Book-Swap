import React from "react";
import "../stylings/PopupsStylings/Popup.css";
import ClearIcon from "@material-ui/icons/Clear";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span
          className="close-icon"
          onClick={props.handleClose}
        >
          <ClearIcon />
        </span>
        {props.content}

        <button
          id="close__btn__post"
          onClick={props.handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Popup;
