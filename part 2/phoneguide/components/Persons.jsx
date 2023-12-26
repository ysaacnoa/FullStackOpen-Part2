/* eslint-disable react/prop-types */
import personServices from '../services/persons'

export default function Persons ({persons, filterPerson, setPersons}) {
  
  if(!persons) return
  
  const toggleDelete = (filteredPerson) => () => {
    const wantDelete = window.confirm(`Delete ${filteredPerson.name} ?`)

    if(wantDelete){
      personServices
        .removePerson(filteredPerson.id)
        .then(() => {
          const newList = persons.filter(person => person.id !== filteredPerson.id)
          setPersons(newList)
        })
    }
  
  }
  return (
    <p>
      { persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterPerson.toLowerCase())
        )
        .map((filteredPerson) => (
          <li key={filteredPerson.id}>
            {filteredPerson.name} {filteredPerson.number}
            <button onClick={toggleDelete(filteredPerson)}>delete</button>
          </li>
        ))}
    </p>
  );
}
