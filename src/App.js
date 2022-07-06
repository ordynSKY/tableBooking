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
import { utils } from "react-modern-calendar-datepicker";
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

  const [selectedDay, setSelectedDay] = useState(utils().getToday());
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

  const getDates = (day) => {
    myAxios
      .get("/api/free_dates", {
        params: {
          place_id: 2,
          area_id: 1,
          seats: guestValue,
          from: `${day.year}-${
            day.month < 10 ? "0" + day.month : day.month
          }-01`,
          to: `${day.year}-${
            day.month < 10 ? "0" + day.month : day.month
          }-${new Date(day.year, day.month + 1, 0).getDate()}`,
        },
      })
      .then((response) => {
        setDates(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getDates(utils().getToday());
  }, []);

  // New state

  const [allowEmails, setAllowEmails] = useState(0);
  const [allowNews, setAllowNews] = useState(0);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zip_code: "",
    password: "",
    password_confirmation: "",
    allow_send_emails: allowEmails,
    allow_send_news: allowNews,
    language: "en",
    address: "",
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

    myAxios
      .post(
        url,
        {
          ...data,
        },
        config
      )
      .then((response) => {
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

  const [times, setTimes] = useState([]);

  const getTime = (day) => {
    myAxios
      .get("/api/free_time", {
        params: {
          place_id: 2,
          area_id: 1,
          seats: guestValue,
          date: `${day.year}-${day.month < 10 ? "0" + day.month : day.month}-${
            day.day
          }`,
        },
      })
      .then((response) => {
        const timesArray = response.data?.map((time) => ({
          time: String(time.slice(11, 19)),
          active: true,
          shortTime: String(time.slice(11, 16)),
        }));
        setTimes(timesArray);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // Make order request

  const [isTakeAway, setIsTakeAway] = useState(0);
  const [selectedTime, setSelectedTime] = useState("18:00");

  const makeOrder = (oneTime) => {
    myAxios
      .post(
        "/api/make_order",
        {
          place_id: 2,
          area_id: 1,
          seats: guestValue,
          reservation_time: `${selectedDay.year}-${
            selectedDay.month < 10 ? "0" + selectedDay.month : selectedDay.month
          }-${selectedDay.day} ${selectedTime}`,
          comment: "",
          is_take_away: isTakeAway,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  console.log("Default Modal: ", defaultModal);

  // Get restaurant info request

  const [restaurantInfo, setRestaurantInfo] = useState({
    address: "",
    city: "",
    name: "",
    zip_code: "",
    country: "",
  });

  const getRestaurantInfo = () => {
    myAxios
      .get("/api/places/2")
      .then((response) => {
        setRestaurantInfo({
          ...restaurantInfo,
          address: response.data.address,
          city: response.data.city,
          name: response.data.name,
          zip_code: response.data.zip_code,
          country: response.data.country.name,
        });
        console.log("Restaurant Info: ", response.data);
      })
      .catch((error) => {
        console.log("Restaurant Info error: ", error);
      });
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

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
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            handleDayChange={handleDayChange}
            defaultModal={defaultModal}
            setDefaultModal={setDefaultModal}
            postRequest={postRequest}
            errorsResp={errorsResp}
            userData={userData}
            setUserData={setUserData}
            datesArray={datesArray}
            getTime={getTime}
            getDates={getDates}
            times={times}
            setTimes={setTimes}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>

        <div>
          <LastBlock
            handleChangeItem={handleChangeItem}
            handlePrevItem={handlePrevItem}
            guestValue={guestValue}
            orderDate={orderDate}
            logout={logout}
            postRequest={postRequest}
            errorsResp={errorsResp}
            userData={userData}
            setUserData={setUserData}
            defaultModal={defaultModal}
            setDefaultModal={setDefaultModal}
            makeOrder={makeOrder}
            isTakeAway={isTakeAway}
            setIsTakeAway={setIsTakeAway}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedTime={selectedTime}
            allowEmails={allowEmails}
            setAllowEmails={setAllowEmails}
            allowNews={allowNews}
            setAllowNews={setAllowNews}
            restaurantInfo={restaurantInfo}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default App;
