import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// routes
import Home from "./page/Home";
import Charts from "./page/Charts";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={props => <Home {...props} />} />
        <Route exact path="/week" component={props => <Charts {...props} />} />
        {/* <Route
          exact
          path="/dashboard"
          component={props => <Dashboard {...props} />}
        /> */}
      </Switch>
    </BrowserRouter>
  );
}
