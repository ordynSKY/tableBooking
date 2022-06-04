import React from "react";
import Background from "./image6.jpg";
import "./Image.css";

function Image() {
  return (
    <div className="main-image_picture">
      <img className="main-image" src={Background} alt="" />
    </div>
  );
}

export default Image;
