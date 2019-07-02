import React from 'react';
import { Row, RowCell } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MAX_TEMPERATURE} from './types';

const TemperaturLine = (
    {   
        type = 0,
        temperatures = []
    },
) => {
    return (
        <Row type={type}>
            {temperatures.map((temperature, id) => {
                return <RowCell key={id}>
                            <FontAwesomeIcon icon={type === MAX_TEMPERATURE ? 'caret-up' : 'caret-down'} /> {Math.trunc(temperature)} °C
                       </RowCell>
            })}
        </Row>
    )
}

export default TemperaturLine;