import React, { Component } from "react";

// Importação de libs
import PropTypes from "prop-types";
import axios from "axios";
import {
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

// Importação de Utilitários
import Color from "./utils/Color";

// Importação Styles
import styles from "./AppStyles";

// Importação Componentes
import Bars from "./components/Bars";

// Importação Material UI
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";

class App extends Component {
  state = {
    loading: false,
    loaded: false,
    data: [],
    lat: "",
    long: "",
    error: false,
    codgError: "",
    validation: false,
    codgValidation: "",
    dadosGrafico: []
  };

  handler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(state => ({ ...state, [name]: value }));
  };

  atualizaData = i => {
    var dataAtual = new Date(i);
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1;
    var ano = dataAtual.getFullYear();

    return dia + "/" + mes + "/" + ano;
  };

  temperatura = i => {
    const str = i.toString();
    return str.substr(0, 4);
  };

  geraGrafico = data => {
    let dadosGrafico = [];
    for (let i = 0; i < data.days.length; i++) {
      dadosGrafico.push({
        name: this.atualizaData(data.days[i]),
        tmax: this.temperatura(data.points.forecast.temperature_daily_max[i]),
        tmin: this.temperatura(data.points.forecast.temperature_daily_min[i]),
        hum: this.temperatura(data.points.forecast.rel_humidity_daily_avg[i])
      });
    }
    console.log(dadosGrafico);
    this.setState({ dadosGrafico });
  };

  getForecast = () => {
    this.setState({
      loading: true,
      loaded: false,
      validation: false,
      codgValidation: ""
    });
    const { lat, long } = this.state;
    if (lat === "" || long === "") {
      this.setState({
        loading: false,
        validation: true,
        codgValidation: "Algum campo está vazio."
      });
      return;
    }

    let componenteCorrente = this;

    let url =
      "https://nimbus.somar.io/forecast/10days?latitude=" +
      lat +
      "&longitude=" +
      long +
      "&reference=Somar";
    axios
      .get(url, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY
        }
      })
      .then(function(response) {
        componenteCorrente.setState({ data: response.data, loaded: true });
        componenteCorrente.geraGrafico(response.data);
      })
      .catch(function(error) {
        componenteCorrente.setState({ error: true, codgError: error });
      })
      .then(function() {
        componenteCorrente.setState({ loading: false });
      });
  };
  render() {
    const {
      loading,
      loaded,
      data,
      lat,
      long,
      error,
      codgError,
      validation,
      codgValidation,
      dadosGrafico
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Grid container className={classes.gridTitle}>
          <Typography variant="h6">Previsão do tempo</Typography>
        </Grid>
        <Grid container spacing={16}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={16}
            alignItems="center"
          >
            <Grid item>
              <TextField
                required
                name="lat"
                label="Latitude"
                margin="normal"
                variant="outlined"
                value={lat}
                onChange={this.handler}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                name="long"
                label="Longitude"
                margin="normal"
                variant="outlined"
                value={long}
                onChange={this.handler}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={this.getForecast}
                variant="contained"
                color="primary"
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <div>
          {loading ? <Typography variant="h6">Carregando...</Typography> : ""}
        </div>
        <div>
          {validation ? (
            <Typography variant="h6">{codgValidation}</Typography>
          ) : (
            ""
          )}
        </div>
        <div>
          {error ? (
            <Typography variant="h6">
              Erro ao buscar os dados: {codgError}
            </Typography>
          ) : (
            ""
          )}
        </div>
        {loaded ? (
          <div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  {data.days.map((i, key) => (
                    <TableCell key={key}>{this.atualizaData(i)}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Temp. Máx
                  </TableCell>
                  {data.points.forecast.temperature_daily_max.map((i, key) => (
                    <TableCell
                      key={key}
                      component="th"
                      scope="row"
                      style={{ color: Color.red }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <ArrowUp />
                        {this.temperatura(i) +
                          " º" +
                          data.meta.units.temperature}
                      </Grid>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Temp. Min
                  </TableCell>
                  {data.points.forecast.temperature_daily_min.map((i, key) => (
                    <TableCell
                      key={key}
                      component="th"
                      scope="row"
                      style={{ color: Color.blue }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <ArrowDown />
                        {this.temperatura(i) +
                          " º" +
                          data.meta.units.temperature}
                      </Grid>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Umidade
                  </TableCell>
                  {data.points.forecast.rel_humidity_daily_avg.map((i, key) => (
                    <TableCell key={key} component="th" scope="row">
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Bars temp={i} />
                        {this.temperatura(i) + data.meta.units.humidity}
                      </Grid>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
            <div className={classes.gridGrafico}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <ComposedChart
                  width={1200}
                  height={500}
                  data={dadosGrafico}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="hum"
                    name="Umidade"
                    barSize={40}
                    fill={Color.blueDetails}
                  />
                  <Line
                    type="monotone"
                    name="Temperatura Máxima"
                    dataKey="tmax"
                    stroke={Color.red}
                  />
                  <Line
                    type="monotone"
                    name="Temperatura Mínima"
                    dataKey="tmin"
                    stroke={Color.blue}
                  />
                </ComposedChart>
              </Grid>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
