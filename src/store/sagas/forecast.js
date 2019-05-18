import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as ForecastActions } from "../ducks/forecast";

export function* getForecast(action) {
  try {
    const { data } = yield call(
      api.get,
      `10days?latitude=${action.payload.lat}&longitude=${
        action.payload.long
      }&reference=SOMAR`
    );

    yield put(ForecastActions.getForecastSuccess(data));
  } catch (err) {
    yield put(ForecastActions.getForecastFailure("Erro ao buscar a previsão."));
  }
}
