import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

// Importação Styles
import styles from "./Styles";

// Importação de Utilitários
import Color from "../../utils/Color";

// Importação Componentes
import Bars from "../Barras";

// Importação Material UI
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class Tabela extends Component {
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

  render() {
    const { classes, forecast } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid
          container
          className={classes.demo}
          justify="center"
          spacing={16}
          alignItems="center"
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                {forecast.data.map((data, key) =>
                  data.days.map((day, key) => (
                    <TableCell key={key}>{this.atualizaData(day)}</TableCell>
                  ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Temp. Máx
                </TableCell>
                {forecast.data.map((data, key) =>
                  data.points.forecast.temperature_daily_max.map((day, key) => (
                    <TableCell key={key} style={{ color: Color.red }}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <ArrowUp />
                        {this.temperatura(day)} º{data.meta.units.temperature}
                      </Grid>
                    </TableCell>
                  ))
                )}
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Temp. Min
                </TableCell>
                {forecast.data.map((data, key) =>
                  data.points.forecast.temperature_daily_min.map((day, key) => (
                    <TableCell key={key} style={{ color: Color.blue }}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <ArrowDown />
                        {this.temperatura(day)} º{data.meta.units.temperature}
                      </Grid>
                    </TableCell>
                  ))
                )}
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Umidade
                </TableCell>
                {forecast.data.map((data, key) =>
                  data.points.forecast.rel_humidity_daily_avg.map((i, key) => (
                    <TableCell key={key} style={{ color: Color.blue }}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Bars temp={i} />
                        {this.temperatura(i)} {data.meta.units.humidity}
                      </Grid>
                    </TableCell>
                  ))
                )}
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

Tabela.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forecast: state.forecast
});

export default withStyles(styles)(connect(mapStateToProps)(Tabela));
