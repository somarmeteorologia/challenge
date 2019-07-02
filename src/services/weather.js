import axios from 'axios'
import {API_KEY} from './config'

const API_PATH = 'https://nimbus.somar.io/observed/'

const MILLISECONDONEDAY = 86400000
const MILLISECONDONEWEEK = MILLISECONDONEDAY * 7

const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

const getWeekWeather = async ({longitude = 0, latitude = 0}) => {
    //https://nimbus.somar.io/observed/daily?latitude=-26.8914978&longitude=-46.63&initi_date=2019-06-19&final_date=2019-06-26
    const today = new Date()
    const initialDate = formatDate(new Date(today - MILLISECONDONEWEEK))
    const finalDate = formatDate(today)
    const response = await axios.get(`${API_PATH}daily?latitude=${latitude}&longitude=${longitude}&reference=Somar&&initi_date=${initialDate}&final_date=${finalDate}`, {headers: {"x-api-key": API_KEY}})
    const data = await response.data
    return data
}

export {
    getWeekWeather
}