import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="app-header blue shadow">
        <div className="navbar navbar-expand-lg flex-row align-items-center">
            <h4 className="mr-auto mr-lg-3 text-info font-weight-bold">
            Weather Forecast
            </h4>
        </div>
      </div>
    );
  }
}

export default Header;
