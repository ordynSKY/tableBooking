import React, { useState } from "react";
import "./App.css";
import MainBlock from "./components/FirstBlock/MainBlock.jsx";
import { Carousel } from "react-responsive-carousel";
import SecondBlock from "./components/SecondBlock/SecondBlock";
import { useRef } from "react";
import ThirdBlock from "./components/ThirdBlock/ThirdBlock";
import FourthBlock from "./components/FourthBlock/FourthBlock";
import LastBlock from "./components/LastBlock/LastBlock";
import myAxios from "./API";

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

  // Another calendar

  const [selectedDay, setSelectedDay] = useState(null);
  const [orderDate, setOrderDate] = useState("");

  const handleDayChange = (date) => {
    setSelectedDay(date);
    setOrderDate(date.year + "-" + date.month + "-" + date.day);
  };

  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputZip, setInputZip] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorRespEmail, setErrorRespEmail] = useState("");
  const [errorRespPass, setErrorRespPass] = useState("");
  const [errorRespTitle, setErrorRespTitle] = useState("");

  const postRequest = () => {
    myAxios
      .post("/api/customers/register", {
        first_name: inputFirstName,
        last_name: inputLastName,
        email: inputEmail,
        phone: inputMobile,
        zip_code: inputZip,
        allow_send_emails: 1,
        allow_send_news: 0,
        password: inputPassword,
        password_confirmation: confirmPassword,
        language: "en",
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        handleChangeItem();
      })
      .catch((error) => {
        // console.log("error", error);
        setErrorRespTitle("Please go back and fix the errors:");
        setErrorRespEmail(error.response.data.errors.email);
        setErrorRespPass(error.response.data.errors.password);
      });
  };

  const [time, setTime] = useState("18:00");
  let bookedTimes = [
    "18:00",
    "18:15",
    "18:45",
    "19:00",
    "19:15",
    "19:45",
    "20:00",
    "20:15",
    "20:45",
    "21:00",
    "21:15",
    "21:45",
    "22:00",
  ];

  return (
    <div>
      <Carousel
        swipeable={false}
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
            bookedTimes={bookedTimes}
            time={time}
            setTime={setTime}
            selectedDay={selectedDay}
            handleDayChange={handleDayChange}
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
            inputPassword={inputPassword}
            setInputPassword={setInputPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            postRequest={postRequest}
            errorRespTitle={errorRespTitle}
            errorRespEmail={errorRespEmail}
            errorRespPass={errorRespPass}
          />
        </div>
        <div>
          <LastBlock
            handleChangeItem={handleChangeItem}
            handlePrevItem={handlePrevItem}
            guestValue={guestValue}
            orderDate={orderDate}
            time={time}
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
