import React from "react";
import Time from "../Calendar/Time";
import "./WaitingModal.css";

export default function WaitingModal(props) {
  const dispErrors = props.errorsResp;
  const { title, defaultModal, setActive, selectedDay } = props;

  const setType = () => {
    props.setDefaultModal("agreements");
  };

  console.log("Default Modal: ", defaultModal);

  return (
    <div
      className={props.active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="title modal-title">{title}</div>
        {defaultModal === "waiting" && (
          <div className="choose-time">
            <div className="selected-date" style={{ marginBottom: "10px" }}>
              You have chosen a date{" "}
              <b>{`${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`}</b>
            </div>
            <b>Please select a time:</b>
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
        {defaultModal === "agreements" && (
          <p>
            Please note this is a request for a place on the waiting list and
            not an actual booking You will only be contacted by the restaurant
            if a table becomes available. You only need to add yourself to the
            waiting list once When you click the button below, you verify that
            you have read and understood the above conditions
          </p>
        )}
        <div className="modal-button">
          <button className="button-main" onClick={() => setType()}>
            Continue →
          </button>
        </div>
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
