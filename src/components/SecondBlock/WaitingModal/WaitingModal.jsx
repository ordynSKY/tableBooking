import React from "react";
import Time from "../Calendar/Time";
import "./WaitingModal.css";

export default function WaitingModal(props) {
  const dispErrors = props.errorsResp;
  const { title, defaultModal, setActive, selectedDay } = props;

  return (
    <div
      className={props.active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="title modal-title">{title}</div>
        {defaultModal === "waiting" && (
          <div className="choose-time">
            <div className="selected-date">
              You have chosen a date{" "}
              <b>{`${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`}</b>
            </div>
            <div className="timeline-block">
              <Time
                makeOrder={props.makeOrder}
                times={props.times}
                setTimes={props.setTimes}
                selectedTime={props.selectedTime}
                setSelectedTime={props.setSelectedTime}
              />
            </div>
          </div>
        )}
        {defaultModal === "waiting" && (
          <div className="modal-button">
            <button className="button-main">Continue →</button>
          </div>
        )}
        {(defaultModal === "register" ||
          defaultModal === "edit" ||
          defaultModal === "login" ||
          defaultModal === "email") && (
          <div className="error-response">
            {dispErrors?.title}
            <br />
            {dispErrors?.emailError}
            <br />
            {dispErrors?.passError}
          </div>
        )}
      </div>
    </div>
  );
}
