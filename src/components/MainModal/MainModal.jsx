import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./MainModal.css";

export default function MainModal(props) {
  const dispErrors = props.errorsResp;
  const { title } = props;
  const { mainProps } = props;

  return (
    <div
      className={props.active ? "modal active" : "modal"}
      onClick={() => props.setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="title modal-title">{title}</div>
        <form className="form form-modal">
          <div className="form-name">
            {props.defaultModal === "register" && (
              <div>
                <input
                  type="text"
                  className="form-name__firstname"
                  placeholder="First Name"
                  value={props.inputFirstName}
                  onChange={(event) =>
                    props.setInputFirstName(event.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-name__firstname"
                  placeholder="Last Name"
                  value={props.inputLastName}
                  onChange={(event) =>
                    props.setInputLastName(event.target.value)
                  }
                />
              </div>
            )}
          </div>
          <div className="form-email">
            {(props.defaultModal === "login" ||
              props.defaultModal === "register" ||
              props.defaultModal === "email") && (
              <input
                type="email"
                className="form-name__email"
                placeholder="Email address"
                value={mainProps?.inputEmail}
                onChange={(event) => props.setInputEmail(event.target.value)}
              />
            )}
          </div>
          <div className="form-mobile-zip">
            {props.defaultModal === "register" && (
              <div style={{ display: "flex" }}>
                {/* <PhoneInput
                  defaultCountry="RU"
                  value={value}
                  onChange={setValue}
                  className="form-name__mobile"
                  placeholder="Mobile  number"
                /> */}
                <input
                  type="text"
                  className="form-name__mobile"
                  placeholder="Mobile  number"
                  value={props.inputMobile}
                  onChange={(event) => props.setInputMobile(event.target.value)}
                />
                <input
                  type="text"
                  className="form-name__zip"
                  placeholder="Zip code"
                  value={props.inputZip}
                  onChange={(event) => props.setInputZip(event.target.value)}
                />
              </div>
            )}
          </div>
          {(props.defaultModal === "login" ||
            props.defaultModal === "register") && (
            <input
              type="password"
              className="form-name__password"
              placeholder="Password"
              value={props.inputPassword}
              onChange={(event) => props.setInputPassword(event.target.value)}
            />
          )}
          {props.defaultModal === "register" && (
            <input
              type="password"
              className="form-name__confirm-password"
              placeholder="Confirm password"
              value={props.confirmPassword}
              onChange={(event) => props.setConfirmPassword(event.target.value)}
            />
          )}
        </form>
        <div className="modal-button">
          <button className="button-main" onClick={props.callback}>
            Continue →
          </button>
        </div>
        <div className="error-response">
          {dispErrors?.title}
          <br />
          {dispErrors?.emailError}
          <br />
          {dispErrors?.passError}
        </div>
      </div>
    </div>
  );
}
