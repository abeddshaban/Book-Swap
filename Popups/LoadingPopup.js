import React from "react";
import "../stylings/PopupsStylings/LoadingPopup.css";

function LoadingPopup(props) {
  return (
    <div className="popup-box__loading">
      <div className="box__loading">
        {props.content}

        <button
          id="close__btn__for__loading"
          onClick={props.handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default LoadingPopup;
