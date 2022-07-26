import React from "react";
import Image from "./img/Image.jsx";
import "./MainBlock.css";
import SelectLang from "./SelectLang/SelectLang.jsx";
import Title from "./Title/Title.jsx";
import Counter from "./Counter/Counter.jsx";
import Info from "./Info/Info.jsx";
import Cancel from "./Cancel/Cancel.jsx";
import Copyrigth from "./Copyrigth/Copyrigth.jsx";
import CancelingModal from "./CancelingModal/CancelingModal.jsx";
import MainModal from "../MainModal/MainModal.jsx";

function MainBlock(props) {
  const isValid = props.guestValue;

  const changeType = () => {
    props.handleChangeItem();
    props.setBlockType("secondblock");
  };

  const showModalWindow = (e) => {
    e.preventDefault();
    localStorage.getItem("token")
      ? props.setDefaultModal("canceling")
      : props.setDefaultModal("emailCancel");
    // props.setDefaultModal("canceling");
    props.setModalActive(true);
  };

  const getTitle = {
    canceling: "Canceling",
    confirmation: "You are about to cancel the following reservation:",
    canceled: "You cancelled the reservation",
  };

  return (
    <div className="content">
      <Image getAddress={props.getAddress} />
      <div className="content-wrapper">
        <div className="main-block__body">
          <SelectLang />
          <Title />
          <Counter
            increment={props.increment}
            decrement={props.decrement}
            guestValue={props.guestValue}
          />
          <button
            className="button-main"
            onClick={changeType}
            disabled={!isValid}
          >
            {props.mainProps.title}
          </button>
          <Info />
          <div className="main-footer">
            <a
              href="/#"
              className="cancel-booking"
              onClick={(e) => showModalWindow(e)}
            >
              Cancel Booking
            </a>
            {(props.defaultModal === "canceling" ||
              props.defaultModal === "confirmation" ||
              props.defaultModal === "canceled") && (
              <CancelingModal
                title={getTitle[props.defaultModal] || ""}
                active={props.modalActive}
                setActive={props.setModalActive}
                callback={props.cancelOrder}
                getOrders={props.getOrders}
                errorsResp={props.errorsResp}
                defaultModal={props.defaultModal}
                mainProps={props.mainProps}
                userData={props.userData}
                setUserData={props.setUserData}
                selectedDay={props.selectedDay}
                makeOrder={props.makeOrder}
                times={props.times}
                setTimes={props.setTimes}
                selectedTime={props.selectedTime}
                setSelectedTime={props.setSelectedTime}
                setDefaultModal={props.setDefaultModal}
                restaurantInfo={props.restaurantInfo}
                guestValue={props.guestValue}
                getUserInfoReq={props.getUserInfoReq}
                setModalActive={props.setModalActive}
                ordersError={props.ordersError}
                ordersErrorString={props.ordersErrorString}
                filteredOrder={props.filteredOrder}
              />
            )}
            {props.defaultModal === "emailCancel" && (
              <MainModal
                title="Please enter your email to continue"
                active={props.modalActive}
                setActive={props.setModalActive}
                mainProps={props.mainProps}
                callback={props.postRequest}
                defaultModal={props.defaultModal}
                userData={props.userData}
                setUserData={props.setUserData}
              />
            )}
            {props.defaultModal === "loginCancel" && (
              <MainModal
                title="Please enter your email and password to continue"
                active={props.modalActive}
                setActive={props.setModalActive}
                callback={props.postRequest}
                defaultModal={props.defaultModal}
                mainProps={props.mainProps}
                userData={props.userData}
                setUserData={props.setUserData}
              />
            )}
            <Copyrigth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlock;
