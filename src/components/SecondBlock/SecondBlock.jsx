import React from "react";
import Image from "../FirstBlock/img/Image";
import "./SecondBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Calendar from "./Calendar/Calendar.jsx";
import moment from "moment";

function SecondBlock(props) {
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
            <Calendar
              selectedDate={props.selectedDate}
              handleDateChange={props.handleDateChange}
            />
          </div>
          <div>{moment(props.selectedDate).format("DD-MM-YYYY HH:mm")}</div>
          <div className="next-button">
            <a href="/#" className="next" onClick={props.handleChangeItem}>
              Next →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondBlock;
