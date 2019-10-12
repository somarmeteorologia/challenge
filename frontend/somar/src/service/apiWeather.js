import axios from "axios";

const apiWeather = axios.create({
  baseURL: "https://fcc-weather-api.glitch.me/api"
});

export default apiWeather;
