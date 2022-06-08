import axios from "axios";

const myAxios = axios.create({
  baseURL: "https://dinner-book.vasilkoff.info",
  responseType: "json",
});

export default myAxios;
