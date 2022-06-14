import React from "react";
import "./ModalEmail.css";

export default function ModalEmail(props) {
  return (
    <div
      className={props.active ? "modal active" : "modal"}
      onClick={() => props.setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="title modal-title">
          Please enter your email to continue
        </div>
        <form className="form modal-email">
          <div className="form-email">
            <input
              type="text"
              className="form-name__email "
              placeholder="Email address"
              value={props.inputEmail}
              onChange={(event) => props.setInputEmail(event.target.value)}
            />
            <div className="modal-button">
              <button className="button-main" onClick={props.emailRequest}>
                Continue →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
