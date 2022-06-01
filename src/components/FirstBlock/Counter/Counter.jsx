import React, { useState } from "react";
import "./Counter.css";

function Counter() {
  const [guestValue, setGuestValue] = useState(0);

  function increment() {
    setGuestValue(guestValue + 1);
  }

  function decrement() {
    if (guestValue !== 0) {
      setGuestValue(guestValue - 1);
    }
  }

  return (
    <div className="counter">
      <button onClick={decrement} className="decrement">
        –
      </button>
      <div className="title-counter">{guestValue} guests</div>
      <button onClick={increment} className="increment">
        +
      </button>
    </div>
  );
}

export default Counter;
