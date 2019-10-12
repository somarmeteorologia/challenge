import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Container,
  Content,
  Label,
  Input,
  Form,
  Title,
  ButtonSubmit,
  Background,
  ContentRight
} from "./styles";
import Loading from "../../components/Loading";

Home.propTypes = {
  history: PropTypes.object.isRequired
};

function Home({ history }) {
  const [coords, getCoords] = useState([]);
  const [city, getCity] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  async function getLocation() {
    await navigator.geolocation.getCurrentPosition(location => {
      return getCoords(location.coords), setLoading(false);
    });
  }

  useEffect(() => {
    getLocation();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const stateCoords = {
      lon: coords.longitude,
      lat: coords.latitude
    };

    history.push({
      pathname: "/week",
      state: { coords: stateCoords, city }
    });
  }

  if (loading) {
    return (
      <Container>
        <Loading show={loading} />
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Background>
          <i className="fas fa-cloud-sun" />
        </Background>
        <ContentRight>
          <div className="content">
            <Title>APP Minha Semana</Title>
          </div>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="city">Digite a sua cidade</Label>
            <Input
              type="text"
              id="city"
              value={city}
              placeholder="ex.: são paulo"
              onChange={e => {
                getCity(e.target.value);
                if (e.target.value.length > 2) {
                  setDisabled(false);
                }
              }}
            />
            <div className="footer">
              <ButtonSubmit type="submit" disabled={disabled}>
                <span>Buscar</span>
              </ButtonSubmit>
            </div>
          </Form>
        </ContentRight>
      </Content>
    </Container>
  );
}

export default withRouter(Home);
