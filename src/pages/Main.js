import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Graphic from '../components/Graphic';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: ".env"});
}

const Root = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #FFF;
  margin: 0 auto;
  margin-top: 5%;
  padding: 10px;
`;

const Table = styled.table`
  width: 100%;
  min-height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const RowDate = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  background-color: #EAEAEA;
`;

const RowTmax = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #D4D4D4;
  margin: 0 auto;
`;

const RowTmin = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #D4D4D4;
  margin: 0 auto;
`;

const RowHum = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #D4D4D4;
  margin: 0 auto;
`;

const Tbody = styled.tbody`
  width: 100%;
  height: 75%;
`;

const Th = styled.th`
  width: 95%;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: Roboto;
`;

const ThTop = styled(Th)`
  width: 95%; 
  height: 100%;
  flex-direction: row;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
`;

const Td = styled.td`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
`;

const ContainerGraphic = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class Main extends React.Component {

  state = {
    latitude: '',
    longitude: '',
    data: [],
    loaded: false,
    graphic: []
  }

  async componentDidMount() {

    const latitude = this.props.location.state.latitude; 
    const longitude = this.props.location.state.longitude;
    console.log('latitude' + latitude);
    console.log('longitude' + longitude);
    const url = "https://nimbus.somar.io/forecast/10days?latitude="+latitude+"&longitude="+longitude +"&reference=Somar";

    console.log(process.env)

    await axios.get(url, {
      headers: { 
        "x-api-key": process.env.REACT_APP_APY_TOKEN
      }})
      .then(resp => {
        // handle success
        console.log(resp);
        console.log(resp.data);
        this.setState({ data: resp.data , loaded: true });
        console.log(this.state.data)
        //this.setState({graphic: resp.data, loaded: true});
        this.geraGrafico(resp.data);
      })
      .catch(function (error) {
        // handle error
        console.log('Error!!')
        console.log(error);
      })
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
      <Root>
        {this.state.loaded === true ? 
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
          : <h1 style={{color: 'white', justifySelf: 'center'}}>Loading</h1>
        }
        <ContainerGraphic>
          <Graphic data={this.state.graphic}/>
        </ContainerGraphic>
      </Root>
    );
  }
}


export default Main;
