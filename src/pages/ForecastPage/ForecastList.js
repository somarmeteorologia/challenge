import React, { Component } from "react";
import { Container, Row, Col, Table, Progress, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "../../components/API/API";
import Pagination from "../../components/Pagination/Pagination";
import moment from "moment";
import Select from "react-select";
import get from "get-value";
import {
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class ForecastList extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.state = {
      pageOfItems: [],
      forecast: [],
      params: {
        latitude: null,
        longitude: null,
        reference:"Somar"
      },
      selectedDays: null,
      daysSelectOptions: [
        { value: '10', label: '10' },
        { value: '15', label: '15' },
        { value: '30', label: '30' },
        { value: '45', label: '45' },
      ],
      days: null,
      showSpinner: true
    };

    this.onChangePage = this.onChangePage.bind(this);

    /**
     * Callback function to when user selects some value on Days.
     * Saves days to this component state.
     * @param {Object} selectedDays
     */
    this.handleChangeOnDays = selectedDays => {
      this.setState({ showSpinner: true });
      this.setState({ selectedDays });
        this.setState({
            days: get(selectedDays, "value", null)
        }, () => {
          this.fetchForecast();
        });
    };

    this.formatNumber = temp => {
      return temp.toFixed();
    }

    this.formatDate = date => {
      return moment(date).format("L")
    }

    this.fetchForecast = () => {
      const { params, days } = this.state
      if(days && params.latitude) {
        const endpoint = `/${days}days`;
        this.API.get(endpoint, { params }).then(response => {
         this.setState({
           forecast: this.formatForecast(response.data),
           showSpinner: false
          })
        });
      }
    }

    this.formatForecast = (forecast) => {
      const { days } = this.state
      const forecastFormmated = [];
      let forecastDays = null;
      let humidity_daily_avg = null
      let temperature_daily_max = null;
      let temperature_daily_min = null;

      if( days !== "30" && days !== "45"){
        forecastDays = forecast.days.map(item => item);
        humidity_daily_avg = forecast.points.forecast.rel_humidity_daily_avg.map(item => item);
        temperature_daily_max = forecast.points.forecast.temperature_daily_max.map(item => item);
        temperature_daily_min = forecast.points.forecast.temperature_daily_min.map(item => item);
      } else {
        forecastDays = forecast.periods.map(item => item);
        humidity_daily_avg = forecast.points.forecast.rel_humidity.map(item => item);
        temperature_daily_max = forecast.points.forecast.max_temperature.map(item => item);
        temperature_daily_min = forecast.points.forecast.min_temperature.map(item => item);
      }
     

      forecastDays.forEach((item, index) => {
        forecastFormmated.push({
          id: index,
          day: this.formatDate(item),
          humidity: this.formatNumber(humidity_daily_avg[index]),
          tempMax: this.formatNumber(temperature_daily_max[index]),
          tempMin: this.formatNumber(temperature_daily_min[index]),
        })
      })

      return forecastFormmated;
    }
  } 
  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition( location => {
      this.setState(prevState => ({
        params: {
          ...prevState.params,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        showSpinner: false
      }));
    });
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
}
  render() {
    const { selectedDays, daysSelectOptions, forecast, days, showSpinner } = this.state;
    if(showSpinner) {
      return (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
       
      )
    }
    return (
      <Container fluid className="container-limited">
        <Row>
          <Col md={8}>
            <h3 className="text-secondary font-weight-bold mt-4">
             Weather Forecast for current location
            </h3>
            <h4 className="text-secondary font-weight-light mb-3">
            Choose how many days:
            </h4>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Select
              name="form-field-name"
              value={selectedDays}
              onChange={this.handleChangeOnDays}
              options={daysSelectOptions}
              placeholder="Days"
              isClearable={false}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </Col>
        </Row>
        <div className="box mt-5">
          {days && 
          <div className="text-center">
             <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  {" "}
                  <span
                    className="table-header"
                    role="button"
                    tabIndex={-1}
                  >
                    Day
                  </span>
                </th>
                <th>
                  {" "}
                  <span
                    className="table-header"
                    role="button"
                    tabIndex={-1}
                  >
                    Temp Max
                  </span>
                </th>
                <th>
                  <span
                    className="table-header"
                    role="button"
                    tabIndex={-1}
                  >
                   Temp Min
                  </span>
                </th>
                <th>
                  <span
                    className="table-header"
                    role="button"
                    tabIndex={-1}
                  >
                    Umidity
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.pageOfItems.map(item => (
                <tr key={item.id}>
                  <td className="align-middle">
                  <b>{moment(item.day).format("dddd")}</b>
                  <p>{moment(item.day).format("LL")}</p>
                  </td>
                  <td className="align-middle redFont">
                    <FontAwesomeIcon
                        icon={
                         "caret-up"
                        }
                        fixedWidth
                      />{item.tempMax} Cº
                  </td>
                  <td className="align-middle cyanFont">
                  <FontAwesomeIcon
                        icon={
                         "caret-down"
                        }
                        fixedWidth
                      />{item.tempMin} Cº
                  </td>
                  <td className="align-middle blueFont">
                    {item.humidity} %  <Progress value={item.humidity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination items={forecast} onChangePage={this.onChangePage} />
          </div>
          }
        </div>
        {days && 
        <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={forecast}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={"day"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="tempMax" stroke="#FF3232" />
            <Line dataKey="tempMin" stroke="#00CCCC" />
            <Bar dataKey="humidity" barSize={17} fill="#007bff" label={{ position: 'top' }}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
        }
      </Container>
    );
  }
}

export default ForecastList;
