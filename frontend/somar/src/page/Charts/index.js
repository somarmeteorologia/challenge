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
  List,
  ContentLoading,
  ListDays
} from "./styles";
import api from "../../service/api";
import Example from "../../components/ChartTemp";
import Loading from "../../components/Loading";

function Charts({ history }) {
  console.log("", history);
  const [latitude, getLatitude] = useState();
  const [longitude, getLongitude] = useState();
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

  function renderWeekList() {
    const weeks = temps.map(item =>
      item.days.map(day => (
        <ListDays key={day}>
          <Days>{moment(day).format("dddd")}</Days>
          <span>{moment(day).format("LL")}</span>
        </ListDays>
      ))
    );
    return weeks;
  }

  function renderTempMax() {
    const temp = temps.map(item =>
      item.max.map(max => (
        <List key={max}>
          <Text max="true">
            <i className="fas fa-caret-up" />
            {parseInt(max)}ºC
          </Text>
        </List>
      ))
    );
    return temp;
  }

  function renderTempMin() {
    const temp = temps.map(item =>
      item.min.map(min => (
        <List key={min}>
          <Text min="true" key={min}>
            <i className="fas fa-caret-down" />
            {parseInt(min)}ºC
          </Text>
        </List>
      ))
    );

    return temp;
  }

  function formatNumber(temp) {
    temp.toFixed();
  }

  function createObjData(data) {
    // @params data - response da api

    // cria um novo obj
    const objData = {
      max: data.points.forecast.temperature_daily_max,
      min: data.points.forecast.temperature_daily_min,
      humidity: data.points.forecast.rel_humidity_daily_avg,
      days: data.days
    };

    console.log(data);
    // console.log(formatNumber());

    // data.forEach(item => {

    // });

    // getTemps([objData]);
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

          draft.push({
            id: i,
            max,
            min,
            humidity,
            days: item.days
          });
        });
      })
    );
  }

  console.log(temps);

  return (
    <Container>
      <ContentList>
        <HeaderList>{!loading && renderWeekList()}</HeaderList>
        <TempList>
          <Temp>{!loading && renderTempMax()}</Temp>
          <Temp>{!loading && renderTempMin()}</Temp>
        </TempList>
      </ContentList>

      {loading && (
        <ContentLoading>
          <Loading show={loading} />
        </ContentLoading>
      )}

      <Example data={temps} />
    </Container>
  );
}

export default withRouter(Charts);
