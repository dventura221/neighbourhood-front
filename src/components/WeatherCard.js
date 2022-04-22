import axios from 'axios'
import { useState, useEffect } from 'react'
import { wAPI } from '../globals'

const WeatherCard = () => {
  const [weather, setWeather] = useState()
  const [zip, setZip] = useState(80236)
  const [zipForm, setZipForm] = useState('')

  useEffect(() => {
    let getWeather = async () => {
      const weatherResults = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${wAPI}&units=imperial`
      )
      setWeather(weatherResults.data)
      console.log(weatherResults.data)
    }
    getWeather()
  }, [zip])

  const handleSubmit = (e) => {
    e.preventDefault()
    setZip(zipForm)
    setZipForm('')
  }

  return weather !== undefined ? (
    <div className="Weather">
      <div className="DataAlignment">
        <h1>PERN</h1>
        <p id="Weather">Weather</p>
        <img src="https://imgur.com/sMFwEWm.jpg" />
        <h5>
          Location: {weather.name},&nbsp;
          {new Intl.DisplayNames(['en'], { type: 'region' }).of(
            weather.sys.country
          )}
          &nbsp;{zip}
        </h5>
        <h4>Current Forecast:</h4>
        <h2 id="Forecast">{weather.weather[0].main}</h2>
        {/* <h4>Detail: {weather.weather[0].description}</h4> */}
        <div className="OpenWeather">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icon"
          />
        </div>
        <div className="Details">
          <p>
            <span>Temp:</span> {weather.main.temp} F
          </p>
          <p>
            <span>Feels Like:</span> {weather.main.feels_like} F
          </p>
          <p>
            <span>Humidity:</span> {weather.main.humidity}%
          </p>
          <p>
            <span>Wind Speed:</span> {weather.wind.speed} mph
          </p>
        </div>
        <p>
          <span className="Sun">Sunrise:</span> <br />
          {new Date(weather.sys.sunrise * 1000).toLocaleString()}
        </p>
        <p>
          <span className="Sun">Sunset: </span>
          <br />
          {new Date(weather.sys.sunset * 1000).toLocaleString()}
        </p>
        <div className="WeatherSearch">
        <div>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="number"
              name="zip"
              value={zipForm}
              placeholder="Weather by Zipcode"
              onChange={(e) => setZipForm(e.target.value)}
            ></input>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  ) : null
}

export default WeatherCard
