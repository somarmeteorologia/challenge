import React, { Component } from 'react';
import { TableStyled, ThTop, RowDate, RowTmax, RowTmin, RowHum, ThHum, Tbody, Td, Th } from '../styles';

export default class Table extends Component {
  constructor(props) {
    super();
    this.state = {
      graphic: this.props.graphic
    }
  }

  componentDidMount(props) {
    console.log(props);
  }
  render() {
    return(
      <TableStyled>
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
              {this.state.graphic.slice(0,7).map((item,id) => {
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
      </TableStyled>
    );
  }
}