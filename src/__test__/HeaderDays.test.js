import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup, getByTestId } from "@testing-library/react";
import HeaderDays from '../components/HeaderDays/HeaderDays';

afterEach(cleanup);

test('renders HeaderDays without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderDays />, div);
  ReactDOM.unmountComponentAtNode(div);
});
