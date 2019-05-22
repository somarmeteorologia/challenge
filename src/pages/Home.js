import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import moment from 'moment';
import { Root, Title, Button, Subtitle } from '../styles';

class Home extends React.Component {
  state = {
    latitude: '',
    longitude: '',
  }
  async componentDidMount () {
    await navigator.geolocation.getCurrentPosition( location => {
      console.log(location);
      this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude});
    });
    console.clear()

    moment.defineLocale('pt-br', {
      weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_')
    });

    console.log(moment('20-05-2019', 'DD-MM-YYYY').format('dddd'));
    console.log(moment().format());
  }
  render() {
    return (
      <Root>
        <img src={require('../assets/images/cloud-159394_960_720.png')} alt="image logo"  className="logo-image"/>
        <Title>Minha Semana</Title>
        <Subtitle>Previsões meteorologicas de acordo com sua localidade</Subtitle>
        <Button>
          <Link style={{color: '#FFF', textDecoration: 'none'}} 
            to={{
              pathname: '/main',
              state: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                logged: true
            }}}>
            Avançar
          </Link>
        </Button>
      </Root>
    );
  }
}

export default Home;
