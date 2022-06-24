import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./MainModal.css";

export default function MainModal(props) {
  const dispErrors = props.errorsResp;
  const { title } = props;
  console.log("mobile inputs", props);

  const setInput = (name) => {};

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
                  value={props.userData.inputFirstName}
                  onChange={(event) =>
                    props.setUserData((prev) => ({
                      ...prev,
                      inputFirstName: event.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  className="form-name__firstname"
                  placeholder="Last Name"
                  value={props.userData.inputLastName}
                  onChange={(event) =>
                    props.setUserData((prev) => ({
                      ...prev,
                      inputLastName: event.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>
          <div className="form__wrapper">
            {(props.defaultModal === "login" ||
              props.defaultModal === "register" ||
              props.defaultModal === "email") && (
              <input
                type="email"
                className="form-name__email"
                placeholder="Email address"
                value={props.userData?.inputEmail}
                onChange={(event) =>
                  props.setUserData((prev) => ({
                    ...prev,
                    inputEmail: event.target.value,
                  }))
                }
              />
            )}
          </div>
          <div className="form-mobile-zip">
            {props.defaultModal === "register" && (
              <div className="form-mobile-number" style={{ display: "flex" }}>
                <PhoneInput
                  defaultCountry="DK"
                  value={props.userData.inputMobile}
                  onChange={(val) =>
                    props.setUserData((prev) => ({
                      ...prev,
                      inputMobile: val,
                    }))
                  }
                  className="form-name__mobile"
                  placeholder="Mobile  number"
                />
                <div>
                  <input
                    type="text"
                    className="form-name__zip"
                    placeholder="Zip code"
                    value={props.userData.inputZip}
                    onChange={(event) =>
                      props.setUserData((prev) => ({
                        ...prev,
                        inputZip: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className="form-password">
            {(props.defaultModal === "login" ||
              props.defaultModal === "register") && (
              <input
                type="password"
                className="form-name__password"
                placeholder="Password"
                value={props.userData.inputPassword}
                onChange={(event) =>
                  props.setUserData((prev) => ({
                    ...prev,
                    inputPassword: event.target.value,
                  }))
                }
              />
            )}
            {props.defaultModal === "register" && (
              <input
                type="password"
                className="form-name__confirm-password"
                placeholder="Confirm password"
                value={props.userData.confirmPassword}
                onChange={(event) =>
                  props.setUserData((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
              />
            )}
          </div>
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
