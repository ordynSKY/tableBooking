import React from "react";
import Image from "../FirstBlock/img/Image";
import "./FourthBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";

function FourthBlock(props) {
  const dispErrors = props.errorsResp;
  return (
    <div className="content">
      <Image />
      <div className="content-wrapper">
        <div className="main-block__body">
          <div className="nav">
            <div className="back">
              <a href="/#" className="back-link" onClick={props.handlePrevItem}>
                ← Back
              </a>
            </div>
            <div className="second-step__lang">
              <SelectLang />
            </div>
          </div>
          <div className="overhead">Reserved {props.guestValue} Guests</div>
          <div className="title third-title">
            Create a <br />
            password
          </div>
          <div className="second-info third-info" style={{ marginTop: "50px" }}>
            With a password, we can take good care of your contact info, and you
            can always update your info on <a href="/#">DinnerBooking.com</a>.{" "}
            <br />
            For future bookings like this, you will not need the password.
          </div>

          <form className="form">
            <div className="form-mobile-zip">
              <input
                type="password"
                className="form-name__password"
                placeholder="Password"
                value={props.inputPassword}
                onChange={(event) => props.setInputPassword(event.target.value)}
              />
              <input
                type="password"
                className="form-name__confirm-password"
                placeholder="Confirm password"
                value={props.confirmPassword}
                onChange={(event) =>
                  props.setConfirmPassword(event.target.value)
                }
              />
            </div>
          </form>
          <button className="button-main" onClick={props.postRequest}>
            Next →
          </button>
          <div className="error-response">
            {dispErrors?.title}
            <br />
            {dispErrors?.emailError}
            <br />
            {dispErrors?.passError}
          </div>
          <div className="copyrigth-footer">
            <Copyrigth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FourthBlock;
