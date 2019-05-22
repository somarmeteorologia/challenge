import React from 'react';
import axios from 'axios';

import { Redirect, Link } from 'react-router-dom';

import Loading from '../components/Loading';
import Graphic from '../components/Graphic';

import { RootMain, Table, RowDate, RowTmax, RowTmin, RowHum, Tbody, Th, ThTop, Td, ContainerGraphic } from '../styles';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: ".env"});
}

class Main extends React.Component {
  constructor(props) {
    super();

    this.state= {
      latitude: '',
      longitude: '',
      data: [],
      loaded: false,
      graphic: []
    }
  }

  async componentDidMount() {

    await navigator.geolocation.getCurrentPosition( location => {
      const lat = location.coords.latitude.toString();
      const lng = location.coords.longitude.toString();

      this.setState({ latitude: lat, longitude: lng });
    });


    const url1 = `https://nimbus.somar.io/forecast/10days?latitude="${this.state.latitude}"&longitude="${this.state.longitude}"&reference=Somar"`;
    const url = "https://nimbus.somar.io/forecast/10days?latitude=" + -23.55052 + "&longitude=" + -46.633308 + "&reference=Somar";

    if(url === url1) {
      alert('iguais');
    }
    else{
      alert('diferentes');
    }
    console.log(process.env);

    if( this.state.latitude !== undefined ){
      await axios.get(url, {
        headers: { 
          "x-api-key": process.env.REACT_APP_API_TOKEN,
        }})
        .then(resp => {
          // handle success
          console.log(resp);
          console.log(resp.status)
          console.log(resp.data);
          this.setState({ data: resp.data , loaded: true });
          console.log(this.state.data)
          this.geraGrafico(resp.data);
        })
        .catch(function (error) {
          // handle error
          console.log('Error!!')
          console.log(error);
        })
      }else{
        alert('Latitude e longitude não autorizadas pelo browser ou invalidas'); 
      }
    }


    formatTemp = temp => {
      const n_temp = temp.toString();
      return n_temp.substr(0, 2);
    };


    formatData = i => {
      const data = new Date(i);
      const day = data.getDate();
      const month = data.getMonth() + 1;
      const year = data.getFullYear();
  
      return day + "/" + month + "/" + year;
    };


    geraGrafico = async data => {
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
          hum: this.formatTemp(data.points.forecast.rel_humidity_daily_avg[i]) 
        });
      }
      console.log(graphic);
      this.setState({ graphic });
    };
  
  render() {

    if(this.props.logged === false) return <Redirect to="/" />

    return (
      <RootMain>
        {this.state.loaded === true ? 
          <>
          <Table>
            <RowDate>
              <ThTop>
                {this.state.graphic.map((item,id) => {
                  return <Th style={{color: '#333'}} key={id}><br/>{item.name}</Th>
                })}
              </ThTop>
            </RowDate>
            <Tbody>
              <RowTmax>
                <Th>
                  {this.state.graphic.map((item,id) => {
                    return <Td style={{color: '#E86C60'}} key={id}><i style={{marginRight: 10}} class="fas fa-caret-up"></i>{item.tmax}°C</Td>
                  })}
                </Th>
              </RowTmax>
              <RowTmin>
                <Th>
                  {this.state.graphic.map((item,id) => {
                    return <Td style={{color: '#59EBFF'}} key={id}><i style={{marginRight: 10}} class="fas fa-caret-down"></i>{item.tmin}°C</Td>
                  })}
                </Th>
              </RowTmin>
              <RowHum>
                <Th>
                  {this.state.graphic.map((item,id) => {
                    return <Td style={{color: '#525252'}} key={id}>{item.hum}%</Td>
                  })}
                </Th>
              </RowHum>
            </Tbody>
          </Table>
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
