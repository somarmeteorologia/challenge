import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// routes
import Home from "./page/Home";
import Week from "./page/Week";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={props => <Home {...props} />} />
        <Route exact path="/week" component={props => <Week {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}
