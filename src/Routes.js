import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../src/pages/Home';
import Main from '../src/pages/Main';

function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/main" component={Main} />
    </Router>
  );
}

export default Routes;
