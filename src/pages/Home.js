import React from 'react';
import { Link } from "react-router-dom";
import { Root, Title, Button, Subtitle } from '../styles';

const Home = () => {
  return (
    <Root className='root-div'>
      <img src={require('../assets/images/cloud-159394_960_720.png')} alt="logo da home"  className="logo-image"/>
      <Title>Minha Semana</Title>
      <Subtitle>Previsões meteorológicas de acordo com sua localidade</Subtitle>
      <Button>
        <Link style={{color: '#777', textDecoration: 'none'}} 
          to={{
            pathname: '/main',
            state: {
              logged: true
          }}}>
          Avançar
        </Link>
      </Button>
    </Root>
  );
}

export default Home;
