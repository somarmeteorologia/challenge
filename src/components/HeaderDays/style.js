import styled from "styled-components";

const HeaderRow = styled.div`
    display: table-header-group;
    background-color: rgb(234, 234, 234);
    font-weight: bold;
    font-size: 1em;
`

const HeaderCell = styled.span`
    display: table-cell;
    padding: 10px;
    text-align: center;
`

const DayFull = styled.div`
    font-weight: normal;
    font-size : 0.7em;
    color : rgb(159, 159, 159)    
`

export {
    HeaderRow,
    HeaderCell,
    DayFull
}