import React, { Component } from "react";
import PropTypes from "prop-types";

import Color from "../../utils/Color";

import styles from "./Styles";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

class Bars extends Component {
  state = {
    color1: Color.greyArrow,
    color2: Color.greyArrow,
    color3: Color.greyArrow,
    color4: Color.greyArrow,
    color5: Color.greyArrow
  };

  componentDidMount() {
    const { temp } = this.props;
    if (temp >= 20) {
      this.setState({ color1: Color.blueDetails });
    }
    if (temp >= 40) {
      this.setState({ color2: Color.blueDetails });
    }
    if (temp >= 60) {
      this.setState({ color3: Color.blueDetails });
    }
    if (temp >= 80) {
      this.setState({ color4: Color.blueDetails });
    }
    if (temp >= 100) {
      this.setState({ color5: Color.blueDetails });
    }
  }

  render() {
    const { classes } = this.props;
    const { color1, color2, color3, color4, color5 } = this.state;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <div className={classes.cell} style={{ background: color1 }} />
        <div className={classes.cell} style={{ background: color2 }} />
        <div className={classes.cell} style={{ background: color3 }} />
        <div className={classes.cell} style={{ background: color4 }} />
        <div className={classes.cell} style={{ background: color5 }} />
      </Grid>
    );
  }
}

Bars.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Bars);
