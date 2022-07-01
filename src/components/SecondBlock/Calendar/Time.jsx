import React from "react";
import "./Time.css";
import Arrow from "../Calendar/vector.jpg";
import ArrowLeft from "../Calendar/vectorleft.png";
import { useState } from "react";
import { Children } from "react";

function Time(props) {
  const [activeButton, setActiveButton] = useState(null);

  let buttonRight = document.getElementById("slideRight");
  let buttonLeft = document.getElementById("slideLeft");

  buttonRight = function () {
    document.querySelector(".block-button__slider").scrollLeft += 200;
  };
  buttonLeft = function () {
    document.querySelector(".block-button__slider").scrollLeft -= 200;
  };

  return (
    <div className="mainblock">
      <button id="slideLeft" type="button" onClick={buttonLeft}>
        <img src={ArrowLeft} alt="" />
      </button>
      <div className="block-button__slider">
        {Children.toArray(
          props.bookedTimes.map((e, i) => {
            return (
              <div className="block-buttons">
                <div
                  onClick={(e) => {
                    return (
                      props.setTime(e.currentTarget.textContent),
                      setActiveButton(i)
                    );
                  }}
                >
                  <button
                    className={`time-button${
                      activeButton === i ? " active" : ""
                    }`}
                    onClick={props.makeOrder}
                  >
                    {e}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <button id="slideRight" type="button" onClick={buttonRight}>
        <img src={Arrow} alt="" />
      </button>
    </div>
  );
}

export default Time;
