import { useState } from "react";

const Filter = ({ filterPerson, handleFilterPerson, text }) => {
  return (
    <>
      <p>{text}</p>
      <input value={filterPerson} onChange={handleFilterPerson} />
    </>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleName,
  newPhone,
  handlePhone,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input value={newName} onChange={handleName} />
        <br />
        phone:
        <input value={newPhone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({persons, filterPerson}) => {
  
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
};



export default function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 0 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 1 },
    { name: "Dan Abramov", number: "12-43-234345", id: 2 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 3 },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterPerson, setFilterPerson] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const objectPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };

    if (newName === "" && newPhone === "") return;

    if (persons.find((el) => el.name === newName))
      return alert(`${newName} is already added to phonebook`);
    console.log(objectPerson);

    //update object
    setPersons(persons.concat(objectPerson));

    //clean inputs
    setNewName("");
    setNewPhone("");
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterPerson = (event) => {
    setFilterPerson(event.target.value);
  };

  return (
    <section>
      <h2>Phonebook</h2>
      <Filter
        text="filter shown with"
        filterPerson={filterPerson}
        handleFilterPerson={handleFilterPerson}
      />
      <h2>Add a New</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newPhone={newPhone}
        handleName={handleName}
        handlePhone={handlePhone}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterPerson={filterPerson}
      />
    </section>
  );
}
