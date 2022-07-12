import React from "react";
import Image from "./img/Image.jsx";
import "./MainBlock.css";
import SelectLang from "./SelectLang/SelectLang.jsx";
import Title from "./Title/Title.jsx";
import Counter from "./Counter/Counter.jsx";
import Info from "./Info/Info.jsx";
import Cancel from "./Cancel/Cancel.jsx";
import Copyrigth from "./Copyrigth/Copyrigth.jsx";

function MainBlock(props) {
  const isValid = props.guestValue;

  const changeType = () => {
    props.handleChangeItem();
    props.setBlockType("secondblock");
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
            <Cancel />
            <Copyrigth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlock;
