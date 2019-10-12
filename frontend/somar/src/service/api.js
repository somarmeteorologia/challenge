import axios from "axios";

// variavel de ambiente no .env
// contem a chave de acesso da api
const token = process.env.REACT_APP_TOKEN;

// salva o token no localstorage
localStorage.setItem("token", token);

const api = axios.create({
  baseURL: "https://nimbus.somar.io",
  headers: {
    "x-api-key": token
  }
});

export default api;
