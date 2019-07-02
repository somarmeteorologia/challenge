import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCaretUp, faCaretDown, faCloudSunRain } from '@fortawesome/free-solid-svg-icons'
import TableWeather from '../../containers/TableWeather/TableWeather'
import ChartWeather from '../../containers/ChartWeather/ChartWeather'
import { getWeekWeather } from '../../services/weather'
import InputFields from '../../containers/InputFields/InputFields'

library.add(fab, faCaretUp, faCaretDown, faCloudSunRain)

const buildDataChart = (days, maxTempereature, minTemperature, avgHumidity) => {
  let data = [];
  for (let index = 0; index < days.length; index++) {
    data = [...data, {
      day: days[index],
      maxTempereature: maxTempereature[index],
      minTemperature: minTemperature[index],
      avgHumidity: (avgHumidity[index] / 10)
    }]
  }
  return data;
}

const calculateAvgHumity = (minHumidity, maxHumidity) => {
  let avgHumidity = new Array(minHumidity.length)
  for (let index = 0; index < minHumidity.length; index++) {
    avgHumidity[index] = ((minHumidity[index] + maxHumidity[index]) / 2)
  }
  return avgHumidity
}

class App extends Component {

  state = {
    dataWeather: null,
    longitude: '',
    latitude: ''
  }


  onChangeLongitude = (event) => {
    const longitude = event.target.value
    this.setState({longitude})
  }

  onChangeLatitude = (event) => {
    const latitude = event.target.value
     this.setState({latitude})
  }

  getWeatherInfo = () => {
    const {longitude, latitude} = this.state  
    if ((Number.isFinite(Number.parseFloat(longitude))) && (Number.isFinite(Number.parseFloat(latitude)))) {
      getWeekWeather({ longitude, latitude }).then(dataWeather => this.setState({dataWeather})).catch(
        err => {
          alert('Ocorreu um erro inesperado por favor tente de novo')
          console.error(err)
        }
      )
    }
    else {
      alert('Informe a latitude e a longitude do lugar desejado!')
    }
  }

  render() {
    const {dataWeather, longitude, latitude} = this.state
    if (dataWeather) {
      const { periods } = dataWeather
      const { max_temperature, min_temperature, max_rel_humidity, min_rel_humidity } = dataWeather.points.observed
      const avgHumidity = calculateAvgHumity(min_rel_humidity, max_rel_humidity)
      const dataChart = buildDataChart(periods, max_temperature, min_temperature, avgHumidity);
      return (
        <div className="App">
          <InputFields onChangeLongitude={this.onChangeLongitude} onChangeLatitude={this.onChangeLatitude} longitude={longitude} latitude={latitude} getWeatherInfo={this.getWeatherInfo} />
          <TableWeather days={periods} maxTempereature={max_temperature} minTemperature={min_temperature} avgHumidity={avgHumidity} />
          <ChartWeather dataChart={dataChart} />
        </div>
      )
    }

    return (
      <div className="App">
        <InputFields onChangeLongitude={this.onChangeLongitude} onChangeLatitude={this.onChangeLatitude} longitude={longitude} latitude={latitude} getWeatherInfo={this.getWeatherInfo} />
      </div>
    )
  }
}

export default App;
