import React from "react";
import Image from "../FirstBlock/img/Image";
import "./SecondBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import Time from "./Calendar/Time";
import Cal from "./Calendar/Cal";
import ModalEmail from "../ModalEmail/ModalEmail";
import { useState } from "react";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalRegister from "../ModalRegister/ModalRegister";

function SecondBlock(props) {
  const [modalActive, setModalActive] = useState(false);

  let content =
    (props.needLogin === "email" && (
      <ModalEmail
        active={modalActive}
        setActive={setModalActive}
        inputEmail={props.inputEmail}
        setInputEmail={props.setInputEmail}
        emailRequest={props.emailRequest}
      />
    ),
    props.needLogin === "login" && (
      <ModalLogin
        active={modalActive}
        setActive={setModalActive}
        inputEmail={props.inputEmail}
        setInputEmail={props.setInputEmail}
        inputPassword={props.inputPassword}
        setInputPassword={props.setInputPassword}
      />
    ),
    props.needLogin === "register" && (
      <ModalRegister
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
        postRequest={props.postRequest}
        errorsResp={props.errorsResp}
      />
    ));

  // if (props.needLogin === "login") {
  //   content = ;
  // }

  console.log(props);
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
        <ModalEmail
          active={modalActive}
          setActive={setModalActive}
          inputEmail={props.inputEmail}
          setInputEmail={props.setInputEmail}
          emailRequest={props.emailRequest}
        />
      )}
      {props.defaultModal === "login" && (
        <ModalLogin
          active={modalActive}
          setActive={setModalActive}
          inputEmail={props.inputEmail}
          setInputEmail={props.setInputEmail}
          inputPassword={props.inputPassword}
          setInputPassword={props.setInputPassword}
        />
      )}
      {props.defaultModal === "register" && (
        <ModalRegister
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
          postRequest={props.postRequest}
          errorsResp={props.errorsResp}
        />
      )}
    </div>
  );
}

export default SecondBlock;
