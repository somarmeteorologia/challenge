import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { Creators as ForecastActions } from "../../store/ducks/forecast";
import { connect } from "react-redux";

// Importação Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Importação Styles
import styles from "./Styles";

class Menu extends Component {
  static propTypes = {
    getForecastRequest: PropTypes.func.isRequired,
    forecast: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string
    }).isRequired
  };
  state = { latitude: "", longitude: "" };

  handleGetFrecast = event => {
    event.preventDefault();
    this.props.getForecastRequest(this.state.latitude, this.state.longitude);
    this.setState({ latitude: "", longitude: "" });
  };

  render() {
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
                value={this.state.latitude}
                onChange={e => this.setState({ latitude: e.target.value })}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                name="long"
                label="Longitude"
                margin="normal"
                variant="outlined"
                value={this.state.longitude}
                onChange={e => this.setState({ longitude: e.target.value })}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={this.handleGetFrecast}
                variant="contained"
                color="primary"
              >
                Buscar
              </Button>
            </Grid>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={16}
              alignItems="center"
            >
              {this.props.forecast.loading && (
                <Typography variant="h6">Carregando...</Typography>
              )}
              {!!this.props.forecast.error && (
                <Typography variant="h6">
                  {this.props.forecast.error}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forecast: state.forecast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ForecastActions, dispatch);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
);
