import React from "react";
import "./Time.css";
import Arrow from "../Calendar/vector.jpg";
import ArrowLeft from "../Calendar/vectorleft.png";

function Time(props) {
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
      <button id="slideRight" type="button" onClick={buttonRight}>
        <img src={Arrow} alt="" />
      </button>
    </div>
  );
}

export default Time;
