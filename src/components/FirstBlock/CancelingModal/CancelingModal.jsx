import PhoneInput from "react-phone-number-input";
import "./CancelingModal.css";

export default function CancelingModal(props) {
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
    if (defaultModal === "canceling") {
      props.setDefaultModal("confirmation");
    }
  };

  const makeOrderDone = () => {
    props.callback();
    props.setModalActive(true);
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 4000);
    setDefaultModal("canceled");
  };

  const setInput = (name, value) => {
    props.setUserData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("Is active: ", props);
  console.log("Type: ", props.userData.bookingid);

  return (
    <div
      className={props.active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="title modal-title">
          Cancel reservation at Rositas Bistro
        </div>
        <h2>{title}</h2>
        {defaultModal === "canceling" && (
          <div className="cancel-info">
            <p>
              Here you can cancel your booking. Enter your booking ID and the
              telephone no. you used when making the booking, below. Your
              booking ID is to be found in your confirmation mail. If you do not
              have your booking ID please contact the restaurant.
            </p>
            <div className="cancel-inputs">
              <input
                type="text"
                placeholder="Booking ID"
                className="bookingid-input"
                onChange={(event) => setInput("bookingid", event.target.value)}
              />
              <PhoneInput
                defaultCountry="DK"
                value={props.userData.phone}
                onChange={(val) => setInput("phone", val)}
                className="form-name__mobile"
                placeholder="Mobile  number"
                style={{ marginRigth: "0px" }}
              />
            </div>
          </div>
        )}
        {defaultModal === "confirmation" && (
          <div>
            <div
              className="info-body"
              style={{
                backgroundColor: "#f6f6f6",
                paddingBottom: "9px",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <div className="restaurant-info" style={{ textAlign: "center" }}>
                <div className="restaurant-name" style={{ display: "block" }}>
                  {restaurantInfo.name}
                </div>
                <div className="adress" style={{ display: "block" }}>
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
            </div>
          </div>
        )}
        {defaultModal === "canceling" && (
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
        {defaultModal === "confirmation" && (
          <div className="modal-button">
            <button
              type="button"
              className="button-main"
              onClick={() => makeOrderDone()}
            >
              Cancel booking →
            </button>
          </div>
        )}
        {defaultModal === "canceled" && (
          <div className="modal-button">
            <button
              type="button"
              className="button-main"
              style={{ width: "250px" }}
            >
              <a href="/" style={{ textDecoration: "none", color: "white" }}>
                Make new booking →
              </a>
            </button>
          </div>
        )}
        {(defaultModal === "confirmation" || defaultModal === "canceling") && (
          <div className="canceling-footer">
            <a href="/#">Return without canceling</a>
          </div>
        )}
      </div>
    </div>
  );
}
