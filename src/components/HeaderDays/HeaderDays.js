import React from 'react';
import { HeaderRow, HeaderCell, DayFull } from './style'

const getDayOfWeek = (date) => {
    const today = new Date()

    if ((today.getDate() === date.getDate()) && (today.getFullYear() === date.getFullYear()) && (today.getMonth() === date.getMonth()))
        return 'Hoje'
    
    switch (date.getDay()) {
        case 0:
            return 'Domingo'
        case 1:
            return 'Segunda'
        case 2:
            return 'Terça'
        case 3:
            return 'Quarta'
        case 4:
            return 'Quinta'
        case 5:
            return 'Sexta'
        case 6:
            return 'Sábado'
        default:
            return '';
    }
}

const getMoth = (date) => {
    switch (date.getMonth()) {
        case 0:
            return 'JANEIRO'
        case 1:
            return 'FEVEREIRO'
        case 2:
            return 'MARÇO'
        case 3:
            return 'ABRIL'
        case 4:
            return 'MAIO'
        case 5:
            return 'JUNHO'
        case 6:
            return 'JULHO'
        case 7:
            return 'AGOSTO'
        case 8:
            return 'SETEMBRO'
        case 9:
            return 'OUTUBRO'
        case 10:
            return 'NOVEMBRO'
        case 11:
            return 'DEZEMBRO'
        default:
            return '';
    }
}

const HeaderDays = ({
    days = [],
}) => {
    return (
        <HeaderRow>
            {days.map((day, id) => {
                const dateObj = new Date(day)
                return <React.Fragment key={id}>
                        <HeaderCell>
                            <div>{getDayOfWeek(dateObj).toUpperCase()}</div>
                            <DayFull>{dateObj.getDate()} {getMoth(dateObj)}</DayFull>
                        </HeaderCell>
                </React.Fragment>
            })}
        </HeaderRow>
    )
}

export default HeaderDays