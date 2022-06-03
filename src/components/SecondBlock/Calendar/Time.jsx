import React from "react";
import "./Time.css";

function Time(props) {
  return (
    <div>
      {props.bookedTimes.map((e) => {
        return (
          <div key={e} className="block-buttons">
            <div onClick={(e) => props.setTime(e.currentTarget.textContent)}>
              <button className="time-button">{e}</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Time;
