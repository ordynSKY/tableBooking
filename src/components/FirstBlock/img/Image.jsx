import React, { useState, useEffect } from "react";
import "./Image.css";
import myAxios from "../../../API";

function Image(props) {
  const [mainImage, setMainImage] = useState(null);

  const { getAddress } = props;

  const getImage = () => {
    myAxios
      .get("/api/files_purpose", {
        params: {
          place_id: getAddress(),
          purpose: "online_booking_picture",
        },
      })
      .then((response) => {
        setMainImage(response.data.url);
      })
      .catch((error) => {
        console.log("Restaurant Info error: ", error);
      });
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="main-image_picture">
      <img className="main-image" src={mainImage} alt="" />
    </div>
  );
}

export default Image;
