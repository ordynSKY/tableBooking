import React from "react";
import Image from "../FirstBlock/img/Image";
import "./SecondBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import Time from "./Calendar/Time";
import Cal from "./Calendar/Cal";
import ModalEmail from "../ModalEmail/ModalEmail";
import { useState } from "react";

function SecondBlock(props) {
  const [modalActive, setModalActive] = useState(false);

  let content = null;

  if (props.needLogin) {
    content = <div>test</div>;
  }

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
      <ModalEmail active={modalActive} setActive={setModalActive}>
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
        {content}
      </ModalEmail>
    </div>
  );
}

export default SecondBlock;
