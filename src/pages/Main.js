import React from 'react';
import axios from 'axios';

import Loading from '../components/Loading';
import Graphic from '../components/Graphic';
import Table from '../components/Table';

import { RootMain, ContainerGraphic } from '../styles';
import '../index.css';

//import { formatData, formatTemp, formatHum } from '../helpers/utils';
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
          this.makeGraphic(resp.data);
        })
        .then(resp => {
          this.setState({ data: resp.data , loaded: true });
        })
        .catch(function (error) {
          // handle error
          console.log('Error!!')
          console.log(error);
        })
      });
    
  }
  formatTemp = (temp) => {
    const n_temp = temp.toString();
    return n_temp.substr(0, 2);
  };
  
  formatHum = (hum) => {
    const og = Math.pow(10, 0)
    return Math.floor(hum * og) / og;
  };
  
  formatData = (i) => {
    const week = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const monthF = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const data = new Date(i);
    const dayOfWeek = data.getDay();
    const day = data.getDate();
    const month = data.getMonth();
    const result = { 'weekDay': week[dayOfWeek], 'day': day, 'month': monthF[month] };
    return result;
  };
  

  makeGraphic = async data => {
    let graphic = [];
    const temp = new Date();
    for (let i = 0; i < data.days.length - 3; i++) {
      if(this.formatData(data.days[i]) === temp.getDate()) {
        return graphic.push({
          day: this.formatData(data.days[i])
        });
      }
      graphic.push({
        name: this.formatData(data.days[i]),
        tmax: this.formatTemp(data.points.forecast.temperature_daily_max[i]),
        tmin: this.formatTemp(data.points.forecast.temperature_daily_min[i]),
        hum: this.formatHum(data.points.forecast.rel_humidity_daily_avg[i]) 
      });
    }
    await this.setState({ graphic });
  };
  
  render() {

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
