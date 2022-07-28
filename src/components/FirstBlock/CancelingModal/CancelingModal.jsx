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

  const setCancelType = () => {
    if (defaultModal === "canceling" && localStorage.getItem("token")) {
      props.getOrders();
    } else if (defaultModal === "canceling") {
      props.setDefaultModal("confirmation");
    }
  };

  const setMoreType = () => {
    if (defaultModal === "canceling" && localStorage.getItem("token")) {
      props.getOrders();
    } else if (defaultModal === "canceling") {
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

  console.log("User Data: ", props.userData);
  console.log("Type: ", defaultModal);

  return (
    <div
      className={props.active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {defaultModal !== "morePeople" && (
          <div className="title modal-title">
            Cancel reservation at Rositas Bistro
          </div>
        )}
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
                  <b>{props.filteredOrder[0].seats}</b>
                  <br />
                  Day/time: &nbsp;
                  <b>{`${props.filteredOrder[0].reservation_time.slice(
                    0,
                    10
                  )} ${props.filteredOrder[0].reservation_time.slice(
                    11,
                    16
                  )}`}</b>
                </div>
              </div>
            </div>
          </div>
        )}
        {defaultModal === "morePeople" && (
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
              <div className="client-info">
                <div className="client-title">Your contact information</div>
                <div
                  className="client-adress"
                  style={{ justifyContent: "center", textAlign: "center" }}
                >
                  {props.userData.first_name} {props.userData.last_name}
                  <br />
                  {props.userData.email}
                  <br />
                  {props.userData.phone}
                  <br />
                  {props.userData.zip_code}
                </div>
              </div>
            </div>
            <div style={{}}>
              <div className="client-title__comment">Add a comment</div>
              <div className="form-comment">
                <input
                  type="text"
                  className="form-name__comment"
                  placeholder="Add the comment"
                />
              </div>
            </div>
          </div>
        )}
        {defaultModal === "canceling" ||
          (defaultModal === "morePeople" && (
            <div className="modal-button">
              <button
                type="button"
                className="button-main"
                onClick={() => setCancelType()}
              >
                Continue →
              </button>
            </div>
          ))}
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
        {!props.ordersError && (
          <div className="error-response">{props.ordersErrorString}</div>
        )}
      </div>
    </div>
  );
}
