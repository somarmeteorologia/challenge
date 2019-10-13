import React, { Component } from "react";
import apiIbge from "../../service/apiIbge";
import { withRouter } from "react-router-dom";
import {
  Container,
  Content,
  Label,
  Form,
  Title,
  ButtonSubmit,
  Background,
  ContentRight,
  InputSelect
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

    const searchCityParams = `${city.split(" ").join("")}-${state.sigla}`;

    const stateCoords = {
      lon: coords.longitude,
      lat: coords.latitude
    };

    history.push({
      pathname: "/week",
      state: { coords: stateCoords, city: searchCityParams }
    });
  }

  render() {
    const { states, buttonDisabled, loading, state, city, cities } = this.state;

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
            <Form onSubmit={this.handleSubmit}>
              <div className="d-flex flex-column">
                <Label htmlFor="state">Qual o seu estado?</Label>
                <InputSelect
                  name="select"
                  // value={state.name}
                  id="state"
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

              <div className="footer">
                <ButtonSubmit type="submit" disabled={buttonDisabled}>
                  <span>Buscar</span>
                </ButtonSubmit>
              </div>
            </Form>
          </ContentRight>
        </Content>
      </Container>
    );
  }
}

export default withRouter(Home);
