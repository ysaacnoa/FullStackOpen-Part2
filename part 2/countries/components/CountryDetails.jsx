/* eslint-disable react/prop-types */


export default function CountryDetails ({filteredCountries}){
  return (
    <article>
      <header>
        <h1>{filteredCountries[0].name.common}</h1>
        <p>Capital {filteredCountries[0].capital[0]}</p>
        <p>Population {filteredCountries[0].population}</p>
      </header>
      <section>
        <h3>Languages</h3>
        <ul>
          {Object.values(filteredCountries[0]?.languages).map(
            (languages, index) => (
              <li key={index}>{languages}</li>
            )
          )}
        </ul>
        <img
          style={{ width: "350px", height: "200px", objectFit: "cover" }}
          src={filteredCountries[0].flags.svg}
          alt={filteredCountries[0].flags.alt}
        />
      </section>
    </article>
  );
}