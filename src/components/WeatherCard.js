import axios from 'axios'
import { useState, useEffect } from 'react'
import { wAPI } from '../globals'

const WeatherCard = () => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    let getWeather = async () => {
      const weatherResults = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${wAPI}&units=imperial`
      )
      setWeather(weatherResults.data)
    }
    getWeather()
  }, [])

  return weather !== undefined ? (
    <div>
      <h3>Pern Place Weather</h3>
      <h4>{weather.weather[0].main}</h4>
      <h4>Detail: {weather.weather[0].description}</h4>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icon"
      />
      <p>Temp: {weather.main.temp} F</p>
      <p>Feels Like: {weather.main.feels_like} F</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} mph</p>
      <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleString()}</p>
      <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleString()}</p>
    </div>
  ) : null
}

export default WeatherCard
