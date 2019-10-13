import React, { Component } from "react";
import apiIbge from "../../service/apiIbge";
import { withRouter } from "react-router-dom";
import {
  Container,
  Label,
  Form,
  Title,
  ButtonSubmit,
  Background,
  ContentRight,
  InputSelect,
  Footer
} from "./styles";
import Loading from "../../components/Loading";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: [],
      states: [],
      cities: [],
      state: null,
      loading: true,
      buttonDisabled: true
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await Promise.all([this.getLocation(), this.getStates()]);
  }

  async getLocation() {
    // retorna as coords locations
    await navigator.geolocation.getCurrentPosition(location => {
      return this.setState({ coords: location.coords });
    });
  }

  async getStates() {
    // pega todos os estados pela api do IBGE
    // retorna os estados do brasil

    await apiIbge
      .get("/localidades/estados/")
      .then(response => {
        if (response.status === 200) {
          const states = response.data;
          this.setState({ states });
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  async getCities(state) {
    // @params state id
    // Recebe o state.id da request dos estados e faz uma nova request para pegar as cidades
    // retorna as cidades

    await apiIbge
      .get(`/localidades/estados/${state}/municipios`)
      .then(response => {
        if (response.status === 200) {
          const cities = response.data;
          this.setState({ cities });
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleSelectChange(e) {
    const state = JSON.parse(e.target.value);
    this.setState({ state });
    this.getCities(state.id);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { city, state, coords } = this.state;
    const { history } = this.props;

    this.setState({ buttonDisabled: false });

    const searchCityParams = `${city
      .split(" ")
      .join("")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")}-${state.sigla}`;

    const stateCoords = {
      lon: coords.longitude,
      lat: coords.latitude
    };

    history.push({
      pathname: "/week",
      state: { coords: stateCoords, city: searchCityParams, city_name: city }
    });
  }

  render() {
    const { states, buttonDisabled, loading, city, cities } = this.state;

    if (loading) {
      return (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh", backgroundColor: "#2c3e50" }}
        >
          <Loading show={loading} />
        </div>
      );
    }

    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#2c3e50" }}
      >
        <Container>
          <Background>
            <i className="fas fa-cloud-sun" />
          </Background>

          <ContentRight>
            <div className="content">
              <Title>APP Minha Semana</Title>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <div className="d-flex flex-column">
                <Label htmlFor="state">Qual o seu estado?</Label>
                <InputSelect
                  name="select"
                  id="state"
                  defaultValue=""
                  onChange={this.handleSelectChange}
                >
                  <option value="valor1" disabled>
                    Selecione o estado
                  </option>
                  {states &&
                    states.map(state => (
                      <option
                        key={state.id}
                        value={JSON.stringify(state)}
                        selected
                      >
                        {state.nome}
                      </option>
                    ))}
                </InputSelect>
              </div>

              <div className="d-flex flex-column">
                <Label htmlFor="city">Qual a sua cidade?</Label>
                <InputSelect
                  name="select"
                  id="city"
                  value={city}
                  defaultValue=""
                  onChange={e =>
                    this.setState({
                      city: e.target.value,
                      buttonDisabled: false
                    })
                  }
                >
                  <option value="disabled" disabled>
                    Selecione a cidade
                  </option>
                  {cities &&
                    cities.map(city => (
                      <option key={city.microregiao} value={city.name} selected>
                        {city.nome}
                      </option>
                    ))}
                </InputSelect>
              </div>

              <Footer>
                <ButtonSubmit type="submit" disabled={buttonDisabled}>
                  <span>Buscar</span>
                </ButtonSubmit>
              </Footer>
            </Form>
          </ContentRight>
          {/* <Content></Content> */}
        </Container>
      </div>
    );
  }
}

export default withRouter(Home);
