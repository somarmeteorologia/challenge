import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

// Importação do gráfico
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

// Importação Styles
import styles from "./Styles";

// Importação de Utilitários
import Color from "../../utils/Color";

// Importação Material UI
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

class Grafico extends Component {
  state = {
    dadosGrafico: []
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

  componentDidMount() {
    this.props.forecast.data.map((data, key) => {
      let dadosGrafico = [];
      for (let i = 0; i < data.days.length; i++) {
        dadosGrafico.push({
          name: this.atualizaData(data.days[i]),
          tmax: this.temperatura(data.points.forecast.temperature_daily_max[i]),
          tmin: this.temperatura(data.points.forecast.temperature_daily_min[i]),
          hum: this.temperatura(data.points.forecast.rel_humidity_daily_avg[i])
        });
      }
      this.setState({ dadosGrafico });
      return dadosGrafico;
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.gridGrafico}>
        <Grid container direction="row" justify="center" alignItems="center">
          <ComposedChart
            width={1200}
            height={500}
            data={this.state.dadosGrafico}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
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
    );
  }
}

Grafico.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forecast: state.forecast
});

export default withStyles(styles)(connect(mapStateToProps)(Grafico));
