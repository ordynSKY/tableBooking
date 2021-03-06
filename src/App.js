import React, { useEffect, useState } from "react";
import "./App.css";
import MainBlock from "./components/FirstBlock/MainBlock.jsx";
import { Carousel } from "react-responsive-carousel";
import SecondBlock from "./components/SecondBlock/SecondBlock";
import { useRef } from "react";
import LastBlock from "./components/LastBlock/LastBlock";
import "./components/FourthBlock/FourthBlock.css";
import myAxios from "./API";
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
    bookingid: "",
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

  const [modalActive, setModalActive] = useState(false);

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
        type === "login" && getUserInfoReq();
        if (type === "loginWait") {
          localStorage.setItem("token", response.data.token);
          getUserInfoReq();
          setDefaultModal("submit");
        }
        if (type === "loginCancel") {
          localStorage.setItem("token", response.data.token);
          setDefaultModal("canceling");
        }
        if (type === "loginMore") {
          localStorage.setItem("token", response.data.token);
          setDefaultModal("morePeople");
        }
        type === "email" && setDefaultModal("login");
        type === "emailWait" && setDefaultModal("loginWait");
        type === "emailCancel" && setDefaultModal("loginCancel");
        type === "emailMore" && setDefaultModal("loginMore");
        if (type === "logout") {
          localStorage.removeItem("token");
          window.location.reload();
        }
        if (type === "login") {
          setModalActive(false);
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
  const [blockType, setBlockType] = useState("mainblock");

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
          place_id: getAddress(),
          area_id: 1,
          seats: guestValue,
          date: `${day.year}-${normalizeNumber(day.month)}-${normalizeNumber(
            day.day
          )}`,
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

  // Get restaurant info request

  const [restaurantInfo, setRestaurantInfo] = useState({
    address: "",
    city: "",
    name: "",
    zip_code: "",
    country: "",
  });

  // Optimized Request

  const getAddress = () => {
    const placeId = Number(
      window.location.pathname.slice(
        window.location.pathname.lastIndexOf("/") + 1
      )
    );
    return placeId && !placeId.isNaN() ? placeId : 2;
  };

  const normalizeNumber = (number) => (number < 10 ? `0${number}` : number);

  const getDatesTimeInfo = (url, day, type) => {
    const localUrl = url || `/api/free_${type}`;
    let params =
      type === "info"
        ? {}
        : {
            place_id: getAddress(),
            area_id: 1,
            seats: guestValue,
          };
    if (type === "dates") {
      params = {
        ...params,
        from: `${day.year}-${normalizeNumber(day.month)}-01`,
        to: `${day.year}-${normalizeNumber(day.month)}-${new Date(
          day.year,
          day.month,
          0
        ).getDate()}`,
      };
    }
    if (type === "time") {
      params = {
        ...params,
        date: `${day.year}-${normalizeNumber(day.month)}-${normalizeNumber(
          day.day
        )}`,
      };
    }
    myAxios
      .get(localUrl, {
        params,
      })
      .then((response) => {
        if (type === "dates") {
          setDates(response.data);
        }
        if (type === "time") {
          const timesArray = response.data?.map((time) => ({
            time: String(time.slice(11, 19)),
            active: true,
            shortTime: String(time.slice(11, 16)),
          }));
          setTimes(timesArray);
        }
        if (type === "info") {
          setRestaurantInfo((prev) => ({
            ...prev,
            ...response.data,
            country: response.data.country.name,
          }));
        }
      })
      .catch((error) => {
        console.log(`${type} error: `, error);
      });
  };

  // Make order request

  const [isTakeAway, setIsTakeAway] = useState(0);
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [timeline, setTimeline] = useState("");
  const [orderResponse, setOrderResponse] = useState();

  const makeOrder = () => {
    myAxios
      .post(
        "/api/make_order",
        {
          place_id: getAddress(),
          area_id: 1,
          seats: guestValue,
          reservation_time: `${selectedDay.year}-${normalizeNumber(
            selectedDay.month
          )}-${normalizeNumber(selectedDay.day)} ${selectedTime}`,
          comment: "",
          is_take_away: isTakeAway,
          status: defaultModal === "submit" ? "waiting" : "",
          length: timeline,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setOrderResponse(response.data);
        console.log("Order Response: ", response);
        setUserData((prev) => ({ ...prev, bookingid: response.data.id }));
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    getDatesTimeInfo(`/api/places/${getAddress()}`, 0, "info");
    getDatesTimeInfo("", utils().getToday(), "dates");
  }, []);

  // Cancel order
  const [filteredOrder, setFilteredOrder] = useState();
  const [ordersError, setOrdersError] = useState(true);
  const [ordersErrorString, setOrdersErrorString] = useState();

  console.log("Orders Error: ", ordersError);

  const cancelOrder = () => {
    myAxios.delete(`/api/cancel_order/${userData?.bookingid || ""}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  const getOrders = () => {
    myAxios
      .get("/api/customers/orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const filteredArray = response.data.filter((order) => {
          return order.id === Number(userData?.bookingid);
        });
        setOrdersError(filteredArray.length);
        if (filteredArray.length > 0) {
          setDefaultModal("confirmation");
        } else {
          setOrdersErrorString("Not found");
        }
        setFilteredOrder(filteredArray);
      })
      .catch((error) => {
        setOrdersErrorString(error.response.data.message);
        setOrdersError(false);
      });
  };

  // Getting extra time
  const [extraTimeReq, setExtraTimeReq] = useState();
  const [extraTime, setExtraTime] = useState({});

  const getExtraTime = () => {
    myAxios
      .get("/api/custom_booking_lengths", {
        params: {
          place_id: getAddress(),
          area_id: 1,
          seats: guestValue,
          reservation_date: `${selectedDay.year}-${normalizeNumber(
            selectedDay.month
          )}-${normalizeNumber(selectedDay.day)}`,
          language: "en",
        },
      })
      .then((response) => {
        setExtraTimeReq(response.data);
      })
      .catch((error) => {
        console.log("Extra time errror: ", error);
      });
  };

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
            getAddress={getAddress}
            blockType={blockType}
            setBlockType={setBlockType}
            defaultModal={defaultModal}
            setDefaultModal={setDefaultModal}
            modalActive={modalActive}
            setModalActive={setModalActive}
            postRequest={postRequest}
            userData={userData}
            setUserData={setUserData}
            handlePrevItem={handlePrevItem}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            handleDayChange={handleDayChange}
            errorsResp={errorsResp}
            datesArray={datesArray}
            getTime={getTime}
            times={times}
            setTimes={setTimes}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            getDatesTimeInfo={getDatesTimeInfo}
            restaurantInfo={restaurantInfo}
            getUserInfoReq={getUserInfoReq}
            makeOrder={makeOrder}
            timeline={timeline}
            setTimeline={setTimeline}
            cancelOrder={cancelOrder}
            getOrders={getOrders}
            ordersError={ordersError}
            ordersErrorString={ordersErrorString}
            filteredOrder={filteredOrder}
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
            times={times}
            setTimes={setTimes}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            getDatesTimeInfo={getDatesTimeInfo}
            restaurantInfo={restaurantInfo}
            getUserInfoReq={getUserInfoReq}
            modalActive={modalActive}
            setModalActive={setModalActive}
            makeOrder={makeOrder}
            blockType={blockType}
            setBlockType={setBlockType}
            timeline={timeline}
            setTimeline={setTimeline}
            setExtraTime={setExtraTime}
            extraTime={extraTime}
            extraTimeReq={extraTimeReq}
            getExtraTime={getExtraTime}
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
            blockType={blockType}
            setBlockType={setBlockType}
            orderResponse={orderResponse}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default App;
