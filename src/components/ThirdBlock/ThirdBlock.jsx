import React from "react";
import Image from "../FirstBlock/img/Image";
import "./ThirdBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";

function ThirdBlock(props) {
  const isValid =
    props.inputFirstName &&
    props.inputLastName &&
    // props.userDatainputEmail &&
    props.inputMobile;

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
            Enter your <br /> Contact Details
          </div>
          <form className="form">
            <div className="form-name">
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
                onChange={(event) => props.setInputLastName(event.target.value)}
              />
            </div>
            <div className="form-email">
              {/* <input
                type="text"
                className="form-name__email"
                placeholder="Email address"
                value={props.inputEmail}
                onChange={(event) => props.setInputEmail(event.target.value)}
              /> */}
            </div>
            <div className="form-mobile-zip">
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
          </form>
          <button
            className="button-main"
            onClick={props.handleChangeItem}
            disabled={!isValid}
          >
            Next →
          </button>

          <div className="second-info">
            By creating a DinnerBooking profile I accept the{" "}
            <a className="no-border" href="/#">
              gener terms
            </a>
            . I <br />
            further accept that DinnerBooking can collect and process <br />
            personal information bases on our{" "}
            <a className="no-border" href="/#">
              privacy policy.
            </a>
            <Copyrigth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdBlock;
