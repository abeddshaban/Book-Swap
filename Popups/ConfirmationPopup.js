import React from "react";
import "../stylings/PopupsStylings/ConfirmationPopup.css";
import ClearIcon from "@material-ui/icons/Clear";

function ConfirmationPopup(props) {
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
          id="close__btn"
          onClick={props.handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
