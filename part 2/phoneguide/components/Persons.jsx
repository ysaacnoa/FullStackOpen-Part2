/* eslint-disable react/prop-types */
import personServices from '../services/persons'

export default function Persons ({persons, filterPerson, setPersons}) {
  
  if(!persons) return
  
  const toggleDelete = (id) => () => {
    personServices
      .removePerson(id)
      .then(() => {
        const newList = persons.filter(person => person.id !== id)
        setPersons(newList)
      })
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
            <button onClick={toggleDelete(filteredPerson.id)}>delete</button>
          </li>
        ))}
    </p>
  );
}
