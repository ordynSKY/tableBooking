import React, { useState } from "react";
import "./App.css";
import MainBlock from "./components/FirstBlock/MainBlock.jsx";
import { Carousel } from "react-responsive-carousel";
import SecondBlock from "./components/SecondBlock/SecondBlock";
import { useRef } from "react";
import LastBlock from "./components/LastBlock/LastBlock";
import "./components/FourthBlock/FourthBlock.css";
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

  // New state
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zip_code: "",
    password: "",
    password_confirmation: "",
    allow_send_emails: 1,
    allow_send_news: 0,
    language: "en",
  });
  const mainProps = {
    title: "Next →",
  };

  // another errorstate
  const [errorsResp, setErrorsResp] = useState({
    title: "",
    emailError: "",
    passError: "",
  });

  // Register request

  const postRequest = (data, url, type) => {
    myAxios
      .post(url, {
        ...data,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUserData(response.data.customer);
        handleChangeItem();
        console.log("registered");
        console.log("resp", response.data);
      })
      .catch((error) => {
        setErrorsResp({
          title: "Please go back and fix the errors:",
          emailError: error.response.data.errors.email,
          passError: error.response.data.errors.password,
        });
        console.log("reg error", error);
      });
  };

  // Email check
  const [defaultModal, setDefaultModal] = useState("email");

  const emailRequest = () => {
    console.log("user data", userData);
    myAxios
      .post("/api/customers/verify", {
        email: userData.email,
      })
      .then((response) => {
        setDefaultModal("login");
      })
      .catch((error) => {
        setDefaultModal("register");
        console.log("email check error", error);
      });
  };

  // Login request

  const getUserInfoReq = () => {
    myAxios
      .get("/api/customers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {});
  };

  const loginRequest = () => {
    myAxios
      .post("/api/customers/login", {
        email: userData.email,
        password: userData.password,
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
      "/api/customers/logout",
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
          ...userData,
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
            defaultModal={defaultModal}
            setDefaultModal={setDefaultModal}
            postRequest={postRequest}
            errorsResp={errorsResp}
            loginRequest={loginRequest}
            EditUserInfoReq={EditUserInfoReq}
            userData={userData}
            setUserData={setUserData}
          />
        </div>

        <div>
          <LastBlock
            handleChangeItem={handleChangeItem}
            handlePrevItem={handlePrevItem}
            guestValue={guestValue}
            orderDate={orderDate}
            time={time}
            logout={logout}
            postRequest={postRequest}
            errorsResp={errorsResp}
            EditUserInfoReq={EditUserInfoReq}
            userData={userData}
            setUserData={setUserData}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default App;
