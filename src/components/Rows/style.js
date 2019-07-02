import styled from "styled-components";
import {MAX_TEMPERATURE, MIN_TEMPERATURE, AVERAGE_HUMIDITY} from './types';

const Row = styled.div`
    display: table-row;
    color : ${props => {
        switch (props.type) {
            case MAX_TEMPERATURE :
                return 'rgb(232, 108, 96)'
            case MIN_TEMPERATURE :
                return 'rgb(89, 235, 255)'
            case AVERAGE_HUMIDITY :
                return 'rgb(0, 0, 0)'     
            default :
                return 'black'
        }
    }
    }
`

const RowCell = styled.span`
    display: table-cell;
    text-align : center;
    padding:1.2em;
    font-weight : bold;
    font-size: 1.05em;
    border-bottom-color : rgb(234,234,234);
    border-bottom-width: .1em;
    border-bottom-style: solid;
`

const BarHumidity = styled.div`
    height: 18px;
    width: 4px;
    background-color: ${props => props.colorful ? 'rgb(63,162,247)' : 'rgb(196,196,196)'} ;
    display: inline-block;
    vertical-align: -0.2em;
    margin-right: 0.14em;
    border-radius: 2px;
`

export {
    Row,
    RowCell,
    BarHumidity
}