import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ForecastActions } from "../../store/ducks/forecast";

import Menu from "../../components/Menu";
import Tabela from "../../components/Tabela";
import Grafico from "../../components/Grafico";

class Main extends Component {
  state = { latitude: "", longitude: "" };

  render() {
    return (
      <Fragment>
        <Menu />
        {this.props.forecast.data.length !== 0 && (
          <div>
            <Tabela />
            <Grafico />
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  forecast: state.forecast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ForecastActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
