import styled from 'styled-components';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: #FFF;
`;

const Title = styled.h1`
  font-size: 3.5em;
  letter-spacing: 5px;
  margin-bottom: 15px;
  font-family: Roboto;
  font-weight: 400;
  color: #ff440;
  :hover {
    letter-spacing: 3px;
  }
  @media screen and (max-width: 400px) {
    font-size: 30px;
  }
  @media screen and (min-width: 401px) and (max-width: 1200px){
    font-size: 40px;
  }
`;

const Button = styled.button`
  width: 130px;
  height: 50px;
  background: transparent;
  border-radius: 6px;
  border: 2px solid palevioletred;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-top: 15px;
  cursor: pointer;
  :hover {
    border-color: #990;
  }
`
const Subtitle = styled.small`
  color: #776;
  font-weight: 500;
  letter-spacing: 3px;
  margin: 15px;
  font-family: Roboto;
  @media screen and (max-width: 400px) {
    font-size: 15px;
    padding: 10px;
  }
  @media screen and (min-width: 800px){
    font-size: 16px;
  }
`;

const RootMain = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #FFF;
  margin: 0 auto;
  margin-top: 5%;
  padding: 10px;
  @media (max-width: 700px) {
    width: 90vw;
  }
`;

const TableStyled = styled.table`
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
  flex-direction: row;
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
  width: 100%;
  height: 100% !important;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: Roboto;
  @media (max-width: 700px) {
    width: 90%;
    margin: 0 auto;
    font-size: 10px;
  }
`;

const ThHum = styled(Th)`
  @media (max-width: 700px) {
    flex-direction: row;
  }
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
  @media (max-width: 700px) {
    width: 100%;
    margin: 0 auto;
    font-size: 10px;
  }
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
  @media (max-width: 700px) {
    font-size: 10px;
  }
`;

const ContainerGraphic = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    font-size: 10px;
    margin-left: -10%;
    width: 100vw;
    flex-direction: row;
  }
`;


export { Root, Title, Button, Subtitle, RootMain, TableStyled, RowDate, RowTmax, RowTmin, RowHum, Tbody, Th, ThHum, ThTop, Td, ContainerGraphic  };