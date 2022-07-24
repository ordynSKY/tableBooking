import React from "react";

function Cancel(props) {
  const showModalWindow = (e) => {
    e.preventDefault();
    props.setDefaultModal("canceling");
    props.setModalActive(true);
  };

  console.log("Is active: ", props.modalActive);

  return (
    <a href="/#" className="cancel-booking" onClick={(e) => showModalWindow(e)}>
      Cancel Booking
    </a>
  );
}

export default Cancel;
