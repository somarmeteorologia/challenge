import { all, takeLatest } from "redux-saga/effects";
import { Types as ForecastTypes } from "../ducks/forecast";
import { getForecast } from "./forecast";

export default function* rootSaga() {
  yield all([takeLatest(ForecastTypes.ADD_REQUEST, getForecast)]);
}
