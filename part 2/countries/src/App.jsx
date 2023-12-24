
import axios from 'axios'

import { useState, useEffect } from 'react' 
import CountryDetails from '../components/CountryDetails'
import CountryWeather from '../components/CountryWeather'


export default function App () {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const hookCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        const countries = res.data
        setCountries(countries)
      })
  }
  
  useEffect(hookCountries,[])

  const handleFilter = (event) => {
    setSearchCountry(event.target.value)
  }


  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  )

  return (
    <>
      <input type="text" onChange={handleFilter} />
      <h1>API COUNTRIES</h1>
      <section>
      {filteredCountries.length > 10 ? <p>To many matches</p> :
        filteredCountries.length <= 10 && filteredCountries.length > 1 ?
        filteredCountries.map(
          country => 
          <p key={country.name.common}>{country.name.common} 
            <button
              value={country.name.common}
              onClick={handleFilter} //esto ahra que la info vaya al input nos sirve ya que el filtrado esta en funcion a .includes() de searchCountry
              style={{'marginLeft': '1rem'}}>show
            </button>
          </p> 
        ) : filteredCountries.length === 1 &&
          <>
            <CountryDetails filteredCountries={filteredCountries}/>
            <CountryWeather capital={filteredCountries[0].capital}/>
          </>  
      }
      </section>
    </>
  )
} 