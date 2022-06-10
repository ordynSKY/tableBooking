import React from "react";
import Image from "../FirstBlock/img/Image";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";

function LoginBlock(props) {
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
          <div className="title third-title">Login to continue</div>
          <form className="form">
            <div className="form-mobile-zip">
              <input
                type="email"
                className="form-name__email"
                placeholder="Email address"
                value={props.inputEmail}
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
          <button className="button-main" onClick={props.handleChangeItem}>
            Next →
          </button>
          <div className="error-response">
            {props.errorRespTitle}
            <br />
            <div className="error-response-list">
              {props.errorRespEmail}
              <br />
              {props.errorRespPass}
            </div>
          </div>
          <div className="copyrigth-footer">
            <Copyrigth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBlock;
