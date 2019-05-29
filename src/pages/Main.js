import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';

import Loading from '../components/Loading';
import Graphic from '../components/Graphic';

import { RootMain, Table, RowDate, RowTmax, RowTmin, RowHum, Tbody, Th, ThHum, ThTop, Td, ContainerGraphic } from '../styles';
import '../index.css';

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

  formatTemp = temp => {
    const n_temp = temp.toString();
    return n_temp.substr(0, 2);
  };
  
  formatHum = hum => {
    const og = Math.pow(10, 0)
    return Math.floor(hum * og) / og;
  };

  formatData = i => {
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
    for (let i = 0; i < data.days.length - 2; i++) {
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
                  return <Th style={{color: '#333', height:'100%'}} key={id}><br/>{item.name.weekDay}<br />{ item.name.day } {item.name.month}</Th>
                })}
              </ThTop>
            </RowDate>
            <Tbody>
              <RowTmax>
                <Th>
                  {this.state.graphic.map((item,id) => {
                    return <Td style={{color: '#E86C60'}} key={id}><i className="icon-t-max" class="fas fa-caret-up"></i>{item.tmax}°C</Td>
                  })}
                </Th>
              </RowTmax>
              <RowTmin>
                <Th>
                  {this.state.graphic.map((item,id) => {
                    return <Td style={{color: '#39EBFF'}} key={id}><i className="icon-t-min" class="fas fa-caret-down"></i>{item.tmin}°C</Td>
                  })}
                </Th>
              </RowTmin>
              <RowHum>
                <ThHum>
                  {this.state.graphic.map((item,id) => {
                    return (
                      <Td>
                        {item.hum > 0 && item.hum <= 20 ? 
                          <>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3 }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px', marginRight: 3   }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px', marginRight: 5 }}></span>
                          </> 
                          : 
                          null
                        }
                        {item.hum > 20 && item.hum <= 40 ? 
                          <>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3 }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3   }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px', marginRight: 5 }}></span>
                          </> 
                          : 
                          null
                        }
                        {item.hum > 40 && item.hum <= 60 ? 
                          <>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3 }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3   }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px', marginRight: 5 }}></span>
                          </> 
                          : 
                          null
                        }
                        {item.hum > 60 && item.hum <= 80 ? 
                          <>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3 }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3   }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#C4C4C4', width: '3px', 'height': '13px', marginRight: 5 }}></span>
                          </> 
                          : 
                          null
                        }
                        {item.hum > 80 && item.hum <= 100 ? 
                          <>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3 }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 3   }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px',  marginRight: 3  }}></span>
                            <span className="item-hum-label" style={{ backgroundColor: '#3FA2F7', width: '3px', 'height': '13px', marginRight: 5 }}></span>
                          </> 
                          : 
                          null
                        }
                        <Td style={{width: '25%', color: '#323232', margin: '0px 0px 0px 0px'}} key={id}>{item.hum}%</Td>
                      </Td>
                      )
                  })}
                </ThHum>
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
