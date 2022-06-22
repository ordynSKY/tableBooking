import React, { useState } from "react";
import "./App.css";
import MainBlock from "./components/FirstBlock/MainBlock.jsx";
import { Carousel } from "react-responsive-carousel";
import SecondBlock from "./components/SecondBlock/SecondBlock";
import { useRef } from "react";
// import ThirdBlock from "./components/ThirdBlock/ThirdBlock";
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

  const mainProps = {
    title: "Next →",
    inputEmail: inputEmail,
  };

  // another errorstate
  const [errorsResp, setErrorsResp] = useState({
    title: "",
    emailError: "",
    passError: "",
  });

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
        console.log("registered");
      })
      .catch((error) => {
        setErrorsResp({
          title: "Please go back and fix the errors:",
          emailError: error.response.data.errors.email,
          passError: error.response.data.errors.password,
        });
        console.log(error);
      });
  };

  // Email check
  const [defaultModal, setDefaultModal] = useState("email");

  const emailRequest = () => {
    myAxios
      .post("api/customers/verify", {
        email: inputEmail,
      })
      .then((response) => {
        setDefaultModal("login");
      })
      .catch((error) => {
        setDefaultModal("register");
      });
  };

  // Login request

  const userDataState = (userData1) => {
    setInputFirstName(userData1?.first_name);
    setInputLastName(userData1?.last_name);
    setInputEmail(userData1?.email);
    setInputMobile(userData1?.phone);
    setInputZip(userData1?.zip_code);
    setInputPassword(userData1?.password);
    setConfirmPassword(userData1?.password_confirmation);
    console.log("getting user data", userData1);
    console.log("getting user data", userData1?.email);
  };

  const [userData, setUserData] = useState(null);

  const getUserInfoReq = () => {
    myAxios
      .get("api/customers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUserData(response.data);
        userDataState(response.data);
      })
      .catch((error) => {});
  };

  const loginRequest = () => {
    myAxios
      .post("api/customers/login", {
        email: inputEmail,
        password: inputPassword,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        handleChangeItem();
        getUserInfoReq();
      })
      .catch((error) => {
        console.log(error, "not logged");
      });
  };

  //Logout request

  const logout = () => {
    myAxios.post(
      "api/customers/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    localStorage.removeItem("token");
  };

  // Edit user info request

  const EditUserInfoReq = () => {
    myAxios
      .post(
        "/api/customers",
        {
          first_name: inputFirstName,
          last_name: inputLastName,
          email: inputEmail,
          phone: inputMobile,
          zip_code: inputZip,
          allow_send_emails: 1,
          allow_send_news: 0,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("edited");
      })
      .catch((error) => {
        setErrorsResp({
          title: "Please go back and fix the errors:",
          emailError: error.response.data.errors.email,
          passError: error.response.data.errors.password,
        });
        console.log("edit info error", error);
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
            mainProps={mainProps}
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
            emailRequest={emailRequest}
            // inputEmail={inputEmail}
            setInputEmail={setInputEmail}
            defaultModal={defaultModal}
            setDefaultModal={setDefaultModal}
            postRequest={postRequest}
            errorsResp={errorsResp}
            inputFirstName={inputFirstName}
            setInputFirstName={setInputFirstName}
            inputLastName={inputLastName}
            setInputLastName={setInputLastName}
            inputMobile={inputMobile}
            setInputMobile={setInputMobile}
            inputZip={inputZip}
            setInputZip={setInputZip}
            inputPassword={inputPassword}
            setInputPassword={setInputPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            loginRequest={loginRequest}
            mainProps={mainProps}
            EditUserInfoReq={EditUserInfoReq}
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
            // inputEmail={inputEmail}
            inputMobile={inputMobile}
            inputZip={inputZip}
            userData={userData}
            logout={logout}
            setInputEmail={setInputEmail}
            setInputFirstName={setInputFirstName}
            setInputLastName={setInputLastName}
            setInputMobile={setInputMobile}
            setInputZip={setInputZip}
            inputPassword={inputPassword}
            setInputPassword={setInputPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            postRequest={postRequest}
            errorsResp={errorsResp}
            userDataState={userDataState}
            mainProps={mainProps}
            EditUserInfoReq={EditUserInfoReq}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default App;
