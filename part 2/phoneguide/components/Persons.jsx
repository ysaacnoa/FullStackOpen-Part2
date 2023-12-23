/* eslint-disable react/prop-types */


export default function Persons ({persons, filterPerson}) {
  
  return (
    <p>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterPerson.toLowerCase())
        )
        .map((filteredPerson) => (
          <li key={filteredPerson.id}>
            {filteredPerson.name} {filteredPerson.number}
          </li>
        ))}
    </p>
  );
}
