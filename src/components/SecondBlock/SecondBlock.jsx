import React from "react";
import Image from "../FirstBlock/img/Image";
import "./SecondBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import Time from "./Calendar/Time";
import Cal from "./Calendar/Cal";
import { useState } from "react";
import MainModal from "../MainModal/MainModal";

function SecondBlock(props) {
  const [modalActive, setModalActive] = useState(false);

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
          <div className="overhead second-overhead">
            Reserved {props.guestValue} Guests
          </div>
          <div className="title second-title">Select Date And Time</div>
          <div className="second-block__datepicker">
            <Cal
              selectedDay={props.selectedDay}
              handleDayChange={props.handleDayChange}
            />
          </div>
          <Time
            time={props.time}
            setTime={props.setTime}
            bookedTimes={props.bookedTimes}
          />
          <div
            className="button-main next-button"
            onClick={() => setModalActive(true)}
          >
            Next →
          </div>
          <div className="footer">
            <p className="subtitle">Cannot find a suitable time?</p>
            <a href="/#" className="waiting-list">
              Add me to the waiting list
            </a>
            <Copyrigth />
          </div>
        </div>
      </div>
      {props.defaultModal === "email" && (
        <MainModal
          title="Please enter your email to continue"
          active={modalActive}
          setActive={setModalActive}
          mainProps={props.mainProps}
          setInputEmail={props.setInputEmail}
          callback={props.emailRequest}
          defaultModal={props.defaultModal}
        />
      )}
      {props.defaultModal === "login" && (
        <MainModal
          title="Please enter your email and password to continue"
          active={modalActive}
          setActive={setModalActive}
          inputEmail={props.inputEmail}
          setInputEmail={props.setInputEmail}
          inputPassword={props.inputPassword}
          setInputPassword={props.setInputPassword}
          callback={props.loginRequest}
          defaultModal={props.defaultModal}
          mainProps={props.mainProps}
        />
      )}
      {props.defaultModal === "register" && (
        <MainModal
          title="Enter your contact details"
          active={modalActive}
          setActive={setModalActive}
          inputEmail={props.inputEmail}
          setInputEmail={props.setInputEmail}
          inputFirstName={props.inputFirstName}
          setInputFirstName={props.setInputFirstName}
          inputLastName={props.inputLastName}
          setInputLastName={props.setInputLastName}
          inputMobile={props.inputMobile}
          setInputMobile={props.setInputMobile}
          inputZip={props.inputZip}
          setInputZip={props.setInputZip}
          inputPassword={props.inputPassword}
          setInputPassword={props.setInputPassword}
          confirmPassword={props.confirmPassword}
          setConfirmPassword={props.setConfirmPassword}
          callback={props.EditUserInfoReq}
          errorsResp={props.errorsResp}
          defaultModal={props.defaultModal}
          userData={props.userData}
          mainProps={props.mainProps}
        />
      )}
    </div>
  );
}

export default SecondBlock;
