import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup, getByTestId } from "@testing-library/react";
import TemperatureLine from '../components/Rows/TemperatureLine';

afterEach(cleanup);

test('renders TemperatureLine without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TemperatureLine />, div);
  ReactDOM.unmountComponentAtNode(div);
});
