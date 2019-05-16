import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: #333;
`;

const Title = styled.h1`
  font-size: 3em;
  letter-spacing: 5px;
  font-weight: 300;
  color: #fff;
  :hover {
    color: white;
    letter-spacing: 7px;
  }
`;

const Button = styled.button`
  width: 130px;
  height: 50px;
  background: transparent;
  border-radius: 6px;
  border: 2px solid palevioletred;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-top: 15px;
  cursor: pointer;
  :hover {
    border-color: white;
  }
`

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
  }
  render() {
    return (
      <Root>
        <Title>Minha Semana</Title>
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
