import { useState, useEffect } from 'react'
import { Filter, CountryInfo, Weather } from './Content'
import flagService from './services/flags'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedLat, setSelectedLat] = useState(null)
  const [selectedLon, setSelectedLon] = useState(null)
  const [selectedWeather, setSelectedWeather] = useState(null)
  
  useEffect(() => {
    flagService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      console.log("this runs")
      flagService
        .getGeo(selectedCountry)
        .then(({ lat, lon }) => {
          console.log("Geolocation data:", lat, lon);
          setSelectedLat(lat)
          setSelectedLon(lon)
        })
    }
  }, [selectedCountry])
  
  useEffect(() => {
    if (selectedLat) {
      flagService
        .getWeather(selectedLat, selectedLon)
        .then(weatherData => {
          setSelectedWeather(weatherData);
        })
    }
  }, [selectedLat])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    }
  }, [filteredCountries])

  useEffect(() => {
  }, [selectedCountry]);

  return (
    <div>
      <Filter newFilter={filter} handleFilterChange={handleFilterChange} />
      <CountryInfo country={selectedCountry} filteredCountries={filteredCountries} handleShow={handleShow}/>
      <Weather country={selectedCountry} weather={selectedWeather}/>
    </div>
  )
}

export default App