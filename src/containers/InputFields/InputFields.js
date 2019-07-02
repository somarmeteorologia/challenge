import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GruopInput, Input, Button } from './style'

const InputFields = ({
    onChangeLongitude = ()=> {},
    longitude = '',
    onChangeLatitude = () => {},
    latitude = '', 
    getWeatherInfo = () => {}
}) => {
    return (
        <div>
            <GruopInput>
                <label>Longitude: </label> <Input type="number" data-testid='longitude-input' onChange={onChangeLongitude} value={longitude}></Input>
            </GruopInput>
            <GruopInput>
                <label>Latidude: </label> <Input type="number" data-testid='latitude-input' onChange={onChangeLatitude} value={latitude}></Input>
            </GruopInput>
            <Button data-testid='btn-weather' onClick={getWeatherInfo}><FontAwesomeIcon icon='cloud-sun-rain' /> Previsão do Tempo</Button>
        </div>
    )
}

export default InputFields;