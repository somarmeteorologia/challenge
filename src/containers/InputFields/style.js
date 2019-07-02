import styled from "styled-components";

const GruopInput = styled.span`
    margin : 2em;
`

const Input = styled.input`
    width: 3em;
    font-size: 1.5em;
    text-align: center;
`
const Button = styled.button`
    display: inline-block;
    border-radius: 4px;
    background-color: #115edb;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 25px;
    padding: 5px;
    /* width: 76px; */
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    
    :hover{   
        background-color: #0849b2;
    }
`

export {
    GruopInput,
    Input,
    Button
}