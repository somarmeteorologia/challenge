import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup, getByTestId, waitForElement } from "@testing-library/react";
import App from '../components/App/App';
import axiosMock from 'axios'
import result from '../data/result.json'

afterEach(cleanup);

test('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('longitude and latitude empties', () => {
  const { container } = render(<App/>);
  const expectedArg = "Informe a latitude e a longitude do lugar desejado!";
  const btnWeather = getByTestId(container, "btn-weather");
  window.alert = jest.fn();
  fireEvent.click(btnWeather);
  expect(window.alert).toHaveBeenCalledWith(expectedArg);
});

test('longitude and latitude invalid values', async () => {
  const { getByText, getByTestId } = render(<App/>);
  const expectedArg = "Informe a latitude e a longitude do lugar desejado!";
  const longitudeInput = getByTestId("longitude-input");
  const latitudeInput = getByTestId( "latitude-input");
  fireEvent.change(longitudeInput, { target: { value: 'aaa' } })
  fireEvent.change(latitudeInput, { target: { value: 'bbb' } })
  expect(longitudeInput.value).toBe('')
  expect(latitudeInput.value).toBe('')
  const btnWeather = getByTestId("btn-weather");
  fireEvent.click(btnWeather);  
  expect(window.alert).toHaveBeenCalledWith(expectedArg);
});

test('longitude and latitude valid values', async () => {
  const { getByText, getByTestId } = render(<App/>);
  const infWeather = [result]
  const resp = {data : infWeather}
  axiosMock.get.mockResolvedValueOnce({
    data: result,
  })
  const longitudeInput = getByTestId("longitude-input");
  const latitudeInput = getByTestId( "latitude-input");
  fireEvent.change(longitudeInput, { target: { value: '-46' } })
  fireEvent.change(latitudeInput, { target: { value: '-23' } })
  
  const btnWeather = getByTestId("btn-weather");
  fireEvent.click(btnWeather);

  const weatherTable = await waitForElement(() =>
    // getByTestId throws an error if it cannot find an element
    getByTestId('weather-table')
  )

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(weatherTable).toBeDefined()
});
