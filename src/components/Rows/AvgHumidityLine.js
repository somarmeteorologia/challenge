import React from 'react';
import { Row, RowCell, BarHumidity } from './style'

const AvgHumidityLine = ({
    avgHumidity= []
}) => {

    return(
        <Row>
            {avgHumidity.map((humidity, id)=> {
                return <React.Fragment key={id}>
                        <RowCell>
                        <BarHumidity colorful={Math.trunc(humidity)>=20}/>
                        <BarHumidity colorful={Math.trunc(humidity)>=40}/>
                        <BarHumidity colorful={Math.trunc(humidity)>=60}/>
                        <BarHumidity colorful={Math.trunc(humidity)>=80}/>
                        <BarHumidity colorful={Math.trunc(humidity)>=100}/>
                        {Math.trunc(humidity)}%
                        </RowCell>    
                </React.Fragment>
            })}
        </Row>
    )
}

export default AvgHumidityLine;