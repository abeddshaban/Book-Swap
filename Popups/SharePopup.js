import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import "../stylings/PopupsStylings/Popup.css";

function SharePopup(props) {
  return (
    <div onClick={props.handleClose} className="popup-box">
      <div className="sharepopup__div">
        <div className="sharepopup__header">
          <span> share to</span>
          <span className="closeIconSharePopup" onClick={props.handleClose}>
            <ClearIcon />
          </span>
        </div>

        {props.content}
      </div>
    </div>
  );
}

export default SharePopup;
