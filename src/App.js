import React, { useEffect, useState } from "react";
import "./App.css";
import MainBlock from "./components/FirstBlock/MainBlock.jsx";
import { Carousel } from "react-responsive-carousel";
import SecondBlock from "./components/SecondBlock/SecondBlock";
import { useRef } from "react";
import LastBlock from "./components/LastBlock/LastBlock";
import "./components/FourthBlock/FourthBlock.css";
import myAxios from "./API";
import moment from "moment";
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

  // Date request

  const [dates, setDates] = useState();
  const datesArray = dates?.map((data) => ({
    year: Number(data.slice(0, 4)),
    month: Number(data.slice(5, 7)),
    day: Number(data.slice(8, 10)),
  }));

  console.log("Array:", datesArray);

  useEffect(() => {
    const getDates = () => {
      myAxios
        .get(
          "/api/free_dates?place_id=1&area_id=1&seats=2&from=2022-07-01&to=2022-07-10",
          {}
        )
        .then((response) => {
          setDates(response.data);
          // moment(dates.forEach).format("DD-MM-YYYY");
          console.log("Response", response.data);
          console.log("Dates", dates);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
    getDates();
  }, []);

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
    const config =
      type === "logout" || type === "edit"
        ? {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        : {};

    console.log("Type and config: ", type, config);

    myAxios
      .post(
        url,
        {
          ...data,
        },
        config
      )
      .then((response) => {
        console.log("registered");
        console.log("resp", response.data);
        console.log("Type:", type, type === "register", type === "login");
        console.log("URL:", url);
        type === "register" && setUserData(response.data.customer);
        if (type === "register" || type === "login") {
          localStorage.setItem("token", response.data.token);
          handleChangeItem();
        }
        type === "email" && setDefaultModal("login");
        type === "login" && getUserInfoReq();
        if (type === "logout") {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (type === "register" || type === "edit") {
          setErrorsResp({
            title: "Please go back and fix the errors:",
            emailError: error.response.data.errors.email,
            passError: error.response.data.errors.password,
          });
        }
        console.log("reg error", error);
        type === "email" && setDefaultModal("register");
      });
  };

  // Email check
  const [defaultModal, setDefaultModal] = useState("email");

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

  // getTime request

  const [times, setTimes] = useState();

  const getTime = () => {
    myAxios
      .get("/api/free_time", {
        place_id: 2,
        area_id: 1,
        seats: 2,
        date: "2022-06-01",
      })
      .then((response) => {
        setTimes(response.data);
        console.log("Response", response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Make order request

  const makeOrder = () => {
    myAxios
      .post("/api/make_order", {
        place_id: 2,
        area_id: 1,
        seats: 2,
        reservation_time: "2022-05-18 12:00:00",
        comment: "",
        is_take_away: 0,
      })
      .then((response) => {
        setTimes(response.data);
        console.log("Response: ", response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
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
            defaultModal={defaultModal}
            setDefaultModal={setDefaultModal}
            postRequest={postRequest}
            errorsResp={errorsResp}
            userData={userData}
            setUserData={setUserData}
            datesArray={datesArray}
            getTime={getTime}
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
            userData={userData}
            setUserData={setUserData}
            defaultModal={defaultModal}
            setDefaultModal={setDefaultModal}
            makeOrder={makeOrder}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default App;
