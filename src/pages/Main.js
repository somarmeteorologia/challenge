import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';

import Loading from '../components/Loading';
import Graphic from '../components/Graphic';
import Table from '../components/Table';

import { RootMain, ContainerGraphic } from '../styles';
import '../index.css';

import { formatData, formatTemp, formatHum } from '../helpers/utils';
class Main extends React.Component {
  constructor(props) {
    super();
    this.state= {
      data: [],
      loaded: false,
      graphic: []
    }
  }

  async componentDidMount() {
    
    await navigator.geolocation.getCurrentPosition( location => {
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude; 
      
      const url = "https://nimbus.somar.io/forecast/10days?latitude=" + latitude + "&longitude=" + longitude + "&reference=Somar";

      axios.get(url, {
        headers: { 
          "x-api-key": process.env.REACT_APP_API_TOKEN,
        }})
        .then(resp => {
          // handle success
          this.setState({ data: resp.data , loaded: true });
          this.makeGraphic(resp.data);
        })
        .catch(function (error) {
          // handle error
          console.log('Error!!')
          console.log(error);
        })
      });
    
  }

  makeGraphic = async data => {
    let graphic = [];
    const temp = new Date();
    for (let i = 0; i < data.days.length - 3; i++) {
      if(formatData(data.days[i]) === temp.getDate()) {
        return graphic.push({
          day: formatData(data.days[i])
        });
      }
      graphic.push({
        name: formatData(data.days[i]),
        tmax: formatTemp(data.points.forecast.temperature_daily_max[i]),
        tmin: formatTemp(data.points.forecast.temperature_daily_min[i]),
        hum: formatHum(data.points.forecast.rel_humidity_daily_avg[i]) 
      });
    }
    await this.setState({ graphic });
  };
  
  render() {

    if(!!this.props.logged) return <Redirect to="/" />

    return (
      <RootMain>
        {this.state.loaded === true ? 
          <>
            <Table graphic={this.state.graphic}/>
            <ContainerGraphic>
              <Graphic data={this.state.graphic}/>
            </ContainerGraphic>
          </>
        : 
          <Loading loading={true}/>
      }
      </RootMain>
    );
  }
}


export default Main;
