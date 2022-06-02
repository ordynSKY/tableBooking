import React from "react";
import "./Counter.css";

function Counter(props) {
  return (
    <div className="counter">
      <button onClick={props.decrement} className="decrement">
        –
      </button>
      <div className="title-counter">{props.guestValue} guests</div>
      <button onClick={props.increment} className="increment">
        +
      </button>
    </div>
  );
}

export default Counter;
