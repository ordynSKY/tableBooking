import React from "react";
import Image from "./img/Image.jsx";
import "./MainBlock.css";
import SelectLang from "./SelectLang/SelectLang.jsx";
import Title from "./Title/Title.jsx";
import Counter from "./Counter/Counter.jsx";
import Info from "./Info/Info.jsx";
import Cancel from "./Cancel/Cancel.jsx";
import Copyrigth from "./Copyrigth/Copyrigth.jsx";

function MainBlock() {
  return (
    <div className="content">
      <Image />
      <div className="content-wrapper">
        <div className="main-block__body">
          <SelectLang />
          <Title />
          <Counter />
          <Info />
          <Cancel />
        </div>
        <Copyrigth />
      </div>
    </div>
  );
}

export default MainBlock;
