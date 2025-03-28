import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(`${countryUrl}/${country}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response.data);
}

const getGeo = (country) => {
    const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=5&appid=${api_key}`);
    return request.then(response => {
        const { lat, lon } = response.data[0];
        return { lat, lon };
    });
}

export default { getAll, getCountry, getWeather, getGeo } 