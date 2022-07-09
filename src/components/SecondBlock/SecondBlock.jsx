import React from "react";
import Image from "../FirstBlock/img/Image";
import "./SecondBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import Time from "./Calendar/Time";
import { useState } from "react";
import MainModal from "../MainModal/MainModal";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import WaitingModal from "./WaitingModal/WaitingModal";

function SecondBlock(props) {
  const [modalActive, setModalActive] = useState(false);

  const { datesArray, selectedDay, setSelectedDay } = props;

  const newDateArray = datesArray?.map((one) => one.day);

  const getDisabledDays = () => {
    const newDates = [];
    for (let i = 1; i <= 31; i++) {
      if (!newDateArray?.includes(i)) {
        newDates.push({
          year: 2022,
          month: 7,
          day: i,
        });
      }
    }
    return newDates;
  };

  const setCalendarValue = (day) => {
    setSelectedDay(day);
    props.getDatesTimeInfo("", day, "time");
  };

  const setMonthUp = () => {
    let tempDay = { ...selectedDay };
    if (selectedDay.month > 11) {
      tempDay = { ...tempDay, month: 1, year: tempDay.year + 1 };
    } else {
      tempDay = { ...tempDay, month: tempDay.month + 1 };
    }
    setSelectedDay(tempDay);
    props.getDatesTimeInfo("", tempDay, "dates");
  };

  const setMonthDown = () => {
    let tempDay = { ...selectedDay };
    if (selectedDay.month < 2) {
      tempDay = { ...tempDay, month: 12, year: tempDay.year - 1 };
    } else {
      tempDay = { ...tempDay, month: tempDay.month - 1 };
    }
    setSelectedDay(tempDay);
    props.getDatesTimeInfo("", tempDay, "dates");
  };

  const showModalWindow = (e) => {
    e.preventDefault();
    props.setDefaultModal("waiting");
    setModalActive(true);
  };

  console.log("Selected Day: ", props.defaultModal);

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
            <div className="calendar-arrows">
              <button className="arrows">
                <span onClick={setMonthDown}>←</span>
              </button>
              <button className="arrows">
                <span onClick={setMonthUp}> → </span>
              </button>
            </div>
            <Calendar
              value={selectedDay}
              onChange={(day) => setCalendarValue(day)}
              shouldHighlightWeekends
              disabledDays={getDisabledDays()}
            />
          </div>
          <Time
            makeOrder={props.makeOrder}
            times={props.times}
            setTimes={props.setTimes}
            selectedTime={props.selectedTime}
            setSelectedTime={props.setSelectedTime}
          />
          <div
            className="button-main next-button"
            onClick={() => setModalActive(true)}
          >
            Next →
          </div>
          <div className="footer">
            <p className="subtitle">Cannot find a suitable time?</p>
            <button
              href="/#"
              className="waiting-list"
              onClick={(e) => showModalWindow(e)}
            >
              Add me to the waiting list
            </button>
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
          callback={props.postRequest}
          defaultModal={props.defaultModal}
          userData={props.userData}
          setUserData={props.setUserData}
        />
      )}
      {props.defaultModal === "login" && (
        <MainModal
          title="Please enter your email and password to continue"
          active={modalActive}
          setActive={setModalActive}
          callback={props.postRequest}
          defaultModal={props.defaultModal}
          mainProps={props.mainProps}
          userData={props.userData}
          setUserData={props.setUserData}
        />
      )}
      {props.defaultModal === "register" && (
        <MainModal
          title="Enter your contact details"
          active={modalActive}
          setActive={setModalActive}
          callback={props.postRequest}
          errorsResp={props.errorsResp}
          defaultModal={props.defaultModal}
          mainProps={props.mainProps}
          userData={props.userData}
          setUserData={props.setUserData}
        />
      )}
      {props.defaultModal === "waiting" && (
        <WaitingModal
          title="Please select a waiting list"
          active={modalActive}
          setActive={setModalActive}
          callback={props.postRequest}
          errorsResp={props.errorsResp}
          defaultModal={props.defaultModal}
          mainProps={props.mainProps}
          userData={props.userData}
          setUserData={props.setUserData}
          selectedDay={selectedDay}
          makeOrder={props.makeOrder}
          times={props.times}
          setTimes={props.setTimes}
          selectedTime={props.selectedTime}
          setSelectedTime={props.setSelectedTime}
          setDefaultModal={props.setDefaultModal}
        />
      )}
      {props.defaultModal === "agreements" && (
        <WaitingModal
          title="Confirm waiting list conditions"
          active={modalActive}
          setActive={setModalActive}
          callback={props.postRequest}
          errorsResp={props.errorsResp}
          defaultModal={props.defaultModal}
          mainProps={props.mainProps}
          userData={props.userData}
          setUserData={props.setUserData}
          selectedDay={selectedDay}
          makeOrder={props.makeOrder}
          times={props.times}
          setTimes={props.setTimes}
          selectedTime={props.selectedTime}
          setSelectedTime={props.setSelectedTime}
        />
      )}
    </div>
  );
}

export default SecondBlock;
