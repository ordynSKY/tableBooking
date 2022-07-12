import Time from "../Calendar/Time";
import "./WaitingModal.css";

export default function WaitingModal(props) {
  const dispErrors = props.errorsResp;
  const {
    title,
    defaultModal,
    setDefaultModal,
    setActive,
    selectedDay,
    restaurantInfo,
    selectedTime,
  } = props;

  const setType = () => {
    if (defaultModal === "waiting") {
      props.setDefaultModal("agreements");
    }
    if (defaultModal === "agreements" && localStorage.getItem("token")) {
      setDefaultModal("submit");
      props.getUserInfoReq();
    } else if (defaultModal === "agreements") {
      setDefaultModal("emailWait");
    }
  };

  const makeOrderDone = () => {
    props.makeOrder();
    props.setModalActive(true);
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 4000);
    setDefaultModal("ordered");
  };

  console.log("Default: ", defaultModal);

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
        {(defaultModal === "submit" || defaultModal === "ordered") && (
          <div>
            <div
              className="info-body"
              style={{ backgroundColor: "#f6f6f6", paddingBottom: "9px" }}
            >
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
                  <a href="/#">Edit my information</a>
                  &nbsp;
                  <a href="/">Not me</a>
                </div>
              </div>
            </div>
          </div>
        )}
        {defaultModal !== "waiting" &&
          defaultModal !== "agreements" &&
          defaultModal !== "ordered" && (
            <div className="form">
              <div className="title-comment-waiting">Add a comment</div>
              <div>
                <input
                  type="text"
                  className="form-comment-waiting"
                  placeholder="Add the comment"
                />
              </div>
            </div>
          )}

        {(defaultModal === "waiting" || defaultModal === "agreements") && (
          <div className="modal-button">
            <button
              type="button"
              className="button-main"
              onClick={() => setType()}
            >
              Continue →
            </button>
          </div>
        )}
        {defaultModal === "submit" && (
          <div className="modal-button">
            <button
              type="button"
              className="button-main"
              onClick={() => makeOrderDone()}
            >
              Continue →
            </button>
          </div>
        )}
        {defaultModal === "ordered" && (
          <div style={{ marginTop: "50px" }}>
            <div>
              <a href="/#" className="waiting-footer">
                Go back to the restaurant profile page
              </a>
            </div>
            <div>
              <a href="/#" className="waiting-footer">
                Cancel a booking
              </a>
            </div>
            <div>
              <a href="/" className="waiting-footer">
                New booking
              </a>
            </div>
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
