import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Header from "./layouts/Footer";
import Footer from "./layouts/Header";
import ForecastList from "./pages/ForecastPage/ForecastList"

library.add(fas);

const App = () => (

  <div id="content" className="app-content box-shadow-z0" role="main">
  <Header />
  <Footer />
  <div
   id="view"
   className="app-body"
   >
    <ForecastList />
  </div>
</div>
);

export default App;
