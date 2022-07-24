import React, { useState } from "react";
import Image from "../FirstBlock/img/Image";
import "./LastBlock.css";
import SelectLang from "../FirstBlock/SelectLang/SelectLang";
import Copyrigth from "../FirstBlock/Copyrigth/Copyrigth";
import MainModal from "../MainModal/MainModal";

function LastBlock(props) {
  const [modalActive, setModalActive] = useState(false);

  const { selectedDay, selectedTime, restaurantInfo, orderResponse } = props;

  const showModalWindow = (e) => {
    e.preventDefault();
    props.setDefaultModal("edit");
    setModalActive(true);
  };

  const makeOrderDone = (e) => {
    e.preventDefault();
    props.makeOrder();
    setModalActive(true);
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 4000);
    props.setDefaultModal("done");
  };

  const logout = (e) => {
    e.preventDefault();
    props.setDefaultModal("logout");
    props.postRequest({}, "/api/customers/logout", "logout");
  };

  const handleOnChangeEmail = () => {
    if (props.allowEmails === 0) {
      props.setAllowEmails(1);
    } else {
      props.setAllowEmails(0);
    }
  };

  const handleOnChangeNews = () => {
    if (props.allowNews === 0) {
      props.setAllowNews(1);
    } else {
      props.setAllowNews(0);
    }
  };

  const changeType = () => {
    props.handlePrevItem();
    props.setBlockType("secondblock");
  };

  return (
    <div className="content">
      <Image />
      <div className="content-wrapper">
        <div className="main-block__body">
          <div className="nav">
            <div className="back">
              <a href="/#" className="back-link" onClick={changeType}>
                ← Back
              </a>{" "}
              |{" "}
              <a href="#/" className="back-link" onClick={(e) => logout(e)}>
                Logout
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
                <div className="restaurant-name">{restaurantInfo.name}</div>
                <div className="adress">
                  {restaurantInfo.address}
                  <br />
                  {restaurantInfo.zip_code} {restaurantInfo.city}
                  <br />
                  {restaurantInfo.country}
                </div>
                <div className="guests-date">
                  Guests: &nbsp;
                  <b>{props.guestValue}</b>
                  <br />
                  Day/time: &nbsp;
                  <b>
                    {`${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`}{" "}
                    {selectedTime.slice(0, 5)}
                  </b>
                </div>
              </div>
              <div className="client-info">
                <div className="client-title">Your contact information</div>
                <div className="client-adress">
                  {props.userData.first_name} {props.userData.last_name}
                  <br />
                  {props.userData.email}
                  <br />
                  {props.userData.phone}
                  <br />
                  {props.userData.zip_code}
                </div>
                <div className="guests-date">
                  Not correct?
                  <br />
                  <a href="/#" onClick={(e) => showModalWindow(e)}>
                    Edit my information
                  </a>
                  &nbsp;
                  <a href="/">Not me</a>
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
              <div
                className="second-checkbox"
                style={{
                  display: "flex",
                  paddingBottom: "10px",
                }}
              >
                <input
                  type="radio"
                  id="takeawayChoice"
                  name="takeaway"
                  value="takeaway"
                  onClick={() => props.setIsTakeAway(1)}
                />
                <label htmlFor="contactChoice1">Take away</label>
              </div>
              <div
                className="second-checkbox"
                style={{
                  display: "flex",
                }}
              >
                <input
                  type="radio"
                  id="eathereChoice"
                  name="takeaway"
                  value="eathere"
                  onClick={() => props.setIsTakeAway(0)}
                />
                <label htmlFor="eathereChoice">Eat here</label>
              </div>
              <div className="checkbox">
                <input
                  id="first-checkbox"
                  type="checkbox"
                  onChange={handleOnChangeEmail}
                  style={{ width: "14px", heigth: "14px", marginRight: "8px" }}
                />
                <div>
                  Get restaurant news and inspiration from DinnerBooking.com on
                  email. <a href="/#">See our privacy policy</a>
                </div>
              </div>
              <div className="second-checkbox">
                <input
                  type="checkbox"
                  onChange={handleOnChangeNews}
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
            <a href="/#" className="next" onClick={(e) => makeOrderDone(e)}>
              Complete booking →
            </a>
          </div>
          <div className="copyrigth-footer">
            <Copyrigth />
          </div>
          {props.defaultModal === "edit" && (
            <MainModal
              title="Enter your contact details"
              active={modalActive}
              setActive={setModalActive}
              callback={props.postRequest}
              errorsResp={props.errorsResp}
              defaultModal={"edit"}
              userData={props.userData}
              setUserData={props.setUserData}
            />
          )}

          {props.defaultModal === "done" && (
            <MainModal
              title="DONE!"
              active={modalActive}
              setActive={setModalActive}
              defaultModal={"done"}
              orderResponse={orderResponse}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LastBlock;
