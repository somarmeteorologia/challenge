import axios from "axios";

const API = () => {

  const axiosConf = {
    baseURL: "https://nimbus.somar.io/forecast",
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY
    }
  };

  const axiosInstance = axios.create(axiosConf);

  axiosInstance.interceptors.response.use(
    response => response
  );

  return axiosInstance;
};

export default API;
