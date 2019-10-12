import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import produce from "immer";
import "moment/locale/pt-br";
import moment from "moment";
import {
  Container,
  ContentList,
  HeaderList,
  Temp,
  TempList,
  Days,
  Text,
  ContentLoading,
  ListDays
} from "./styles";
import api from "../../service/api";
import Example from "../../components/ChartTemp";
import Loading from "../../components/Loading";
import List from "../../components/List";

function Charts({ history }) {
  const [latitude, getLatitude] = useState(history.location.state.coords.lat);
  const [longitude, getLongitude] = useState(history.location.state.coords.lon);
  const [city, getCity] = useState(history.location.city);
  const [loading, setLoading] = useState(true);
  const [temps, getTemps] = useState([]);

  async function getLocation() {
    await navigator.geolocation.getCurrentPosition(location => {
      return (
        getLongitude(location.coords.longitude),
        getLatitude(location.coords.latitude)
      );
    });
  }

  useEffect(() => {
    moment.locale("pt-br");

    async function LoadData() {
      if (latitude && longitude) {
        await api
          .get(
            `/forecast/7days?latitude=${latitude}&longitude=${longitude}&city=SaoPaulo-SP&reference=Somar`
          )
          .then(response => {
            createObjData(response.data);
          })
          .then(() => {
            console.log("estou aqui");
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }

    Promise.all([getLocation(), LoadData()]);
  }, []);

  function createObjData(data) {
    // @params data - response da api

    getTemps(
      produce(temps, draft => {
        console.log("temp", temps, "draft", draft);
        console.log(data);

        Array(data).forEach((item, i) => {
          const min = item.points.forecast.temperature_daily_min.map(item =>
            item.toFixed()
          );

          const max = item.points.forecast.temperature_daily_max.map(item =>
            item.toFixed()
          );

          const humidity = item.points.forecast.rel_humidity_daily_avg.map(
            item => item.toFixed()
          );

          item.days.forEach((item, i) => {
            draft.push({
              date: moment(item).format("L"),
              day: moment(item).format("dddd"),
              humidity: humidity[i],
              tempMax: max[i],
              tempMin: min[i]
            });
          });
        });
      })
    );
  }

  console.log(temps);

  if (loading) {
    return (
      <Container>
        <ContentLoading>
          <Loading show={loading} />
        </ContentLoading>
      </Container>
    );
  }

  return (
    <Container>
      <List temps={temps} />

      <Example data={temps} />
    </Container>
  );
}

export default withRouter(Charts);
