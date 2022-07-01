import React from "react";
import Image from "../FirstBlock/img/Image";
import "./SecondBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import Time from "./Calendar/Time";
import Cal from "./Calendar/Cal";
import { useState } from "react";
import MainModal from "../MainModal/MainModal";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

function SecondBlock(props) {
  const [modalActive, setModalActive] = useState(false);

  const { datesArray } = props;

  console.log("availableDates: ", datesArray);

  const newDateArray = datesArray?.map((one) => one.day);

  const getDays = () => {
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

  const [selectedDay, setSelectedDay] = useState(utils().getToday());

  const setCalendarValue = (day) => {
    setSelectedDay(day);
    console.log("Selected Day: ", day);
    props.getTime();
  };

  const addMonth = () => {
    setSelectedDay(selectedDay.day + 1);
  };

  console.log("Date: ", selectedDay);

  const setMonth = () => {
    if (selectedDay.month > 11) {
      setSelectedDay((prev) => ({ ...prev, month: 1 }));
    } else if (selectedDay.month < 2) {
      setSelectedDay((prev) => ({ ...prev, month: 12 }));
    } else {
      setSelectedDay((prev) => ({ ...prev, month: prev.month + 1 }));
    }
    props.getTime();
  };

  const removeMonth = () => {
    if (selectedDay.month < 11) {
      setSelectedDay((prev) => ({ ...prev, month: 1 }));
    } else if (selectedDay.month > 2) {
      setSelectedDay((prev) => ({ ...prev, month: 12 }));
    } else {
      setSelectedDay((prev) => ({ ...prev, month: prev.month - 1 }));
    }
  };

  const minimumDate = {
    year: 2022,
    month: 7,
    day: 10,
  };

  const maximumDate = {
    year: 2022,
    month: 7,
    day: 21,
  };

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
            {/* <Cal
              // selectedDay={props.selectedDay}
              // handleDayChange={props.handleDayChange}
              // value={props.datesArray}
              // onChange={setSelectedDayRange}
              // shouldHighlightWeekends
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              shouldHighlightWeekends
            /> */}
            <Calendar
              // value={datesArray}
              onChange={(day) => setCalendarValue(day)}
              shouldHighlightWeekends
              disabledDays={getDays()}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
            <div style={{ display: "flex" }} onClick={removeMonth}>
              {" "}
              ←{" "}
            </div>
            <div onClick={setMonth}> → </div>
          </div>
          {/* <div>
            <button onClick={props.getDates}>Add date</button>
          </div> */}
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
    </div>
  );
}

export default SecondBlock;
