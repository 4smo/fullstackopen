const Filter = ({ newFilter, handleFilterChange }) => (
    <div>
        find countries <input
        value={newFilter}
        onChange={handleFilterChange}
        />
    </div>
)

const Country = ({ country }) => (
    <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map(language => 
                <li key={language}>{language}</li>
            )}
        </ul>
        <img 
            src={country.flags.png} 
            alt={`Flag of ${country.name.common}`}
            style={{ width: '200px' }}
        />
    </div>
)

const round = (num) => Math.round(num);

const Weather = ({ country, weather }) => {
    if (!country) {
        return null;
    }
    else if (!weather) {
        return null;
    }
    return (
        <div>
            {console.log(weather)}
            <h2>Weather in {country.name.common}</h2>
            <p>Temperature {round(weather.main.temp - 273.15)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={`Weather icon for ${country.name.common}`} />
            <p>Wind {weather.wind.speed} m/s </p>
        </div>
    )
}

const CountryInfo = ({ country, filteredCountries, handleShow }) => {
    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if (!country) {
        return (
            <div>
                {filteredCountries.map(country => (
                    <div key={country.name.common}>
                        {country.name.common} <button onClick={() => handleShow(country)}>Show</button>
                    </div>
                ))}
            </div>
        )
    }
    return <Country country={country} />
}

export { Filter, CountryInfo, Weather }