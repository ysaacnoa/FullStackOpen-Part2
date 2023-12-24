/* eslint-disable react/prop-types */


import axios from 'axios'
import { useState, useEffect } from 'react'
//WEATHER SHACK IS "Access Restricted - Your current Subscription Plan does not support HTTPS Encryption."
/* const APIKEY = '7e5a2cd2f619d649f5b35d1c09bfc44f' */
//const APIKEY = `http://api.weatherstack.com/current?access_key=${APIKEY}&query=${city}`

// I USE https://www.weatherapi.com/
//ENDPOINT = `http://api.weatherapi.com/v1/current.json?key={apiKey}&q={city}&aqi=no`
const apiKey = import.meta.env.VITE_WEATHER_API

export default function CountryWeather({capital}){
  
  
  const [weather, setWeather] = useState();

  const hookWeather = () => {
    if(!capital) return
    axios(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`)
      .then(res=>{
        setWeather(res.data)
        console.log(res.data);
      })    
  }

  useEffect(hookWeather, [capital])


  return(
    <>
      {weather && (
      <article>
        <header>
          <h1>Weather of {capital}</h1>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt={`weather condition in ${capital} is ${weather.current.condition.icon}`} />
        </header>
        <section>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
        </section>
      </article>
    )}
    </>
  )
}