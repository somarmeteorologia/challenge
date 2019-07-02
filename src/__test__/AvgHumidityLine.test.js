import React from "react";
import { render, fireEvent, cleanup, getByTestId } from "@testing-library/react";
import AvgHumidityLine from "../components/Rows/AvgHumidityLine";
import ReactDOM from "react-dom";

afterEach(cleanup);

test("renders AvgHumidityLine without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AvgHumidityLine/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });