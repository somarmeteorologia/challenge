import axios from "axios";

const apiIbge = axios.create({
  baseURL: "http://servicodados.ibge.gov.br/api/v1"
});

export default apiIbge;
