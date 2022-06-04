import React from "react";
import Image from "../FirstBlock/img/Image";
import "./LastBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import moment from "moment";

function LastBlock(props) {
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
          <div className="title third-title">Almost there</div>
          <div className="last-info">
            <div className="info-body">
              <div className="restaurant-info">
                <div className="restaurant-name">Rositas Bistro</div>
                <div className="adress">
                  Borgergade 20
                  <br />
                  9000 Aalborg
                  <br />
                  Denmark
                </div>
                <div className="guests-date">
                  Guests: &nbsp;
                  <b>{props.guestValue}</b>
                  <br />
                  Day/time: &nbsp;
                  <b>
                    {moment(props.selectedDate).format("DD-MM-YYYY")}{" "}
                    {props.time}
                  </b>
                </div>
              </div>
              <div className="client-info">
                <div className="client-title">Your contact information</div>
                <div className="client-adress">
                  {props.inputFirstName} {props.inputLastName} <br />
                  {props.inputMobile} <br />
                  {props.inputEmail} <br />
                  {props.inputZip}
                </div>
                <div className="guests-date">
                  Not correct?
                  <br />
                  <a href="/#">Edit my information</a> &nbsp;
                  <a href="/#">Not me</a>
                </div>
              </div>
            </div>

            <div className="form">
              <div className="client-title__comment">Add a comment</div>
              <div className="form-comment">
                <input
                  type="text"
                  className="form-name__comment"
                  placeholder="Add the comment"
                />
              </div>
              <div className="checkbox">
                <input
                  id="first-checkbox"
                  type="checkbox"
                  style={{ width: "14px", heigth: "14px", marginRight: "8px" }}
                />
                Get restaurant news and inspiration from DinnerBooking.com on
                email. &nbsp; <a href="/#">See our privacy policy</a>
              </div>
              <div className="second-checkbox">
                <input
                  type="checkbox"
                  style={{
                    width: "14px",
                    heigth: "14px",
                    marginRight: "8px",
                  }}
                />
                I would like to receive the restaurant newsletter by email.
              </div>
            </div>
          </div>

          <div className="next-button second-next-button">
            <a href="/#" className="next" onClick={props.handleChangeItem}>
              Complete booking →
            </a>
          </div>
          <div className="copyrigth-footer">
            <Copyrigth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastBlock;
