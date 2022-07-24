import React, { useState } from "react";
import Image from "../FirstBlock/img/Image";
import "./SecondBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import Time from "./Calendar/Time";
import MainModal from "../MainModal/MainModal";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import WaitingModal from "./WaitingModal/WaitingModal";

function SecondBlock(props) {
  const {
    datesArray,
    selectedDay,
    setSelectedDay,
    setModalActive,
    modalActive,
    timeline,
    setTimeline,
  } = props;

  const setTimelineType = (type) => {
    setTimeline(type);
  };

  console.log("Time Type: ", timeline);

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

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      props.getUserInfoReq();
      props.handleChangeItem();
    } else {
      setModalActive(true);
    }
    props.setBlockType("lastblock");
  };

  console.log("Selected Day: ", props.blockType);
  console.log("Active: ", props);

  const getTitle = {
    waiting: "Please select a waiting list",
    agreements: "Confirm waiting list conditions",
    submit: "You are about to be added to the waiting list",
    ordered: `Thanks ${props.userData.first_name} - you have been added to the waiting list`,
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
          {/* <Time
            makeOrder={props.makeOrder}
            times={props.times}
            setTimes={props.setTimes}
            selectedTime={props.selectedTime}
            setSelectedTime={props.setSelectedTime}
          /> */}
          {props.blockType === "secondblock" && (
            <div>
              <div className="select-time">
                <p
                  className="select-time-title"
                  onClick={() => setTimelineType(120)}
                >
                  {props.extraTimeReq.name}
                </p>
                {props.extraTimeReq.description}
                {timeline === 120 && (
                  <Time
                    makeOrder={props.makeOrder}
                    extraTime={props.extraTime}
                    setExtraTime={props.setExtraTime}
                    selectedTime={props.selectedTime}
                    setSelectedTime={props.setSelectedTime}
                  />
                )}
              </div>
              {/* <div className="select-time">
                <p
                  className="select-time-title"
                  onClick={() => setTimelineType(180)}
                >
                  Eat & stay +180 minutes
                </p>
                Denne booking giver dig bordet hele aftenen og tid til at nyde
                lige så mange retter du har lyst til
                {timeline === 180 && (
                  <Time
                    makeOrder={props.makeOrder}
                    times={props.times}
                    setTimes={props.setTimes}
                    selectedTime={props.selectedTime}
                    setSelectedTime={props.setSelectedTime}
                  />
                )}
              </div> */}
            </div>
          )}
          <div className="button-main next-button" onClick={checkToken}>
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
      {(props.defaultModal === "email" ||
        props.defaultModal === "emailWait") && (
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
      {(props.defaultModal === "login" ||
        props.defaultModal === "loginWait") && (
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
      {(props.defaultModal === "waiting" ||
        props.defaultModal === "agreements" ||
        props.defaultModal === "submit" ||
        props.defaultModal === "ordered") && (
        <WaitingModal
          title={getTitle[props.defaultModal] || ""}
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
          restaurantInfo={props.restaurantInfo}
          guestValue={props.guestValue}
          getUserInfoReq={props.getUserInfoReq}
          setModalActive={setModalActive}
        />
      )}
      {/* {props.defaultModal === "agreements" && (
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
      )} */}
      {/* {props.defaultModal === "submit" && (
        <WaitingModal
          title="You are about to be added to the waiting list"
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
      )} */}
    </div>
  );
}

export default SecondBlock;
