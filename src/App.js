import React, { useState } from "react";
import "./App.css";
import MainBlock from "./components/FirstBlock/MainBlock.jsx";
import { Carousel } from "react-responsive-carousel";
import SecondBlock from "./components/SecondBlock/SecondBlock";
import { useRef } from "react";
import ThirdBlock from "./components/ThirdBlock/ThirdBlock";
import FourthBlock from "./components/FourthBlock/FourthBlock";
import LastBlock from "./components/LastBlock/LastBlock";

const App = () => {
  const ref = useRef(null);

  const handleChangeItem = () => {
    ref.current?.increment();
  };

  const handlePrevItem = () => {
    ref.current?.decrement();
  };

  const [guestValue, setGuestValue] = useState(0);

  function increment() {
    setGuestValue(guestValue + 1);
  }

  function decrement() {
    if (guestValue !== 0) {
      setGuestValue(guestValue - 1);
    }
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputZip, setInputZip] = useState("");

  return (
    <div>
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        autoPlay={false}
        ref={ref}
      >
        <div>
          <MainBlock
            handleChangeItem={handleChangeItem}
            increment={increment}
            decrement={decrement}
            guestValue={guestValue}
          />
        </div>
        <div>
          <SecondBlock
            handleChangeItem={handleChangeItem}
            handlePrevItem={handlePrevItem}
            guestValue={guestValue}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div>
          <ThirdBlock
            handleChangeItem={handleChangeItem}
            handlePrevItem={handlePrevItem}
            guestValue={guestValue}
            inputFirstName={inputFirstName}
            setInputFirstName={setInputFirstName}
            inputLastName={inputLastName}
            setInputLastName={setInputLastName}
            inputEmail={inputEmail}
            setInputEmail={setInputEmail}
            inputMobile={inputMobile}
            setInputMobile={setInputMobile}
            inputZip={inputZip}
            setInputZip={setInputZip}
          />
        </div>
        <div>
          <FourthBlock
            handleChangeItem={handleChangeItem}
            handlePrevItem={handlePrevItem}
            guestValue={guestValue}
          />
        </div>
        <div>
          <LastBlock
            handleChangeItem={handleChangeItem}
            handlePrevItem={handlePrevItem}
            guestValue={guestValue}
            selectedDate={selectedDate}
            inputFirstName={inputFirstName}
            inputLastName={inputLastName}
            inputEmail={inputEmail}
            inputMobile={inputMobile}
            inputZip={inputZip}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default App;
