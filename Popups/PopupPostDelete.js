import React from "react";
import "../stylings/PopupsStylings/Popup.css";
import ClearIcon from "@material-ui/icons/Clear";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

function PopupPostDelete(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <div className="popup__div__header">
          <div className="popup__header">
            <span>Delete Post</span>
          </div>
          <span className="close-icon" onClick={props.handleClose}>
            <ClearIcon />
          </span>
        </div>
        <div className="popup__content">
          <ReportProblemIcon id="ReportProblemIcon" />
          <p id="popup__p">
            After you delete a post, it's permanently deleted. Posts can't be
            undeleted.
          </p>
        </div>
        <div className="display__justifycontent">
          <button id="close__btn__post" onClick={props.handleClose}>
            Cancel
          </button>
          {props.deleteBTN}
        </div>
      </div>
    </div>
  );
}

export default PopupPostDelete;
